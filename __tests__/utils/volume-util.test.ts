import { convertToUSD } from "@/lib/utils/volume-util";

describe("@/lib/utils/volume-util", () => {
  it("1. SupportedTokenType(ETH, USDC, WBTC)에 대해서 USD 전환을 제공해야한다.", () => {
    const volume = BigInt(10);
    const result = convertToUSD({
      symbol: "WBTC",
      volume,
      decimals: 6,
    });

    // 1WBTC = 10,000 USD
    expect(result).toBe("100000");
  });

  it("2. 소숫점을 정확히 제공해야한다.", () => {
    const volume = "0.00005";
    const result = convertToUSD({
      symbol: "ETH",
      volume,
      decimals: 18,
    });

    expect(result).toBe("0.05");
  });
});
