"use client";

import { Icons } from "@/components/icons";
import { useDictionary } from "@/hooks/use-dictionary";
import { SUPPORTED_CHAINS_WITH_ALL_NETWORK } from "@/lib/configs/uniswap-config";
import { cn } from "@/lib/utils/tailwind-util";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useMemo, useState } from "react";

interface Props {
  chainId?: number | null;
  onChangeSelectedChainId: (chainId: number | null) => void;
}
export default function NetworkPopover({
  chainId = null,
  onChangeSelectedChainId,
}: Props) {
  const { locale } = useDictionary();
  const [isOpened, setIsOpened] = useState(false);

  const network = useMemo(
    () =>
      SUPPORTED_CHAINS_WITH_ALL_NETWORK.find((chain) => chain.id === chainId),
    [chainId]
  );

  return (
    <Popover
      isOpen={isOpened}
      onOpenChange={(open) => setIsOpened(open)}
      placement={"bottom-end"}
    >
      <PopoverTrigger>
        <button
          className={"outline-none flex items-center gap-2 active:opacity-80"}
        >
          {network?.icon}
          <Icons.chevronLeft
            className={cn([
              "size-4 -rotate-90 transition-all",
              isOpened && "rotate-90",
            ])}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className={"w-56 flex flex-col"}>
          {SUPPORTED_CHAINS_WITH_ALL_NETWORK.map((chain, i) => (
            <button
              className={
                "outline-none px-2 py-2.5 flex items-center justify-between"
              }
              key={i}
              onClick={(e) => {
                e.preventDefault();
                onChangeSelectedChainId(chain.id);
                setIsOpened(false);
              }}
            >
              <div className={"flex items-center gap-2"}>
                {chain.icon}
                <p className={"text-base"}>
                  {chain.id === null
                    ? locale === "ko-KR"
                      ? "모든 네트워크"
                      : "All networks"
                    : chain.label}
                </p>
              </div>
              {chainId === chain.id ? <Icons.checked /> : null}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
