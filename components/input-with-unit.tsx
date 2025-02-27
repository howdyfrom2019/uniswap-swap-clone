"use client";

import { cn } from "@/lib/utils/tailwind-util";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  suffixLabel?: React.ReactNode;
  unit: string;
}

export default function InputWithUnit({
  suffixLabel,
  unit,
  className,
  ...props
}: Props) {
  const isAuto = !Boolean(props.value);

  return (
    <div
      className={cn([
        "group flex items-stretch relative gap-1 p-1 pr-2 shrink-0 rounded-2xl border",
        "focus-within:border-secondary focus-within:bg-zinc-50",
        "h-[34px]",
      ])}
    >
      <p
        className={cn([
          "px-2 font-bold text-sm rounded-full py-0.5 transition-colors",
          "text-zinc-500 bg-zinc-200",
          isAuto && "text-primary bg-secondary",
          "group-focus-within:text-zinc-500 group-focus-within:bg-zinc-200",
          !suffixLabel && "hidden",
        ])}
      >
        {suffixLabel}
      </p>
      <input
        className={cn([
          "bg-transparent text-sm text-end border-none outline-none w-full max-w-11",
          "placeholder:text-sm placeholder:font-medium placeholder:text-neutral2",
          className,
        ])}
        {...props}
      />
      <div className={"text-neutral2 my-auto text-sm whitespace-pre-wrap"}>
        {unit}
      </div>
    </div>
  );
}
