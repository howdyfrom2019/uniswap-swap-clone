"use client";

import { Icons } from "@/components/icons";
import InputWithUnit from "@/components/input-with-unit";
import UniswapSwitch from "@/components/uniswap-switch";
import { useDictionary } from "@/hooks/use-dictionary";
import { EXTERNAL_LINKS } from "@/lib/configs/uniswap-config";
import { cn } from "@/lib/utils/tailwind-util";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  maxSlippage: z.coerce.number().optional(),
  maxTxPeriod: z.coerce.number(),
  tradeOption: z.object({
    default: z.boolean(),
    x: z.boolean(),
    v2: z.boolean(),
    v3: z.boolean(),
    v4: z.boolean(),
  }),
});

type Config = z.infer<typeof schema>;
type UniswapPoolOption = "x" | "v2" | "v3" | "v4";

interface SwapConfigProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChangeConfig: (config: Config) => void;
}

export default function SwapConfig({
  isOpen,
  onOpenChange,
  onChangeConfig,
}: SwapConfigProps) {
  const form = useForm<Config>({
    defaultValues: {
      maxTxPeriod: 30,
      tradeOption: {
        default: true,
        x: true,
        v2: true,
        v3: true,
        v4: true,
      },
    },
    resolver: zodResolver(schema),
  });
  const allFields = form.watch();
  const { dict, locale } = useDictionary();
  const [optionPage, setOptionPage] = useState(false);
  const [tradeOptionTemporalData, setTradeOptionTemporalData] = useState<
    Config["tradeOption"]
  >(form.getValues("tradeOption"));

  const onSubmit = (data: Config) => {
    form.setValue("tradeOption", tradeOptionTemporalData);
    onOpenChange(false);
  };

  const onConfigCallback = () => {
    onChangeConfig(allFields);
  };

  useEffect(() => {
    onConfigCallback();
  }, [allFields]);

  return (
    <Popover
      placement={"bottom-end"}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <PopoverTrigger className={"outline-none"}>
        <button className={"px-0.5 active:opacity-80"}>
          <Icons.cog className={"text-zinc-500 w-5"} />
        </button>
      </PopoverTrigger>
      <PopoverContent className={"w-80"}>
        <form
          className={"w-full flex flex-col gap-1 px-3 py-1"}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className={cn("py-3", optionPage && "hidden")}>
            <div className={"flex items-center gap-4 justify-between py-1"}>
              <div
                className={"flex items-center gap-1 active:opacity-80"}
                role={"button"}
              >
                <p className={"text-base"}>{dict?.swap.maxSlipage.label}</p>
                <Tooltip
                  placement={"bottom"}
                  content={
                    <p
                      className={
                        "bg-white py-1 px-3 w-full max-w-[280px] text-xs font-normal text-neutral2"
                      }
                    >
                      {dict?.swap.maxSlipage.desc}
                    </p>
                  }
                >
                  <Icons.info className={"text-[rgb(191,191,191)]"} />
                </Tooltip>
              </div>
              <InputWithUnit
                pattern={"^d*.?d*$"}
                onInput={(e) => {
                  if (!/^d*.?d*$/.test(e.currentTarget.value)) {
                    e.currentTarget.value = e.currentTarget.value.slice(0, -1); // 잘못된 입력 제거
                  }
                }}
                className={"text-neutral2"}
                placeholder={"5.50"}
                unit={"%"}
                suffixLabel={dict?.auto}
                {...form.register("maxSlippage")}
              />
            </div>
            <div className={"flex items-center gap-4 justify-between py-1"}>
              <div
                className={"flex items-center gap-1 active:opacity-80"}
                role={"button"}
              >
                <p className={"text-base"}>{dict?.swap.transaction.label}</p>
                <Tooltip
                  placement={"bottom"}
                  content={
                    <p
                      className={
                        "bg-white py-1 px-3 w-full max-w-[280px] text-xs font-normal text-neutral2"
                      }
                    >
                      {dict?.swap.transaction.desc}
                    </p>
                  }
                >
                  <Icons.info className={"text-[rgb(191,191,191)]"} />
                </Tooltip>
              </div>
              <InputWithUnit
                type={"number"}
                className={"text-neutral2"}
                unit={"minutes"}
                {...form.register("maxTxPeriod")}
              />
            </div>
            <div className={"flex items-center gap-4 justify-between py-1"}>
              <div
                className={"flex items-center gap-1 active:opacity-80"}
                role={"button"}
              >
                <p className={"text-base"}>{dict?.swap.option.label}</p>
              </div>
              <button
                className={
                  "h-[34px] flex items-center gap-2 text-base text-neutral3-hover"
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOptionPage(true);
                }}
              >
                <p>{dict?.swap.option.basic.label}</p>
                <Icons.chevronLeft className={"rotate-180 text-inherit"} />
              </button>
            </div>
          </div>
          <div className={cn("py-2", !optionPage && "hidden")}>
            <div className={"flex flex-col gap-1"}>
              <div className={"flex items-center gap-2 justify-between mb-4"}>
                <Icons.chevronLeft
                  className={"text-neutral3"}
                  role={"button"}
                  onClick={() => setOptionPage(false)}
                />
                <p className={"text-lg"}>{dict?.swap.option.label}</p>
                <div className={"size-4"} />
              </div>
              <div className={"flex items-start gap-4 justify-between py-1"}>
                <div className={"flex flex-col gap-0.5"}>
                  <div className={"flex items-center gap-2"}>
                    <p className={"text-base text-start"}>
                      {dict?.swap.option.basic.label}
                    </p>
                    <Tooltip
                      placement={"bottom"}
                      content={
                        <p
                          className={
                            "bg-white py-1 px-3 w-full max-w-[280px] text-xs font-normal text-neutral2"
                          }
                        >
                          {dict?.swap.option.basic.info}
                        </p>
                      }
                    >
                      <Icons.info className={"text-[rgb(191,191,191)]"} />
                    </Tooltip>
                  </div>
                  <p
                    className={"text-sm text-neutral3-hover -tracking-[0.5px]"}
                  >
                    {dict?.swap.option.basic.desc}
                  </p>
                  <Tooltip
                    placement={"top"}
                    showArrow={true}
                    content={
                      <div
                        className={
                          "flex items-center gap-2 py-1 px-3 w-full max-w-[280px] bg-white"
                        }
                      >
                        <Icons.uniswapX className={"size-6"} />
                        <div
                          className={"w-full flex flex-col items-start gap-2"}
                        >
                          <p className={"text-xs font-normal text-neutral2"}>
                            {dict?.swap.option.uniswapX.desc}
                          </p>
                          <Link
                            className={"text-primary text-xs"}
                            href={EXTERNAL_LINKS.uniswapX}
                            target={"_blank"}
                          >
                            {dict?.moreDetail}
                          </Link>
                        </div>
                      </div>
                    }
                  >
                    <div
                      className={cn([
                        "flex items-center w-fit",
                        !tradeOptionTemporalData.default && "hidden",
                      ])}
                    >
                      <Icons.uniswapX />
                      <div
                        className={cn([
                          "flex items-center gap-2 ml-2",
                          locale === "ko-KR" && "flex-row-reverse",
                        ])}
                      >
                        <p className={"text-sm text-neutral3-hover"}>
                          {dict?.include}
                        </p>
                        <p
                          className={
                            "[background-image:linear-gradient(0deg,#4673fa_-101.76%,#9646fa_101.76%)] bg-clip-text text-transparent tracking-tight"
                          }
                        >
                          {dict?.swap.option.uniswapX.label}
                        </p>
                      </div>
                    </div>
                  </Tooltip>
                </div>
                <UniswapSwitch
                  isSelected={tradeOptionTemporalData.default}
                  onValueChange={(toggle) =>
                    setTradeOptionTemporalData((prev) => ({
                      ...prev,
                      default: toggle,
                    }))
                  }
                />
              </div>
              {(["x", "v4", "v3", "v2"] as UniswapPoolOption[]).map((pool) => (
                <div
                  className={cn([
                    "flex items-center gap-2 justify-between py-1",
                    tradeOptionTemporalData.default && "hidden",
                  ])}
                  key={pool}
                >
                  {pool === "x" ? (
                    <div className={"flex items-center gap-2"}>
                      <Icons.uniswapX />
                      <p
                        className={
                          "[background-image:linear-gradient(0deg,#4673fa_-101.76%,#9646fa_101.76%)] bg-clip-text text-transparent tracking-tight"
                        }
                      >
                        {dict?.swap.option.uniswapX.label}
                      </p>
                      <Tooltip
                        placement={"top"}
                        showArrow={true}
                        content={
                          <div
                            className={
                              "flex items-center gap-2 py-1 px-3 w-full max-w-[280px] bg-white"
                            }
                          >
                            <Icons.uniswapX className={"size-6"} />
                            <div
                              className={
                                "w-full flex flex-col items-start gap-2"
                              }
                            >
                              <p
                                className={"text-xs font-normal text-neutral2"}
                              >
                                {dict?.swap.option.uniswapX.desc}
                              </p>
                              <Link
                                className={"text-primary text-xs"}
                                href={EXTERNAL_LINKS.uniswapX}
                                target={"_blank"}
                              >
                                {dict?.moreDetail}
                              </Link>
                            </div>
                          </div>
                        }
                      >
                        <Icons.info className={"text-neutral3-hover"} />
                      </Tooltip>
                    </div>
                  ) : (
                    <p className={"text-base"}>
                      {`${pool}${locale === "ko-KR" ? " 풀" : " pools"}`}
                    </p>
                  )}
                  <UniswapSwitch
                    isSelected={tradeOptionTemporalData[pool]}
                    onValueChange={(toggle) =>
                      setTradeOptionTemporalData((prev) => ({
                        ...prev,
                        [pool]: toggle,
                      }))
                    }
                  />
                </div>
              ))}
            </div>
            <Button
              type={"submit"}
              className={"bg-zinc-100 font-bold text-lg w-full mt-4"}
              size={"lg"}
            >
              {dict?.save}
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
