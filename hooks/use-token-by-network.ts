"use client";

import { getSupportedTokenByNetwork } from "@/lib/utils/uniswap-util";
import { TokenInfo } from "@uniswap/token-lists";
import { useEffect, useState } from "react";

interface Props {
  chainId?: number | null;
  query?: string;
}

export default function useTokenByNetwork({ chainId, query = "" }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredToken, setFilteredToken] = useState<TokenInfo[]>(
    getSupportedTokenByNetwork()
  );

  const fetchTokenByNetwork = async () => {
    setIsLoading(true);

    setTimeout(() => {
      const tokensInfo = getSupportedTokenByNetwork(chainId ?? undefined) ?? [];
      const trimmedQuery = query.trim().toLowerCase();
      const filteredInfo = tokensInfo.filter((token) =>
        token.symbol.toLowerCase().startsWith(trimmedQuery)
      );

      setFilteredToken(filteredInfo);
      setIsLoading(false);
    }, 750);
  };

  useEffect(() => {
    fetchTokenByNetwork();
  }, [chainId, query]);

  return {
    data: filteredToken,
    isLoading,
  };
}
