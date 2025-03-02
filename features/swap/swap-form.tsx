"use client";

import ConnectButton from "@/components/connect-button";
import { Icons } from "@/components/icons";
import TokenNetworkInput, {
  TokenNetworkSelectData,
} from "@/components/token-network-input";
import SwapConfig from "@/features/swap/swap-config";
import { useDictionary } from "@/hooks/use-dictionary";
import { useAccount, useQuoting } from "@/hooks/wagmi-like/uniswap";
import { ETH_TOKEN, SupportedTokenType } from "@/lib/configs/uniswap-config";
import { cn } from "@/lib/utils/tailwind-util";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  fromToken: z.object({
    address: z.string().min(0),
    chainId: z.coerce.number(),
    decimals: z.coerce.number(),
    logoURI: z.string().optional(),
    name: z.string(),
    symbol: z.string(),
  }),
  toToken: z.object({
    address: z.string().min(0),
    chainId: z.coerce.number(),
    decimals: z.coerce.number(),
    logoURI: z.string().optional(),
    name: z.string(),
    symbol: z.string(),
  }),
  fromAmount: z.string(),
  toAmount: z.string(),
  isUpperFocus: z.boolean(),
  config: z.object({
    maxSlippage: z.coerce.number().optional(),
    maxTxPeriod: z.coerce.number(),
    tradeOption: z.object({
      default: z.boolean(),
      x: z.boolean(),
      v2: z.boolean(),
      v3: z.boolean(),
      v4: z.boolean(),
    }),
  }),
});

type FormData = z.infer<typeof schema>;

