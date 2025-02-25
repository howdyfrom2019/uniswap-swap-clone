"use client";

import { Icons } from "@/components/icons";
import TokenNetworkInput from "@/components/token-network-input";
import SwapConfig from "@/features/swap/swap-config";
import { useDictionary } from "@/hooks/use-dictionary";
import { cn } from "@/lib/utils/tailwind-util";
import Link from "next/link";

export default function SwapForm() {
  const { dict } = useDictionary();
  if (!dict) return null;

  const formHeaders = [
    { label: dict.header.nav.trade.swap, href: "/swap" },
    { label: dict.header.nav.trade.limit, href: "/limit" },
    { label: dict.header.nav.trade.send, href: "/send" },
    { label: dict.header.nav.trade.buy, href: "/buy" },
  ];

  return (
    <div className={"flex flex-col items-stretch gap-0.5"}>
      <div className={"flex items-center gap-5 justify-between"}>
        <div className={"flex items-center gap-3 p-1"}>
          {formHeaders.map((header) => (
            <Link
              href={"#"}
              className={cn([
                "text-sm flex items-stretch py-1 w-fit px-3 rounded-full text-center font-bold text-neutral2 hover:text-neutral1",
                header.href === "/swap" &&
                  "bg-[rgba(34,34,34,0.05)] text-neutral1 hover:text-neutral1-hover hover:bg-[rgba(34,34,34,0.09)]",
              ])}
              key={header.href}
            >
              {header.label}
            </Link>
          ))}
        </div>
        <SwapConfig />
      </div>
      <div className={"relative flex flex-col items-stretch gap-0.5"}>
        <TokenNetworkInput schemaType={"from"} label={dict.sell} />
        <TokenNetworkInput schemaType={"to"} label={dict.buy} />
        <button
          className={
            "rounded-2xl bg-[#f9f9f9] p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[2px] border-white"
          }
        >
          <Icons.arrowDown />
        </button>
      </div>
    </div>
  );
}
