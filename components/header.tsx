"use client";

import DesktopSearch from "@/components/desktop-search";
import { Icons } from "@/components/icons";
import { useDictionary } from "@/hooks/use-dictionary";
import { Dictionary } from "@/lib/configs/dictionary-config";
import { cn } from "@/lib/utils/tailwind-util";
import { Button, Tooltip } from "@heroui/react";
import Link from "next/link";

export default function Header({ initialDict }: { initialDict?: Dictionary }) {
  const { dict } = useDictionary(initialDict);

  const NAVIGATION_MENU = [
    {
      label: dict?.header.nav.trade.label,
      children: [
        { label: dict?.header.nav.trade.swap, icon: null },
        { label: dict?.header.nav.trade.limit, icon: null },
        { label: dict?.header.nav.trade.send, icon: null },
        { label: dict?.header.nav.trade.buy, icon: null },
      ],
    },
    {
      label: dict?.header.nav.explore.label,
      children: [
        { label: dict?.header.nav.explore.token, icon: null },
        { label: dict?.header.nav.explore.pool, icon: null },
        { label: dict?.header.nav.explore.transaction, icon: null },
      ],
    },
    {
      label: dict?.header.nav.pool.label,
      children: [
        { label: dict?.header.nav.pool.view, icon: null },
        { label: dict?.header.nav.pool.create, icon: null },
      ],
    },
  ];

  return (
    <header
      className={"px-3 w-full h-[72px] flex items-stretch justify-between"}
    >
      <nav className={"flex items-center gap-3 text-lg"}>
        <button className={"flex items-center gap-1 p-2"}>
          <Icons.logo />
          <Icons.dropdown />
        </button>
        {NAVIGATION_MENU.map((menu) => (
          <Tooltip
            dir={"bottom"}
            content={
              <ul className={"list-none flex flex-col gap-1 w-40"}>
                {menu.children.map((el) => (
                  <Link
                    className={
                      "text-neutral2 hover:text-neutral2-hover bg-neutral3/10 font-bold px-4 py-3 rounded-xl text-base"
                    }
                    href={"#"}
                    key={el.label}
                  >
                    {el.label}
                  </Link>
                ))}
              </ul>
            }
            key={menu.label}
          >
            <span
              className={cn([
                "text-neutral2 hover:text-neutral2 mx-2",
                menu.label === dict?.header.nav.trade.label &&
                  "text-neutral1 hover:text-neutral2",
              ])}
              role={"button"}
            >
              {menu.label}
            </span>
          </Tooltip>
        ))}
      </nav>
      <DesktopSearch />
      <div className={"flex items-center gap-3"}>
        <button
          className={cn(["p-2 rounded-full hover:bg-neutral-100", "lg:hidden"])}
        >
          <Icons.search />
        </button>
        <button className={"p-2 rounded-full hover:bg-neutral-100"}>
          <Icons.moreItems />
        </button>
        <Button
          className={
            "min-w-0 px-3 font-bold text-primary rounded-full hover:bg-[#FCE9FB]"
          }
          color={"secondary"}
        >
          {dict?.header.nav.connect}
        </Button>
      </div>
    </header>
  );
}
