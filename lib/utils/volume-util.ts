import {
  FIXED_TOKEN_PRICE,
  SupportedTokenType,
} from "@/lib/configs/uniswap-config";
import { formatUnits, parseUnits } from "viem";

export function convertToUSD({
  symbol,
  volume,
  decimals = 18,
}: {
  symbol: SupportedTokenType;
  volume: bigint | string;
  decimals: number;
}) {
  const bigIntMul =
    BigInt(FIXED_TOKEN_PRICE[symbol]) *
    BigInt(parseUnits(String(volume), decimals));
  return formatUnits(bigIntMul, decimals);
}
