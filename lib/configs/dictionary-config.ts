export const dictionaries = {
  ["ko-KR"]: () =>
    import("@/dictionaries/ko-KR.json").then((module) => module.default),
  ["en-US"]: () =>
    import("@/dictionaries/en-US.json").then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["ko-KR"]>>;
