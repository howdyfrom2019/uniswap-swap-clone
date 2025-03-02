"use client";

import { Icons } from "@/components/icons";
import NetworkFeeAccordion from "@/components/network-fee-accordion";
import { SwapFormData } from "@/features/swap/swap-form";
import { useDictionary } from "@/hooks/use-dictionary";
import { SupportedTokenType } from "@/lib/configs/uniswap-config";
import { cn } from "@/lib/utils/tailwind-util";
import { convertToUSD } from "@/lib/utils/volume-util";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";

interface Props {
  ratio?: number;
  formState: Omit<SwapFormData, "isUpperFocus">;
  handleSwapAction?: () => void;
}

export default function SwapConfirmModal({
  ratio,
  formState,
  handleSwapAction,
}: Props) {
  const { isOpen, onOpenChange } = useDisclosure({
    defaultOpen: true,
  });
  const { dict } = useDictionary();

  return (
    <Modal
      size={"sm"}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior={"inside"}
      closeButton={
        <button>
          <Icons.close className={"!p-0 mt-2 mr-2 size-4"} />
        </button>
      }
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader
              className={
                "flex flex-col mx-3 gap-1 px-4 pt-4 pb-0 text-neutral2 text-base font-medium"
              }
            >
              {dict?.Swaping}
            </ModalHeader>
            <ModalBody className={"px-4"}>
              <dl className={"flex flex-col gap-4 m-3"}>
                <div className={"flex items-center"}>
                  <div className={"w-full flex flex-col gap-2"}>
                    <dt className={"text-2xl font-medium"}>
                      {formState.fromAmount} {formState.fromToken.symbol}
                    </dt>
                    <dd className={"text-base text-neutral2 font-medium"}>
                      US $
                      {convertToUSD({
                        symbol: formState.fromToken
                          .symbol as SupportedTokenType,
                        volume: formState.fromAmount,
                        decimals: formState.fromToken.decimals,
                      })}
                    </dd>
                  </div>
                  <Avatar
                    className={"size-10 bg-zinc-300 shrink-0"}
                    src={formState.fromToken.logoURI}
                  />
                </div>
                <Icons.arrowDown className={"text-neutral3"} />
                <div className={"flex items-center"}>
                  <div className={"w-full flex flex-col gap-2"}>
                    <dt className={"text-2xl font-medium"}>
                      {formState.toAmount} {formState.toToken.symbol}
                    </dt>
                    <dd className={"text-base text-neutral2 font-medium"}>
                      US $
                      {convertToUSD({
                        symbol: formState.toToken.symbol as SupportedTokenType,
                        volume: formState.toAmount,
                        decimals: formState.toToken.decimals,
                      })}
                    </dd>
                  </div>
                  <Avatar
                    className={"size-10 bg-zinc-300 shrink-0"}
                    src={formState.toToken.logoURI}
                  />
                </div>
              </dl>
              <NetworkFeeAccordion
                type={"collapsible"}
                className={cn(!ratio && "hidden")}
                fromTicker={formState.fromToken.symbol as SupportedTokenType}
                toTicker={formState.toToken.symbol as SupportedTokenType}
                fromToRatio={ratio}
                totalVolume={formState.fromAmount}
                maxSlippage={formState.config.maxSlippage}
              />
            </ModalBody>
            <ModalFooter className={"p-4"}>
              <Button
                color={"primary"}
                size={"lg"}
                className={cn([
                  "w-full font-semibold text-lg text-white",
                  "disabled:!bg-[#f9f9f9] disabled:!text-zinc-500 disabled:!opacity-100",
                ])}
                onPress={() => {
                  onClose();
                  handleSwapAction?.();
                }}
              >
                {dict?.header.nav.trade.swap}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
