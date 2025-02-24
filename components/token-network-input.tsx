"use client";

import TokenSelectModal from "@/components/token-select-modal";
import { cn } from "@/lib/utils/tailwind-util";
import { ComponentPropsWithoutRef, useRef, useState } from "react";

interface Props extends ComponentPropsWithoutRef<"input"> {
  schemaType: "from" | "to";
  label: string;
  selectedTokenNetwork?: string | null;
  onSelectedTokenNetwork?: () => void;
}

export default function TokenNetworkInput({
  schemaType,
  label,
  selectedTokenNetwork,
  onSelectedTokenNetwork,
  disabled,
  placeholder,
  className,
  pattern,
  onInput,
  ...props
}: Props) {
  const numberRegex = /^\d*\.?\d*$/;
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const tokenSelectBtnRef = useRef<HTMLButtonElement>(null);
  const canOpenModalWithButtonRole = !isModalOpened && !selectedTokenNetwork;

  return (
    <div
      className={cn([
        "flex flex-col items-stretch p-4 rounded-[20px] border border-[rgba(34,34,34,0.05)]",
        canOpenModalWithButtonRole && "bg-[#f9f9f9]",
      ])}
      role={!selectedTokenNetwork ? "button" : undefined}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (canOpenModalWithButtonRole) {
          tokenSelectBtnRef?.current?.click();
        }
      }}
    >
      <p className={"text-neutral2"}>{label}</p>
      <div className={"flex items-center py-2"}>
        <p
          className={cn([
            "text-neutral3 min-h-[43.199999999999996px] text-4xl font-medium w-full max-w-[314.02px]",
            selectedTokenNetwork && "hidden",
          ])}
        >
          0
        </p>
        <input
          disabled={!selectedTokenNetwork || disabled}
          placeholder={placeholder || "0"}
          className={cn([
            "bg-inherit outline-none placehoder:text-neutral3 min-h-[43.199999999999996px] text-4xl font-medium w-full max-w-[314.02px]",
            !selectedTokenNetwork && "hidden",
            className,
          ])}
          pattern={"^d*.?d*$"}
          onInput={(e) => {
            if (!numberRegex.test(e.currentTarget.value)) {
              e.currentTarget.value = e.currentTarget.value.slice(0, -1); // 잘못된 입력 제거
            }
            onInput?.(e);
          }}
          {...props}
        />
        <TokenSelectModal
          type={schemaType}
          onChangeOpenState={setIsModalOpened}
          ref={tokenSelectBtnRef}
        />
      </div>
    </div>
  );
}
