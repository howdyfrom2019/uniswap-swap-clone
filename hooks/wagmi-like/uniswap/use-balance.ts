"use client";

import {
  SUPPORTED_TOKENS,
  SupportedTokenType,
} from "@/lib/configs/uniswap-config";
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
  const symbol = (SUPPORTED_TOKENS.find(
    (token) => token === targetToken?.symbol
  ) ?? "ETH") as SupportedTokenType;

  return {
    decimals: targetToken?.decimals,
    symbol,
    formatted: formatUnits(balances[symbol], 18),
    value: balances[symbol],
  };
}
