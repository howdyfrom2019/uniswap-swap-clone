import {
  ETH_TOKEN,
  FIXED_TOKEN_PRICE,
  SUPPORTED_CHAIN_IDS,
  SUPPORTED_CHAINS_WITH_ALL_NETWORK,
  SUPPORTED_TOKENS,
  SupportedTokenType,
} from "@/lib/configs/uniswap-config";
import { cn } from "@/lib/utils/tailwind-util";
import defaultTokenList from "@uniswap/default-token-list";
import type { TokenList } from "@uniswap/token-lists";
import React from "react";
import { formatEther } from "viem";
import * as EVMNetwork from "viem/chains";

export interface TokenInfo {
  name: string;
  symbol: SupportedTokenType;
  chainId: number;
  address: string;
  decimals: number;
  logoURI?: string;
}

function isSupportedTokenType(symbol: any): symbol is SupportedTokenType {
  return SUPPORTED_TOKENS.includes(symbol);
}

export function getSupportedTokenByNetwork(chainId?: number) {
  const cache = new Map<number, TokenInfo[]>();

  if ([...cache.keys()].length === 0) {
    const tokens = (defaultTokenList as TokenList).tokens;
    const filteredTokens = tokens.filter(
      (token) =>
        isSupportedTokenType(token.symbol) &&
        SUPPORTED_CHAIN_IDS.includes(token.chainId)
    );

    filteredTokens.forEach((token) => {
      const tokenInfo: TokenInfo = {
        name: token.name,
        symbol: token.symbol as SupportedTokenType,
        chainId: token.chainId,
        address: token.address,
        decimals: token.decimals,
        logoURI: token.logoURI,
      };

      if (!cache.has(token.chainId)) {
        cache.set(token.chainId, [{ ...ETH_TOKEN, chainId: token.chainId }]);
      }

      cache.get(token.chainId)!.push(tokenInfo);
    });
  }

  return (function () {
    if (chainId) {
      return cache.get(chainId)!;
    }

    return cache.get(EVMNetwork.mainnet.id)!;
  })();
}

export function renderNetworkIcon({
  className,
  chainId,
}: {
  className?: string;
  chainId: number;
}) {
  const el = SUPPORTED_CHAINS_WITH_ALL_NETWORK.find(
    (chain) => chain.id === chainId
  )?.icon;

  return React.isValidElement<HTMLImageElement>(el)
    ? React.cloneElement(el, {
        className: cn(el?.props.className, className),
      })
    : el;
}

export function getFixedTokenUSDPrice({
  symbol,
  amount,
}: {
  symbol: SupportedTokenType;
  amount: string | bigint;
}) {
  const price = FIXED_TOKEN_PRICE[symbol];
  return Number(formatEther(BigInt(price) * BigInt(amount))).toLocaleString(
    "en-US",
    {
      maximumFractionDigits: 2,
    }
  );
}
