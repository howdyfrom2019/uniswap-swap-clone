import { atom } from "jotai";
import { type Chain, parseEther } from "viem";
import { mainnet } from "viem/chains";

export const walletConnectedAtom = atom(false);
export const balanceAtom = atom({
  ETH: parseEther("1"),
  WBTC: parseEther("1"),
  USDC: parseEther("1"),
});

export const chainAtom = atom<Chain>(mainnet);
