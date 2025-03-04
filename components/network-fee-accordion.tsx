"use client";

import { Icons } from "@/components/icons";
import { useDictionary } from "@/hooks/use-dictionary";
import { useChainId, useGasfee } from "@/hooks/wagmi-like/uniswap";
import {
  EXTERNAL_LINKS,
  FIXED_TOKEN_PRICE,
  SupportedTokenType,
} from "@/lib/configs/uniswap-config";
import { cn } from "@/lib/utils/tailwind-util";
import { renderNetworkIcon } from "@/lib/utils/uniswap-util";
import { Accordion, AccordionItem, Selection, Tooltip } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { formatUnits } from "viem";

interface Props {
  type: "accordion" | "collapsible";
  className?: string;
  fromTicker?: SupportedTokenType;
  toTicker?: SupportedTokenType;
  fromToRatio?: number;
  totalVolume?: string;
  maxSlippage?: number;
}

const NETWORK_FEE_ACCORDION_KEY = "network-info";

export default function NetworkFeeAccordion({
  type,
  className,
  fromTicker,
  toTicker,
  fromToRatio,
  totalVolume,
  maxSlippage = 5.5,
}: Props) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const { dict } = useDictionary();
  const chainId = useChainId();
  const { data: gasFee } = useGasfee({ chainId: chainId ?? 1 });
  const visible = fromTicker && toTicker && fromToRatio && totalVolume;
  const [isFromToRatio, setIsFromToRatio] = useState(true);
  const ratioTitle = visible
    ? isFromToRatio
      ? `1 ${fromTicker} = ${fromToRatio.toLocaleString("en-US", {
          maximumFractionDigits: 9,
        })} ${toTicker}`
      : `1 ${toTicker} = ${Math.pow(fromToRatio, -1).toLocaleString("en-US", {
          maximumFractionDigits: 9,
        })} ${fromTicker}`
    : "";
  const unit = visible
    ? `(US $${(isFromToRatio
        ? FIXED_TOKEN_PRICE[fromTicker]
        : FIXED_TOKEN_PRICE[toTicker]
      ).toLocaleString("en-US", { maximumFractionDigits: 2 })})`
    : "";
  const feeRate = visible
    ? (
        parseFloat(totalVolume) *
        FIXED_TOKEN_PRICE[fromTicker] *
        0.0025
      ).toLocaleString("en-US", {
        maximumFractionDigits: 2,
      })
    : null;
  const gasFeeInUSD = gasFee ? parseFloat(formatUnits(gasFee, 9)) : null;
  const maxSlipage = visible
    ? (
        (parseFloat(totalVolume) * fromToRatio * (100 - maxSlippage)) /
        100
      ).toLocaleString("en-US", {
        maximumFractionDigits: 6,
      })
    : null;

  return (
    <div className={"flex flex-col gap-2"}>
      <Accordion
        selectedKeys={selectedKeys}
        onSelectionChange={(selection) => setSelectedKeys(selection)}
      >
        <AccordionItem
          key={NETWORK_FEE_ACCORDION_KEY}
          aria-label={"accordion-network-info"}
          className={className}
          hideIndicator={type === "collapsible"}
          classNames={{
            startContent: cn(type === "collapsible" && "w-full flex-1"),
            titleWrapper: cn(type === "collapsible" && "hidden"),
            indicator: "rotate-90 text-neutral3",
          }}
          startContent={
            type === "accordion" ? (
              <div
                className={"flex items-center gap-0.5 cursor-text"}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setIsFromToRatio((prev) => !prev);
                }}
              >
                <p className={"text-xs font-medium text-neutral2"}>
                  {ratioTitle}
                </p>
                <p className={"text-xs font-medium text-neutral3"}>{unit}</p>
              </div>
            ) : (
              <div className={"flex items-center w-full"}>
                <hr className={"bg-neutral3 w-full"} />
                <p className={"text-neutral3 whitespace-pre text-sm ml-3"}>
                  {dict?.showDetail}
                </p>
                <Icons.collapsibleOpen
                  className={cn(
                    "shrink-0 mr-3",
                    (selectedKeys === "all" ||
                      selectedKeys.has(NETWORK_FEE_ACCORDION_KEY)) &&
                      "hidden"
                  )}
                  data-open={false}
                />
                <Icons.collapsibleClose
                  className={cn(
                    "shrink-0 mr-3",
                    (selectedKeys === "all" ||
                      !selectedKeys.has(NETWORK_FEE_ACCORDION_KEY)) &&
                      "hidden"
                  )}
                  data-open={true}
                />
                <hr className={"bg-neutral3 w-full"} />
              </div>
            )
          }
        >
          <dl className={"flex flex-col gap-2 items-stretch"}>
            <div className={"flex items-center justify-between gap-3"}>
              <dt className={"flex items-center gap-0.5"}>
                <p className={"text-xs font-medium text-neutral2"}>
                  {dict?.feeRate.label}
                  {" (0.25%)"}
                </p>
                <Tooltip
                  placement={"top"}
                  content={
                    <div className={"flex flex-col gap-1 py-1 px-3"}>
                      <p
                        className={
                          "bg-white w-full max-w-[280px] text-xs font-normal text-neutral2"
                        }
                      >
                        {dict?.feeRate.desc}
                      </p>
                      <Link
                        className={"text-primary text-xs"}
                        href={EXTERNAL_LINKS.feeRate}
                        target={"_blank"}
                      >
                        {dict?.moreDetail}
                      </Link>
                    </div>
                  }
                >
                  <Icons.info className={"text-neutral3"} />
                </Tooltip>
              </dt>
              <dd className={"font-medium text-xs"}>US${feeRate}</dd>
            </div>
            <div className={"flex items-center justify-between gap-3"}>
              <dt className={"flex items-center gap-0.5"}>
                <p className={"text-xs font-medium text-neutral2"}>
                  {dict?.networkFee.label}
                </p>
                <Tooltip
                  placement={"top"}
                  content={
                    <div className={"flex flex-col gap-1 py-1 px-3"}>
                      <p
                        className={
                          "bg-white w-full max-w-[280px] text-xs font-normal text-neutral2"
                        }
                      >
                        {dict?.networkFee.desc}
                      </p>
                      <Link
                        className={"text-primary text-xs"}
                        href={EXTERNAL_LINKS.networkFee}
                        target={"_blank"}
                      >
                        {dict?.moreDetail}
                      </Link>
                    </div>
                  }
                >
                  <Icons.info className={"text-neutral3"} />
                </Tooltip>
              </dt>
              <dd
                className={
                  "font-medium text-xs text-neutral3/50 flex items-center gap-2"
                }
              >
                {renderNetworkIcon({
                  className: "size-3 rounded-[1px]",
                  chainId: chainId ?? 1,
                })}
                US$
                {gasFeeInUSD
                  ? gasFeeInUSD < 0.0001
                    ? "< 0.0001"
                    : gasFeeInUSD.toLocaleString("en-US", {
                        maximumFractionDigits: 4,
                      })
                  : null}
              </dd>
            </div>
            <div className={"flex items-center justify-between gap-3"}>
              <dt className={"text-xs font-medium text-neutral2"}>
                {dict?.rate}
              </dt>
              <dd className={"text-xs font-medium text-neutral1"}>
                {ratioTitle}
                {` (US${FIXED_TOKEN_PRICE[fromTicker ?? "ETH"].toLocaleString(
                  "en-US",
                  {
                    maximumFractionDigits: 2,
                  }
                )})`}
              </dd>
            </div>
            <div className={"flex items-center justify-between gap-3"}>
              <dt className={"flex items-center gap-0.5"}>
                <p className={"text-xs font-medium text-neutral2"}>
                  {dict?.orderRouting.label}
                </p>
                <Tooltip
                  placement={"top"}
                  content={
                    <div className={"flex flex-col gap-1 py-1 px-3"}>
                      <p
                        className={
                          "bg-white w-full max-w-[280px] text-xs font-normal text-neutral2"
                        }
                      >
                        {dict?.orderRouting.desc}
                      </p>
                      <Link
                        className={"text-primary text-xs"}
                        href={EXTERNAL_LINKS.orderRouting}
                        target={"_blank"}
                      >
                        {dict?.moreDetail}
                      </Link>
                    </div>
                  }
                >
                  <Icons.info className={"text-neutral3"} />
                </Tooltip>
              </dt>
              <dd className={"font-medium text-xs"}>Uniswap API</dd>
            </div>
            <div className={"flex items-center justify-between gap-3"}>
              <dt className={"flex items-center gap-0.5"}>
                <p className={"text-xs font-medium text-neutral2"}>
                  {dict?.priceEffect.label}
                </p>
                <Tooltip
                  placement={"top"}
                  content={
                    <div className={"flex flex-col gap-1 py-1 px-3"}>
                      <p
                        className={
                          "bg-white w-full max-w-[280px] text-xs font-normal text-neutral2"
                        }
                      >
                        {dict?.priceEffect.desc}
                      </p>
                      <Link
                        className={"text-primary text-xs"}
                        href={EXTERNAL_LINKS.priceImpact}
                        target={"_blank"}
                      >
                        {dict?.moreDetail}
                      </Link>
                    </div>
                  }
                >
                  <Icons.info className={"text-neutral3"} />
                </Tooltip>
              </dt>
              <dd className={"font-medium text-xs"}>-</dd>
            </div>
            <div className={"flex items-center justify-between gap-3"}>
              <dt className={"flex items-center gap-0.5"}>
                <p className={"text-xs font-medium text-neutral2"}>
                  {dict?.maxSlipage.label}
                </p>
                <Tooltip
                  placement={"top"}
                  content={
                    <div className={"flex flex-col gap-1 py-1 px-3"}>
                      <p
                        className={
                          "bg-white w-full max-w-[280px] text-xs font-normal text-neutral2"
                        }
                      >
                        {dict?.maxSlipage.desc}
                      </p>
                      <div
                        className={
                          "flex items-center gap-2 justify-between p-2 bg-neutral3/50 rounded-md"
                        }
                      >
                        <p className={"text-xs font-normal text-neutral2"}>
                          {dict?.maxSlipage.label}
                        </p>
                        <p className={"text-xs font-medium"}>
                          {maxSlipage} {toTicker}
                        </p>
                      </div>
                    </div>
                  }
                >
                  <Icons.info className={"text-neutral3"} />
                </Tooltip>
              </dt>
              <dd className={"font-medium text-xs"}>{maxSlippage}%</dd>
            </div>
          </dl>
        </AccordionItem>
      </Accordion>
      {type === "collapsible" &&
        selectedKeys !== "all" &&
        !selectedKeys.has(NETWORK_FEE_ACCORDION_KEY) && (
          <dl className={"flex flex-col gap-2 items-stretch"}>
            <div className={"flex items-center justify-between gap-3"}>
              <dt className={"flex items-center gap-0.5"}>
                <p className={"text-xs font-medium text-neutral2"}>
                  {dict?.feeRate.label}
                  {" (0.25%)"}
                </p>
                <Tooltip
                  placement={"top"}
                  content={
                    <div className={"flex flex-col gap-1 py-1 px-3"}>
                      <p
                        className={
                          "bg-white w-full max-w-[280px] text-xs font-normal text-neutral2"
                        }
                      >
                        {dict?.feeRate.desc}
                      </p>
                      <Link
                        className={"text-primary text-xs"}
                        href={EXTERNAL_LINKS.feeRate}
                        target={"_blank"}
                      >
                        {dict?.moreDetail}
                      </Link>
                    </div>
                  }
                >
                  <Icons.info className={"text-neutral3"} />
                </Tooltip>
              </dt>
              <dd className={"font-medium text-xs"}>US${feeRate}</dd>
            </div>
            <div className={"flex items-center justify-between gap-3"}>
              <dt className={"flex items-center gap-0.5"}>
                <p className={"text-xs font-medium text-neutral2"}>
                  {dict?.networkFee.label}
                </p>
                <Tooltip
                  placement={"top"}
                  content={
                    <div className={"flex flex-col gap-1 py-1 px-3"}>
                      <p
                        className={
                          "bg-white w-full max-w-[280px] text-xs font-normal text-neutral2"
                        }
                      >
                        {dict?.networkFee.desc}
                      </p>
                      <Link
                        className={"text-primary text-xs"}
                        href={EXTERNAL_LINKS.networkFee}
                        target={"_blank"}
                      >
                        {dict?.moreDetail}
                      </Link>
                    </div>
                  }
                >
                  <Icons.info className={"text-neutral3"} />
                </Tooltip>
              </dt>
              <dd
                className={
                  "font-medium text-xs text-neutral3/50 flex items-center gap-2"
                }
              >
                {renderNetworkIcon({
                  className: "size-3 rounded-[1px]",
                  chainId: chainId ?? 1,
                })}
                US$
                {gasFeeInUSD
                  ? gasFeeInUSD < 0.0001
                    ? "< 0.0001"
                    : gasFeeInUSD.toLocaleString("en-US", {
                        maximumFractionDigits: 4,
                      })
                  : null}
              </dd>
            </div>
          </dl>
        )}
    </div>
  );
}
