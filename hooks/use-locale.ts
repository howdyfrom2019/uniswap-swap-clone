"use client";

import { useSearchParams } from "next/navigation";

type LangType = "ko-KR" | "en-US";
export function useLocale() {
  const searchParams = useSearchParams();
  return (searchParams.get("lng") || "en-US") as LangType;
}
