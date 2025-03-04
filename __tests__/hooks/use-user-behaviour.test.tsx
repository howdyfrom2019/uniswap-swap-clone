import useUserBehaviour from "@/hooks/use-user-behaviour";
import { act, renderHook } from "@testing-library/react";
import { TokenInfo } from "@uniswap/token-lists";
import { Provider } from "jotai";

describe("@/hookx/use-user-behaviour", () => {
  it("1. 초기 검색 기록은 비어 있어야 한다", () => {
    const { result } = renderHook(() => useUserBehaviour(), {
      wrapper: ({ children }) => <Provider>{children}</Provider>,
    });

    expect(result.current.searchHistory).toEqual({ from: [], to: [] });
  });

  it("2. addSearchResult를 호출하면 검색 기록이 업데이트되어야 한다", () => {
    const mockToken: TokenInfo = {
      chainId: 1,
      address: "0x123",
      name: "Mock Token",
      symbol: "MTK",
      decimals: 18,
    };

    const { result } = renderHook(() => useUserBehaviour(), {
      wrapper: ({ children }) => <Provider>{children}</Provider>,
    });

    act(() => {
      result.current.addSearchResult({ result: mockToken, type: "from" });
    });

    expect(result.current.searchHistory.from).toHaveLength(1);
    expect(result.current.searchHistory.from[0]).toEqual(mockToken);
  });

  it("3. 같은 토큰을 추가하면 검색 기록이 중복되지 않아야 한다", () => {
    const mockToken: TokenInfo = {
      chainId: 1,
      address: "0x123",
      name: "Mock Token",
      symbol: "MTK",
      decimals: 18,
    };

    const { result } = renderHook(() => useUserBehaviour(), {
      wrapper: ({ children }) => <Provider>{children}</Provider>,
    });

    act(() => {
      result.current.addSearchResult({ result: mockToken, type: "from" });
      result.current.addSearchResult({ result: mockToken, type: "from" });
    });

    expect(result.current.searchHistory.from).toHaveLength(1); // 중복 방지 확인
  });
});
