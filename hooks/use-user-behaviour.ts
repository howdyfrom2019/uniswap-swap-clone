"use client";

import { searchHistoryAtom } from "@/store/search-history";
import { TokenInfo } from "@uniswap/token-lists";
import { useAtom } from "jotai";

export default function useUserBehaviour() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const addSearchResult = ({
    result,
    type,
  }: {
    result: TokenInfo;
    type: "from" | "to";
  }) => {
    setSearchHistory((prev) => {
      const hasResult = prev[type].find(
        (value) =>
          value.chainId === result.chainId &&
          value.address === result.address &&
          value.symbol === value.symbol
      );
      if (hasResult) return prev;

      return {
        ...prev,
        [type]: [...prev[type], result],
      };
    });
  };

  return { searchHistory, addSearchResult };
}
