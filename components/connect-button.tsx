"use client";

import { useDictionary } from "@/hooks/use-dictionary";
import {
  useAccount,
  useConnect,
  useDisconnect,
} from "@/hooks/wagmi-like/uniswap";
import { cn } from "@/lib/utils/tailwind-util";
import { Button, type ButtonProps } from "@heroui/react";

interface Props extends ButtonProps {
  usage: "header" | "form";
  chainId?: number;
}
export default function ConnectButton({
  chainId,
  onPress,
  color,
  usage,
  children,
  ...props
}: Props) {
  const { dict } = useDictionary();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();

  const handleOnPress = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect({
        chainId,
      });
    }
  };

  if (usage === "header" && isConnected) {
    return (
      <Button
        variant={"light"}
        size={"sm"}
        className={"!bg-transparent !border-none !p-2 !hover:bg-zinc-200"}
        onPress={(e) => {
          handleOnPress();
          onPress?.(e);
        }}
      >
        {children}
      </Button>
    );
  }

  if (usage === "form" && isConnected) {
    return (
      <Button
        color={"primary"}
        onPress={(e) => {
          onPress?.(e);
        }}
        size={props.size}
        className={cn(["text-white", props.className])}
        {...props}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      color={color}
      onPress={(e) => {
        handleOnPress();
        onPress?.(e);
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
