"use client";

import { SUPPORTED_CHAINS } from "@/lib/configs/uniswap-config";

export default function SwapForm() {
  return (
    <div className={"flex flex-col"}>
      {SUPPORTED_CHAINS.map((v) => (
        <div className={"flex items-center gap-2"} key={v.id}>
          {v.icon}
          <p>{v.name}</p>
        </div>
      ))}
    </div>
    // <button
    //   onClick={() => {
    //     console.log(getSupportedTokenByNetwork());
    //   }}
    // >
    //   click here
    // </button>
  );
}
