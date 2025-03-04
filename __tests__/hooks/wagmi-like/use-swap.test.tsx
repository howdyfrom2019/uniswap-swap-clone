import { useSwap } from "@/hooks/wagmi-like/uniswap";
import { balanceAtom } from "@/store/crypto-account";
import { act, renderHook } from "@testing-library/react";
import { Provider, createStore } from "jotai";
import { InsufficientFundsError, parseUnits } from "viem";

describe("@/hooks/wagmi-like/uniswap/use-swap", () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
    store.set(balanceAtom, {
      ETH: BigInt(parseUnits("1", 18)),
      USDC: BigInt(parseUnits("1", 9)),
      WBTC: BigInt(parseUnits("1", 6)),
    });
  });

  it("1. 스왑 성공 시 잔액이 각 단위에 맞게 업데이트 되어야한다.", () => {
    const onSuccess = jest.fn();
    const { result } = renderHook(() => useSwap({ onSuccess }), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.swap({
        from: "ETH",
        to: "USDC",
        fromAmount: BigInt(parseUnits("0.5", 18)),
        toAmount: BigInt(parseUnits("0.5", 9)),
      });
    });

    expect(store.get(balanceAtom).ETH.toJSON()).toEqual(
      parseUnits("0.5", 18).toJSON()
    );
    expect(store.get(balanceAtom).USDC.toJSON()).toEqual(
      parseUnits("1.5", 9).toJSON()
    );
  });

  it("2. 잔액 부족 시 InsufficientFundsError를 발생시켜야 한다", () => {
    const onError = jest.fn();
    const { result } = renderHook(() => useSwap({ onError }), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.swap({
        from: "ETH",
        to: "USDC",
        fromAmount: BigInt(parseUnits("1.5", 18)),
        toAmount: BigInt(parseUnits("1.5", 9)),
      });
    });

    expect(onError).toHaveBeenCalledWith(InsufficientFundsError);
  });
});
