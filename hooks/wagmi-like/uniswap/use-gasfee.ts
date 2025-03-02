"use client";

import { SUPPORTED_CHAINS } from "@/lib/configs/uniswap-config";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";

export default function useGasfee({ chainId }: { chainId?: number }) {
  const [gasFee, setGasFee] = useState<bigint | undefined>(undefined);

  async function fetchGasPrice() {
    if (!chainId) return;
    const chain = SUPPORTED_CHAINS[chainId];
    const client = createPublicClient({
      chain,
      transport: http(),
    });

    const gas = await client.getGasPrice();

    setGasFee(gas);
  }

  useEffect(() => {
    fetchGasPrice();
  }, [chainId]);

  return {
    data: gasFee,
  };
}
