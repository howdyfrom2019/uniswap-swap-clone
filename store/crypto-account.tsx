import { atom } from "jotai";
import { type Chain, parseUnits } from "viem";
import { mainnet } from "viem/chains";

export const walletConnectedAtom = atom(false);
export const balanceAtom = atom({
  ETH: parseUnits("1", 18),
  WBTC: parseUnits("1", 8),
  USDC: parseUnits("1", 6),
});

export const chainAtom = atom<Chain>(mainnet);