export default function SwapForm() {
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const { isConnected } = useAccount();
  const [isOpenConfigPopover, setIsOpenConfigPopover] = useState(false);
  const form = useForm<FormData>({
    defaultValues: {
      fromToken: {
        ...ETH_TOKEN,
        chainId: 1,
      },
      fromAmount: "",
      toAmount: "",
      isUpperFocus: true,
      config: {
        maxTxPeriod: 30,
        tradeOption: {
          default: true,
          x: true,
          v2: true,
          v3: true,
          v4: true,
        },
      },
    },
    resolver: zodResolver(schema),
  });

  const {
    isOverMaxValue,
    isSubmitting,
    toAmount: calculatedToAmount,
    fromAmount: calculatedFromAmount,
  } = useQuoting({
    fromToken: {
      symbol: form.watch("fromToken.symbol") as SupportedTokenType,
      address: form.watch("fromToken.address"),
      decimals: form.watch("fromToken.decimals"),
      chainId: form.watch("fromToken.chainId"),
    },
    toToken: {
      symbol: form.watch("toToken.symbol") as SupportedTokenType,
      address: form.watch("toToken.address"),
      decimals: form.watch("toToken.decimals"),
      chainId: form.watch("toToken.chainId"),
    },
    fromAmount: form.watch("fromAmount"),
    toAmount: form.watch("toAmount"),
  });

  const isDisabledSubmitButton =
    (isConnected && !form.watch("toToken.chainId")) ||
    isOverMaxValue ||
    isSubmitting;

  const { dict } = useDictionary();

  const onSubmit = (formData: FormData) => {
    console.log(calculatedFromAmount, calculatedToAmount);
    console.log(formData);
  };

  const switchFromToTicker = () => {
    const fromToken = { ...form.watch("fromToken") };
    const toToken = { ...form.watch("toToken") };
    const fromAmount = form.watch("fromAmount");
    const toAmount = form.watch("toAmount");

    form.setValue("fromToken", toToken);
    form.setValue("toToken", fromToken);
    form.setValue("fromAmount", toAmount);
    form.setValue("toAmount", fromAmount);
  };

  const handleOnChangeTokenNetwork = (
    type: "from" | "to",
    data: Partial<TokenNetworkSelectData>
  ) => {
    const { amount, token } = data;
    const pairTokenSpec = form.watch(type === "from" ? "toToken" : "fromToken");

    if (
      pairTokenSpec &&
      token?.address === pairTokenSpec.address &&
      token?.chainId === pairTokenSpec.chainId &&
      token?.name === pairTokenSpec.name
    ) {
      switchFromToTicker();
      return;
    }

    if (token) {
      form.setValue(`${type}Token`, token);
    }

    if (amount !== undefined) {
      if (type === "from" && !form.watch("toToken.chainId")) return;
      if (amount === "") {
        console.log("amount is blank");
        form.resetField(`${type}Amount`);
        return;
      }

      console.log("amount is filled");
      form.setValue(`${type}Amount`, String(amount));
    }
  };

  if (!dict) return null;

  const formHeaders = [
    { label: dict.header.nav.trade.swap, href: "/swap" },
    { label: dict.header.nav.trade.limit, href: "/limit" },
    { label: dict.header.nav.trade.send, href: "/send" },
    { label: dict.header.nav.trade.buy, href: "/buy" },
  ];

  return (
    <div className={"flex flex-col items-stretch gap-0.5"}>
      <div className={"flex items-center gap-5 justify-between"}>
        <div className={"flex items-center gap-3 p-1"}>
          {formHeaders.map((header) => (
            <Link
              href={"#"}
              className={cn([
                "text-sm flex items-stretch py-1 w-fit px-3 rounded-full text-center font-bold text-neutral2 hover:text-neutral1",
                header.href === "/swap" &&
                  "bg-[rgba(34,34,34,0.05)] text-neutral1 hover:text-neutral1-hover hover:bg-[rgba(34,34,34,0.09)]",
              ])}
              key={header.href}
            >
              {header.label}
            </Link>
          ))}
        </div>
        <SwapConfig
          isOpen={isOpenConfigPopover}
          onOpenChange={setIsOpenConfigPopover}
          onChangeConfig={(config) => {
            form.setValue("config", config);
          }}
        />
      </div>
      <form
        className={"flex flex-col items-stretch gap-0.5"}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className={"flex flex-col items-stretch gap-0.5 relative"}>
          <TokenNetworkInput
            isFocusing={Boolean(form.watch("isUpperFocus"))}
            schemaType={"from"}
            label={dict.sell}
            selectedTokenNetwork={{
              token: form.watch("fromToken"),
              amount: calculatedFromAmount || form.watch("fromAmount"),
            }}
            onChangeTokenNetwork={(data) => {
              handleOnChangeTokenNetwork("from", data);
            }}
            onClick={(e) => {
              e.preventDefault();
              if (Boolean(form.watch("fromToken").chainId)) {
                form.setValue("isUpperFocus", true);
              }
            }}
            onChange={(e) => {
              form.setValue("fromAmount", e.target.value);
            }}
          />
          <TokenNetworkInput
            isFocusing={!Boolean(form.watch("isUpperFocus"))}
            schemaType={"to"}
            label={dict.buy}
            selectedTokenNetwork={{
              token: form.watch("toToken"),
              amount: calculatedToAmount || form.watch("toAmount"),
            }}
            onChangeTokenNetwork={(data) => {
              handleOnChangeTokenNetwork("to", data);
            }}
            onClick={(e) => {
              e.preventDefault();
              if (Boolean(form.watch("toToken").chainId)) {
                form.setValue("isUpperFocus", false);
              }
            }}
            onChange={(e) => {
              console.log(e.target.value);
              form.setValue("toAmount", e.target.value);
            }}
          />
          <button
            className={
              "rounded-2xl bg-[#f9f9f9] p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[2px] border-white"
            }
            onClick={(e) => {
              e.preventDefault();
              switchFromToTicker();
            }}
          >
            <Icons.arrowDown />
          </button>
        </div>
        <ConnectButton
          isDisabled={isDisabledSubmitButton}
          usage={"form"}
          color={"secondary"}
          size={"lg"}
          className={cn([
            "text-primary font-semibold text-lg mt-1",
            "disabled:!bg-[#f9f9f9] disabled:!text-zinc-500 disabled:!opacity-100",
            isConnected && "text-white",
          ])}
          onPress={() => {
            if (isConnected && (calculatedToAmount || calculatedFromAmount)) {
              submitBtnRef.current?.click();
            }
          }}
        >
          {isSubmitting ? (
            <>
              <Icons.loaderIcon className={"size-4 animate-spin mr-2"} />
              {dict.quoting}
            </>
          ) : isConnected ? (
            form.watch("toToken.chainId") ? (
              dict?.review
            ) : (
              dict?.tokenSelectModal.label
            )
          ) : (
            dict?.connectWallet
          )}
        </ConnectButton>
        <button
          disabled={isDisabledSubmitButton}
          type={"submit"}
          className={"hidden"}
          ref={submitBtnRef}
        />
      </form>
    </div>
  );
}
