"use client";

import { walletConnectedAtom } from "@/store/crypto-account";
import { useSetAtom } from "jotai";

export default function useDisConnect() {
  const setConnect = useSetAtom(walletConnectedAtom);

  return {
    disconnect: () => {
      setConnect(false);
    },
  };
}
