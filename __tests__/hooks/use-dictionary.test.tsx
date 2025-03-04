import { useDictionary } from "@/hooks/use-dictionary";
import { dictionaries } from "@/lib/configs/dictionary-config";
import { LANGUAGE_KEY } from "@/lib/configs/storage-config";
import { act, renderHook } from "@testing-library/react";
import { useSearchParams } from "next/navigation";

jest.mock("axios", () => ({
  get: jest.fn().mockResolvedValue({ headers: { "x-locale": "en-US" } }),
}));
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));
jest.mock("@/lib/configs/dictionary-config", () => ({
  dictionaries: {
    "en-US": jest.fn().mockResolvedValue({ hello: "Hello" }),
    "ko-KR": jest.fn().mockResolvedValue({ hello: "안녕" }),
  },
}));

describe("@/hooks/use-dictionary.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("1. 기본 언어 세팅은 en-US로 되어있어야 한다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    const { result } = renderHook(() => useDictionary(), {
      wrapper: ({ children }) => <div>{children}</div>,
    });

    expect(result.current.locale).toBe("en-US");
    expect(result.current.dict).toBeNull();
  });

  it("2. localStorage에 저장되어잇는 언어가 있다면 해당 언어를 사용해야 한다.", async () => {
    localStorage.setItem(LANGUAGE_KEY, "ko-KR");

    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    const { result } = renderHook(() => useDictionary(), {
      wrapper: ({ children }) => <div>{children}</div>,
    });

    expect(result.current.locale).toBe("ko-KR");

    await act(async () => {
      await dictionaries["ko-KR"]();
    });

    expect(result.current.dict).toEqual({ hello: "안녕" });
  });
});
