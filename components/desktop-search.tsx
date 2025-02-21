"use client";

import { Icons } from "@/components/icons";
import { useLocale } from "@/hooks/use-locale";

export default function DesktopSearch() {
  const locale = useLocale();

  return (
    <div
      className={
        "hidden lg:flex my-auto relative items-center gap-1 min-w-[280px] max-w-[400px] w-screen px-2 py-4 h-10 rounded-[20px] bg-[rgb(249,249,249)] border"
      }
    >
      <Icons.search className={"mx-2"} />
      <input
        placeholder={locale === "ko-KR" ? "토큰 검색" : "Search a token"}
        className={
          "bg-transparent border-none outline-none placeholder:font-medium placeholder:tracking-tight"
        }
      />
      <div
        className={
          "bg-[rgba(34,34,34,0.07)] px-2 flex items-stretch justify-center size-5 text-xs rounded-[4px] opacity-60 ml-auto backdrop-blur-sm mr-2"
        }
      >
        /
      </div>
    </div>
  );
}
