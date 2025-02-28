"use client";

import { account } from "@/lib/configs/uniswap-config";
import { chainAtom, walletConnectedAtom } from "@/store/crypto-account";
import { useAtomValue } from "jotai";

export default function useAccount() {
  const isConnected = useAtomValue(walletConnectedAtom);
  const chain = useAtomValue(chainAtom);

  return {
    address: isConnected ? account : undefined,
    isConnected,
    chainId: chain.id,
    chain,
  };
}
