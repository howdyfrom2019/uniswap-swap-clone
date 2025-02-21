"use client";

import { Icons } from "@/components/icons";
import { useDictionary } from "@/hooks/use-dictionary";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";

export default function SwapConfig() {
  const { dict } = useDictionary();

  return (
    <Popover placement={"bottom-end"}>
      <PopoverTrigger className={"outline-none"}>
        <button className={"px-0.5 active:opacity-80"}>
          <Icons.cog className={"text-zinc-500 w-5"} />
        </button>
      </PopoverTrigger>
      <PopoverContent className={"w-80"}>hello</PopoverContent>
    </Popover>
  );
}
