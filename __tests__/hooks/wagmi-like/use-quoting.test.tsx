import { useBalance, useChainId } from "@/hooks/wagmi-like/uniswap";
import useQuoting from "@/hooks/wagmi-like/uniswap/use-quoting";
import {
  FIXED_TOKEN_PRICE,
  SupportedTokenType,
} from "@/lib/configs/uniswap-config";
import { act, renderHook } from "@testing-library/react";
import { parseUnits } from "viem";

jest.mock("@/hooks/wagmi-like/uniswap", () => ({
  useBalance: jest.fn(),
  useChainId: jest.fn(),
}));

const WBTC_ADDRESS_MAINNET =
  "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599".toLowerCase();
const USDC_ADDRESS_MAINNET =
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48".toLowerCase();

describe("@/hooks/wagmi-like/uniswap/use-quoting", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();

    (useChainId as jest.Mock).mockReturnValue(1);
    (useBalance as jest.Mock).mockImplementation(({ address, chainId }) => {
      // WBTC mainnet
      if (address.toLowerCase() === WBTC_ADDRESS_MAINNET) {
        return {
          value: parseUnits("1", 6),
          decimals: 6,
        };
        // USDC mainnet
      } else if (address.toLowerCase() === USDC_ADDRESS_MAINNET) {
        return {
          value: parseUnits("1", 9),
          decimals: 9,
        };
      }

      // ETH in mainnet
      return {
        value: parseUnits("1", 18),
        decimals: 18,
      };
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("1. form의 초깃값이 입력되었을 때 return 확인.", () => {
    const { result } = renderHook(
      () =>
        useQuoting({
          fromToken: { chainId: 1, symbol: "ETH", address: "", decimals: 18 },
          toToken: {
            chainId: undefined,
            symbol: undefined,
            address: undefined,
            decimals: undefined,
          },
          fromAmount: undefined,
        }),
      {
        wrapper: ({ children }) => <div>{children}</div>,
      }
    );

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.ratio).toBeUndefined();
    expect(result.current.isOverMaxValue).toBe(false);
  });

  it("2. from, to 값이 제대로 입력된 경우에서(ETH -> USDC) ratio 확인.", () => {
    const [from, to]: SupportedTokenType[] = ["ETH", "USDC"];
    const [fromPrice, toPrice] = [
      FIXED_TOKEN_PRICE[from],
      FIXED_TOKEN_PRICE[to],
    ];
    const expectedRatio = fromPrice / toPrice;

    const { result } = renderHook(
      () =>
        useQuoting({
          fromToken: { symbol: "ETH", decimals: 18, chainId: 1, address: "" },
          toToken: {
            symbol: "USDC",
            decimals: 9,
            chainId: 1,
            address: USDC_ADDRESS_MAINNET,
          },
          fromAmount: "0.5",
        }),
      {
        wrapper: ({ children }) => <div>{children}</div>,
      }
    );

    // 타이머 실행 전엔 undefined
    expect(result.current.toAmount).toBeUndefined();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      jest.runAllTimers();
    });

    console.log(result);
    expect(result.current.ratio).toBe(expectedRatio);
  });

  it("3. 잔고 이상의 값을 swap시도 시 isOverMaxValue가 제대로 작동하는지 확인", () => {
    const { result } = renderHook(
      () =>
        useQuoting({
          fromToken: { symbol: "ETH", decimals: 18, chainId: 1, address: "" },
          toToken: {
            symbol: "USDC",
            decimals: 9,
            chainId: 1,
            address: USDC_ADDRESS_MAINNET,
          },
          fromAmount: "2",
        }),
      {
        wrapper: ({ children }) => <div>{children}</div>,
      }
    );

    expect(result.current.isOverMaxValue).toBe(true);
  });

  it("4. 정확한 from값이 입력되었을 때, toAmount가 적절히 계산되는지 확인.", () => {
    const [from, to]: SupportedTokenType[] = ["ETH", "USDC"];
    const [fromPrice, toPrice] = [
      FIXED_TOKEN_PRICE[from],
      FIXED_TOKEN_PRICE[to],
    ];
    const expectedToAmount = (0.5 * fromPrice) / toPrice;

    const { result } = renderHook(
      () =>
        useQuoting({
          fromToken: { symbol: "ETH", decimals: 18, chainId: 1, address: "" },
          toToken: {
            symbol: "USDC",
            decimals: 9,
            chainId: 1,
            address: USDC_ADDRESS_MAINNET,
          },
          fromAmount: "0.5",
        }),
      {
        wrapper: ({ children }) => <div>{children}</div>,
      }
    );

    // 타이머 실행 전엔 undefined
    expect(result.current.toAmount).toBeUndefined();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      jest.runAllTimers();
    });

    console.log(result);
    expect(result.current.toAmount).toBe(String(expectedToAmount));
  });
});
