"use client";

import { useSearchParams } from "next/navigation";

export function useLocale() {
  const searchParams = useSearchParams();
  return searchParams.get("lng") || "en-US";
}
