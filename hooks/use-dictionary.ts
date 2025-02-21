"use client";

import { dictionaries, Dictionary } from "@/lib/configs/dictionary-config";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type LangType = "ko-KR" | "en-US";

export function useDictionary() {
  const searchParams = useSearchParams();
  const lngParams = searchParams.get("lng");
  const [dict, setDict] = useState<Dictionary>();
  const [lng, setLng] = useState<LangType>("en-US");

  const updateDictionary = async (lang: LangType) => {
    console.log(lang);
    const dict = await dictionaries[lang]();
    setDict(dict);
  };

  const updateLocale = async () => {
    const storedLng = localStorage.getItem("locale") as LangType | null;

    if (!storedLng) {
      const { headers } = await axios.get("/", {
        params: { lng: lngParams },
        headers: { "Cache-Control": "no-cache" },
      });
      const locale = headers["x-locale"] as LangType;
      localStorage.setItem("lng", locale);
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
