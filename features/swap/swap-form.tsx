"use client";

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
    <div className={"flex items-center gap-5 justify-between"}>
      <div className={"flex items-center gap-3 p-1"}>
        {formHeaders.map((header) => (
          <Link
            href={"/swap"}
            className={cn([
              "flex items-stretch py-1 w-fit px-3 rounded-full text-center font-semibold text-neutral2 hover:text-neutral1",
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
  );
}
