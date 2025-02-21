import { dictionaries } from "@/lib/configs/dictionary-config";
import { headers } from "next/headers";
import "server-only";

export const getDictionary = async () => {
  const headerList = await headers();
  const locale = (headerList.get("x-locale") || "en-US") as "ko-KR" | "en-US";

  return dictionaries[locale]();
};
