"use client";

import { SupportedTokenType } from "@/lib/configs/uniswap-config";
import { getSupportedTokenByNetwork } from "@/lib/utils/uniswap-util";
import { balanceAtom } from "@/store/crypto-account";
import { useAtomValue } from "jotai";
import { formatUnits } from "viem";

interface UseBalancePayload {
  address?: string;
  chainId?: number;
}

export default function useBalance({
  address,
  chainId = 1,
}: UseBalancePayload) {
  const balances = useAtomValue(balanceAtom);
  const supportedTokens = getSupportedTokenByNetwork(chainId);
  const targetToken = supportedTokens.find(
    (token) => token.address === address && token.chainId === chainId
  );
  const symbol = targetToken?.symbol ?? ("ETH" as SupportedTokenType);

  return {
    decimals: targetToken?.decimals,
    symbol,
    formatted: formatUnits(balances[symbol], targetToken?.decimals ?? 18),
    value: balances[symbol],
  };
}
