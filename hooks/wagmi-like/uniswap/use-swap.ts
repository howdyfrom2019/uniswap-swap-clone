import { SupportedTokenType } from "@/lib/configs/uniswap-config";
import { balanceAtom } from "@/store/crypto-account";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { InsufficientFundsError } from "viem";

export default function useSwap({
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
    fromAmount,
    toAmount,
  }: {
    from: SupportedTokenType;
    to: SupportedTokenType;
    fromAmount: bigint;
    toAmount: bigint;
  }) => {
    try {
      const notEnoughBalance = balances[from] <= fromAmount;
      if (notEnoughBalance) {
        throw InsufficientFundsError;
      }

      setPair({ from, to });
      setBalances((prev) => ({
        ...prev,
        [from]: prev[from] - fromAmount,
        [to]: prev[to] + toAmount,
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
