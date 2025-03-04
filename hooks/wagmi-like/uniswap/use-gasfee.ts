"use client";

import { SUPPORTED_CHAINS } from "@/lib/configs/uniswap-config";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";

// 컨트랙트 상호작용에 쓰이는 gas를 estimateContractGas로 추론해야하나, 현재 abi를 특정하기 어려워서 단순 gasfee만 계산하도록 설계.
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
