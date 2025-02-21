import "server-only";

const dictionaries = {
  ["ko-KR"]: () =>
    import("@/dictionaries/ko-KR.json").then((module) => module.default),
  ["en-US"]: () =>
    import("@/dictionaries/en-US.json").then((module) => module.default),
};

export const getDictionary = async (locale: "en-US" | "ko-KR") =>
  dictionaries[locale]();
