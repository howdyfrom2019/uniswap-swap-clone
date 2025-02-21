import {
  SUPPORTED_CHAIN_IDS,
  SUPPORTED_TOKENS,
} from "@/lib/configs/uniswap-config";
import defaultTokenList from "@uniswap/default-token-list";
import type { TokenList } from "@uniswap/token-lists";
import * as EVMNetwork from "viem/chains";

interface TokenInfo {
  name: string;
  symbol: string;
  chainId: number;
  address: string;
  decimals: number;
  logoURI?: string;
}

const ETH_TOKEN = {
  name: "Ethereum",
  symbol: "ETH",
  address: "",
  decimals: 18,
  logoURI: "https://token-icons.s3.amazonaws.com/eth.png",
};

export function getSupportedTokenByNetwork(chainId?: number) {
  const cache = new Map<number, TokenInfo[]>();

  if ([...cache.keys()].length === 0) {
    const tokens = (defaultTokenList as TokenList).tokens;
    const filteredTokens = tokens.filter(
      (token) =>
        SUPPORTED_TOKENS.includes(token.symbol) &&
        SUPPORTED_CHAIN_IDS.includes(token.chainId)
    );

    filteredTokens.forEach((token) => {
      const tokenInfo: TokenInfo = {
        name: token.name,
        symbol: token.symbol,
        chainId: token.chainId,
        address: token.address,
        decimals: token.decimals,
        logoURI: token.logoURI,
      };

      if (!cache.has(token.chainId)) {
        cache.set(token.chainId, []);
      }

      cache.get(token.chainId)!.push(tokenInfo);
    });
  }

  return (function () {
    console.log(cache);
    if (chainId) {
      return cache.get(chainId)!;
    }

    return cache.get(EVMNetwork.mainnet.id)!;
  })();
}
