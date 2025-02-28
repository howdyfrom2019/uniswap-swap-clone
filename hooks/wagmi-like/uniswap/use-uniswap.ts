import { useBalance, useChainId } from "@/hooks/wagmi-like/uniswap";
import {
  FIXED_TOKEN_PRICE,
  type SupportedTokenType,
} from "@/lib/configs/uniswap-config";
import { balanceAtom } from "@/store/crypto-account";
import { useAtom } from "jotai";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { formatUnits, InsufficientFundsError } from "viem";

export function useQuoting({
  fromToken,
  toToken,
  fromAmount,
  toAmount,
}: {
  fromToken: {
    chainId?: number;
    symbol?: SupportedTokenType;
    address?: string;
    decimals?: number;
  };
  toToken: {
    chainId?: number;
    symbol?: SupportedTokenType;
    address?: string;
    decimals?: number;
  };
  fromAmount?: string;
  toAmount?: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ratio, setRatio] = useState<number | undefined>(undefined);
  const chainId = useChainId();
  const { value, decimals } = useBalance({
    address: fromToken.address,
    chainId,
  });
  const memoizedFromAmount = useMemo(() => fromAmount, [fromAmount]);
  const memoizedToAmount = useMemo(() => toAmount, [toAmount]);

  // 최대 허용 금액을 초과하는지 여부 체크
  const isOverMaxValue = useMemo(() => {
    if (!fromAmount) return false;
    const max = decimals ? Number(formatUnits(value, decimals)) : Infinity;
    return parseFloat(fromAmount) >= max;
  }, [value, decimals, memoizedFromAmount]);

  // 환율 계산
  const fetchRatio = useCallback(() => {
    if (!fromToken.symbol || !toToken.symbol) return;

    setIsSubmitting(true);
    const fromUSDPrice = FIXED_TOKEN_PRICE[fromToken.symbol];
    const toUSDPrice = FIXED_TOKEN_PRICE[toToken.symbol];

    setTimeout(() => {
      const newRatio = fromUSDPrice / toUSDPrice;
      setRatio((prevRatio) => (prevRatio !== newRatio ? newRatio : prevRatio));
      setIsSubmitting(false);
    }, 1000);
  }, [fromToken.symbol, toToken.symbol]);

  // Debounce를 적용한 환율 업데이트
  const debouncedFetchRatio = useDebouncedCallback(fetchRatio, 1000);

  // 불필요한 호출을 막기 위해 기존 ratio 값과 비교
  useEffect(() => {
    // 기존 ratio로 계산된 값과 비교하여 의미 있는 변경인지 확인
    const calculatedToAmount =
      ratio && memoizedFromAmount
        ? parseFloat(memoizedFromAmount) * ratio
        : undefined;
    const calculatedFromAmount =
      ratio && memoizedToAmount
        ? parseFloat(memoizedToAmount) / ratio
        : undefined;

    const shouldFetch =
      (!memoizedFromAmount && !memoizedToAmount) ||
      (calculatedFromAmount &&
        calculatedToAmount?.toLocaleString("en-US", {
          maximumFractionDigits: 6,
        }) !== memoizedToAmount) ||
      (memoizedToAmount &&
        calculatedFromAmount?.toLocaleString("en-US", {
          maximumFractionDigits: 6,
        }) !== fromAmount);

    if (shouldFetch) {
      debouncedFetchRatio();
    }
  }, [memoizedFromAmount, memoizedToAmount, ratio, debouncedFetchRatio]);

  useEffect(() => {
    console.log("from, to token changed");
    debouncedFetchRatio();
  }, [
    `${fromToken.symbol}-${fromToken.chainId}`,
    `${toToken.symbol}-${toToken.chainId}`,
  ]);

  const calculatedToAmount = useMemo(() => {
    return ratio && fromAmount
      ? (parseFloat(fromAmount) * ratio).toFixed(6)
      : undefined;
  }, [ratio, fromAmount]);

  const calculatedFromAmount = useMemo(() => {
    return ratio && toAmount
      ? (parseFloat(toAmount) / ratio).toFixed(6)
      : undefined;
  }, [ratio, toAmount]);

  return {
    isSubmitting,
    ratio,
    toAmount: calculatedToAmount,
    fromAmount: calculatedFromAmount,
    isOverMaxValue,
  };
}

export function useSwap({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: {
    from: { token: SupportedTokenType; value: bigint };
    to: { token: SupportedTokenType; value: bigint };
  }) => void;
  onError?: (error: any) => void;
}) {
  const [balances, setBalances] = useAtom(balanceAtom);
  const [pair, setPair] = useState<{
    from: SupportedTokenType;
    to: SupportedTokenType;
  } | null>(null);

  const swap = async ({
    from,
    to,
    amount,
  }: {
    from: SupportedTokenType;
    to: SupportedTokenType;
    amount: bigint;
  }) => {
    try {
      const notEnoughBalance = balances[from] <= amount;
      if (notEnoughBalance) {
        throw InsufficientFundsError;
      }

      setPair({ from, to });
      setBalances((prev) => ({
        ...prev,
        [from]: prev[from] - amount,
        [to]: prev[to] + amount,
      }));
    } catch (error) {
      onError?.(error);
    }
  };

  const onSuccessCallback = () => {
    if (!pair) return;

    onSuccess?.({
      from: { token: pair.from, value: balances[pair.from] },
      to: { token: pair.to, value: balances[pair.to] },
    });
  };

  useEffect(() => {
    onSuccessCallback();
  }, [balances, pair]);

  return {
    swap,
  };
}
