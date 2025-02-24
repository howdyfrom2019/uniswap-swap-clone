"use client";

import { useDictionary } from "@/hooks/use-dictionary";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale, dict } = useDictionary();
  const updatedSearchParams = new URLSearchParams(searchParams.toString());
  locale === "ko-KR"
    ? updatedSearchParams.set("lng", "en-US")
    : updatedSearchParams.set("lng", "ko-KR");

  return (
    <div
      className={
        "opacity-[0.6] hover:opacity-100 text-[11px] mt-4 leading-6 text-neutral1 hover:text-neutral1-hover text-center"
      }
    >
      {dict?.serviceAvailable}:{" "}
      <Link
        className={"text-primary"}
        href={`${pathname}?${updatedSearchParams.toString()}`}
      >
        {locale === "ko-KR" ? "영어" : "Korean"}
      </Link>
    </div>
  );
}
