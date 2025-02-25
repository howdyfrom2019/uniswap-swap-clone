import { SWAP_TOKEN_SEARCH_LOG } from "@/lib/configs/storage-config";
import { TokenInfo } from "@uniswap/token-lists";
import { atomWithStorage } from "jotai/utils";

interface SearchHistory {
  from: TokenInfo[];
  to: TokenInfo[];
}
export const searchHistoryAtom = atomWithStorage<SearchHistory>(
  SWAP_TOKEN_SEARCH_LOG,
  {
    from: [],
    to: [],
  }
);
