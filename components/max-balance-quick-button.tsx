"use client";

import { useDictionary } from "@/hooks/use-dictionary";
import { useAccount, useBalance, useChainId } from "@/hooks/wagmi-like/uniswap";
import { cn } from "@/lib/utils/tailwind-util";
import { type TokenInfo } from "@uniswap/token-lists";

export default function MaxBalanceQuickButton({
  className,
  token,
  onClick,
}: {
  className?: string;
  token?: TokenInfo;
  onClick?: (formatted: string) => void;
}) {
  const { dict } = useDictionary();
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { formatted, symbol } = useBalance({
    address: token?.address,
    chainId,
  });
  return (
    <button
      className={cn(
        "flex items-center gap-px mt-2 text-xs",
        !isConnected && "hidden"
      )}
      onClick={() => onClick?.(formatted)}
    >
      <p
        className={cn("text-neutral2 font-semibold tracking-tight", className)}
      >
        {formatted} {symbol}
      </p>
      <p
        className={
          "px-1.5 py-0.5 bg-zinc-50 text-neutral3-hover font-semibold rounded-full"
        }
      >
        {dict?.max}
      </p>
    </button>
  );
}
