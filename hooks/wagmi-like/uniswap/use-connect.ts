"use client";

import { SUPPORTED_CHAINS } from "@/lib/configs/uniswap-config";
import { chainAtom, walletConnectedAtom } from "@/store/crypto-account";
import { useSetAtom } from "jotai";

export default function useConnect() {
  const setConnect = useSetAtom(walletConnectedAtom);
  const setChain = useSetAtom(chainAtom);

  return {
    connect: (props?: { chainId?: number }) => {
      setConnect(true);
      if (props?.chainId) {
        const network = SUPPORTED_CHAINS.find(
          (chain) => chain.id === props.chainId
        );
        if (!network) {
          throw new Error(
            "Unsupported network connection. Try another network"
          );
        }
        setChain(network);
      }
    },
  };
}
