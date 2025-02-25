"use client";

import { dictionaries, Dictionary } from "@/lib/configs/dictionary-config";
import { LANGUAGE_KEY } from "@/lib/configs/storage-config";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type LangType = "ko-KR" | "en-US";

export function useDictionary(initialDict?: Dictionary) {
  const searchParams = useSearchParams();
  const lngParams = searchParams.get(LANGUAGE_KEY);
  const [lng, setLng] = useState<LangType>("en-US");
  const [dict, setDict] = useState<Dictionary | null>(initialDict ?? null);

  const updateDictionary = async (lang: LangType) => {
    const dict = await dictionaries[lang]();
    setDict(dict);
  };

  const updateLocale = async () => {
    const storedLng = localStorage.getItem(LANGUAGE_KEY) as LangType | null;

    if (!storedLng) {
      const { headers } = await axios.get("/", {
        params: { lng: lngParams },
        headers: { "Cache-Control": "no-cache" },
      });
      const locale = headers["x-locale"] as LangType;
      localStorage.setItem(LANGUAGE_KEY, locale);
      updateDictionary(locale);
      setLng(locale);
    } else {
      updateDictionary(storedLng);
      setLng(storedLng as LangType);
    }
  };

  useEffect(() => {
    updateLocale();
  }, [lngParams]);

  return {
    locale: lng,
    dict,
  };
}
