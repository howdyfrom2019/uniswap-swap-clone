"use client";

import TokenSelectModal from "@/components/token-select-modal";
import { cn } from "@/lib/utils/tailwind-util";
import { TokenInfo } from "@uniswap/token-lists";
import { ComponentPropsWithoutRef, useEffect, useRef } from "react";

export interface TokenNetworkSelectData {
  amount: number;
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
  const numberRegex = /^\d*\.?\d*$/;
  const tokenSelectBtnRef = useRef<HTMLButtonElement>(null);
  const hasDefaultValue = selectedTokenNetwork?.token?.symbol;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocusing) {
      inputRef.current?.focus();
    }
  }, [isFocusing, inputRef.current]);

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
        <TokenSelectModal
          type={schemaType}
          onChangeTokenSelect={(token) => {
            if (!inputRef.current) return;
            onChangeTokenNetwork({
              token,
              amount: parseFloat(inputRef.current.value),
            });
          }}
          token={selectedTokenNetwork?.token}
          ref={tokenSelectBtnRef}
        />
      </div>
    </div>
  );
}
