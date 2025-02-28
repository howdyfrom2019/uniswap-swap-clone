"use client";

import { chainAtom, walletConnectedAtom } from "@/store/crypto-account";
import { useAtomValue } from "jotai";

export default function useChainId() {
  const isConnected = useAtomValue(walletConnectedAtom);
  const chain = useAtomValue(chainAtom);

  return isConnected ? chain.id : undefined;
}
