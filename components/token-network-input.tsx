"use client";

import MaxBalanceQuickButton from "@/components/max-balance-quick-button";
import TokenSelectModal from "@/components/token-select-modal";
import { useAccount, useBalance, useChainId } from "@/hooks/wagmi-like/uniswap";
import { SupportedTokenType } from "@/lib/configs/uniswap-config";
import { cn } from "@/lib/utils/tailwind-util";
import { getFixedTokenUSDPrice } from "@/lib/utils/uniswap-util";
import { TokenInfo } from "@uniswap/token-lists";
import { ComponentPropsWithoutRef, useEffect, useMemo, useRef } from "react";
import { formatUnits, parseEther } from "viem";

export interface TokenNetworkSelectData {
  amount: string;
  token: TokenInfo;
}

interface Props extends ComponentPropsWithoutRef<"input"> {
  isFocusing: boolean;
  schemaType: "from" | "to";
  label: string;
  selectedTokenNetwork?: TokenNetworkSelectData;
  onChangeTokenNetwork: (data: Partial<TokenNetworkSelectData>) => void;
}

export default function TokenNetworkInput({
  isFocusing,
  schemaType,
  label,
  selectedTokenNetwork,
  onChangeTokenNetwork,
  disabled,
  placeholder,
  className,
  pattern,
  onInput,
  ...props
}: Props) {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { value, decimals } = useBalance({
    address: selectedTokenNetwork?.token?.address,
    chainId,
  });
  const numberRegex = /^\d*\.?\d*$/;
  const tokenSelectBtnRef = useRef<HTMLButtonElement>(null);
  const hasDefaultValue = selectedTokenNetwork?.token?.symbol;
  const inputRef = useRef<HTMLInputElement>(null);
  const isOverMaxValue = useMemo(() => {
    if (!selectedTokenNetwork?.amount) return false;

    const max = decimals ? Number(formatUnits(value, decimals)) : Infinity;
    return Number(selectedTokenNetwork.amount) >= max;
  }, [value, decimals, selectedTokenNetwork?.amount]);

  useEffect(() => {
    if (!inputRef.current) return;
    if (isFocusing) {
      inputRef.current.focus();
    }

    if (selectedTokenNetwork?.amount !== undefined) {
      inputRef.current.value = selectedTokenNetwork.amount;
    }
  }, [isFocusing, inputRef.current, selectedTokenNetwork?.amount]);

  return (
    <div
      className={cn([
        "flex flex-col items-stretch p-4 rounded-[20px] border border-[rgba(34,34,34,0.05)]",
        !hasDefaultValue && "bg-[#f9f9f9]",
        isFocusing && "bg-none",
      ])}
      role={!hasDefaultValue ? "button" : undefined}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!hasDefaultValue) {
          tokenSelectBtnRef?.current?.click();
        }
      }}
    >
      <p className={"text-neutral2"}>{label}</p>
      <div className={"flex items-center py-2 justify-between"}>
        <div className={"flex flex-col items-start gap-2"}>
          <p
            className={cn([
              "text-neutral3 min-h-[43.199999999999996px] text-4xl font-medium w-full max-w-[314.02px]",
              hasDefaultValue && "hidden",
            ])}
          >
            0
          </p>
          <input
            disabled={!hasDefaultValue || disabled}
            placeholder={placeholder || "0"}
            className={cn([
              "bg-inherit outline-none placehoder:text-neutral3 min-h-[43.199999999999996px] text-4xl font-medium w-full max-w-[314.02px]",
              !hasDefaultValue && "hidden",
              isOverMaxValue && "text-red-500",
              className,
            ])}
            pattern={"^d*.?d*$"}
            onInput={(e) => {
              if (!numberRegex.test(e.currentTarget.value)) {
                e.currentTarget.value = e.currentTarget.value.slice(0, -1); // 잘못된 입력 제거
              }
              onInput?.(e);
            }}
            ref={inputRef}
            {...props}
          />
          {isConnected && Boolean(selectedTokenNetwork?.token) && (
            <p className={cn("text-xs text-neutral2 font-medium")}>
              US$
              {selectedTokenNetwork?.amount
                ? getFixedTokenUSDPrice({
                    symbol: selectedTokenNetwork.token
                      .symbol as SupportedTokenType,
                    amount: parseEther(String(selectedTokenNetwork.amount)),
                  })
                : "0"}
            </p>
          )}
        </div>
        <div className={"flex flex-col items-end relative active:opacity-80"}>
          <TokenSelectModal
            type={schemaType}
            onChangeTokenSelect={(token) => {
              if (!inputRef.current) return;
              onChangeTokenNetwork({
                token,
              });
            }}
            token={selectedTokenNetwork?.token}
            ref={tokenSelectBtnRef}
          />
          {schemaType === "from" && (
            <MaxBalanceQuickButton
              className={cn(isOverMaxValue && "text-red-500")}
              token={selectedTokenNetwork?.token}
              onClick={(value) => {
                onChangeTokenNetwork({
                  amount: value,
                });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
