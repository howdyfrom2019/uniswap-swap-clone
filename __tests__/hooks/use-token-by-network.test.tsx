import useTokenByNetwork from "@/hooks/use-token-by-network";
import { act, renderHook } from "@testing-library/react";
import { base, mainnet } from "viem/chains";

describe("@/hookx/use-token-by-network", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  it("1. chainId와 query가 비워져 있는 상태라면 mainnet의 토큰 리스트를 return한다.", () => {
    const { result } = renderHook(() => useTokenByNetwork({}));

    // ETH, WBTC, USDC 3개 return;
    expect(
      result.current.data.map((v) => v.chainId === mainnet.id).filter(Boolean)
        .length
    ).toEqual(3);
  });

  it("2. chainId가 변동된다면, 그 체인에 맞는 토큰 리스트를 return한다.", () => {
    const { result } = renderHook(() =>
      useTokenByNetwork({ chainId: base.id })
    );

    // 750ms 검색 지연로직으로 인한 타이머 로직 적용.
    act(() => {
      jest.advanceTimersByTime(750);
    });

    // ETH, USDC 2개 return;
    expect(
      result.current.data.map((v) => v.chainId === base.id).filter(Boolean)
        .length
    ).toEqual(2);
  });

  it("3. query 텍스트가 변동된다면, 그 결과값에 맞는 토큰을 return해야 한다.", () => {
    const { result } = renderHook(() => useTokenByNetwork({ query: "ETH" }));

    // 750ms 검색 지연로직으로 인한 타이머 로직 적용.
    act(() => {
      jest.advanceTimersByTime(750);
    });

    // ETH 1개만 리턴해준다.
    expect(result.current.data.length).toEqual(1);
  });
});
