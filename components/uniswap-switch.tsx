"use client";

import { cn } from "@/lib/utils/tailwind-util";
import { Switch } from "@heroui/react";

interface Props {
  isSelected: boolean;
  onValueChange: (toggle: boolean) => void;
}
export default function UniswapSwitch({ isSelected, onValueChange }: Props) {
  return (
    <Switch
      classNames={{
        wrapper: cn(["bg-neutral3"]),
        thumb: cn([
          "bg-neutral1 group-hover:w-7 group-hover:aspect-none",
          "group-data-[selected=true]:bg-white",
        ]),
      }}
      isSelected={isSelected}
      onValueChange={onValueChange}
      color="primary"
      size="lg"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <svg
            stroke="currentColor"
            viewBox="0 0 48 48"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            className={cn(["size-3.5", className, "text-primary"])}
          >
            <line x1="11" y1="26" x2="18" y2="33" stroke="currentColor"></line>
            <line x1="18" y1="33" x2="38" y2="14" stroke="currentColor"></line>
          </svg>
        ) : undefined
      }
    />
  );
}
