import { useBalance, useChainId } from "@/hooks/wagmi-like/uniswap";
import {
  FIXED_TOKEN_PRICE,
  type SupportedTokenType,
} from "@/lib/configs/uniswap-config";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { formatUnits } from "viem";

export default function useQuoting({
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

  const isOverMaxValue = useMemo(() => {
    if (!fromAmount) return false;
    const max = decimals ? Number(formatUnits(value, decimals)) : Infinity;
    return parseFloat(fromAmount) >= max;
  }, [value, decimals, fromAmount]);

  const calculateRatio = useCallback(
    (ms?: number) => {
      if (!fromToken.symbol || !toToken.symbol) return;

      setIsSubmitting(true);
      const fromUSDPrice = FIXED_TOKEN_PRICE[fromToken.symbol];
      const toUSDPrice = FIXED_TOKEN_PRICE[toToken.symbol];

      // act(() => {
      setTimeout(() => {
        const newRatio = fromUSDPrice / toUSDPrice;
        setRatio((prevRatio) =>
          prevRatio !== newRatio ? newRatio : prevRatio
        );
        setIsSubmitting(false);
      }, (ms = 1000));
      // });
    },
    [fromToken.symbol, toToken.symbol]
  );

  const debouncedFetchRatio = useDebouncedCallback(calculateRatio, 10000);

  const handleRatioUpdate = useCallback(() => {
    if (!fromAmount && !toAmount) return false;

    const calculatedToAmount =
      ratio && fromAmount ? parseFloat(fromAmount) * ratio : undefined;
    const calculatedFromAmount =
      ratio && toAmount ? parseFloat(toAmount) / ratio : undefined;
    const hasMeaningfulChange =
      (fromAmount &&
        calculatedToAmount?.toLocaleString("en-US", {
          maximumFractionDigits: 6,
        })) !== toAmount ||
      (toAmount &&
        calculatedFromAmount?.toLocaleString("en-US", {
          maximumFractionDigits: 6,
        })) !== fromAmount;
    setRatio(undefined);

    if (hasMeaningfulChange) {
      calculateRatio();
    }
    debouncedFetchRatio(10000);
  }, [fromAmount, toAmount, ratio]);

  useEffect(() => {
    handleRatioUpdate();
  }, [fromAmount, toAmount, fromToken, toToken, handleRatioUpdate]);

  const calculatedToAmount = useMemo(() => {
    return ratio && fromAmount
      ? (parseFloat(fromAmount) * ratio).toLocaleString("en-US", {
          maximumFractionDigits: 6,
        })
      : undefined;
  }, [ratio, fromAmount]);

  const calculatedFromAmount = useMemo(() => {
    return ratio && toAmount
      ? (parseFloat(toAmount) / ratio).toLocaleString("en-US", {
          maximumFractionDigits: 6,
        })
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
