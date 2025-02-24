"use client";

import { Icons } from "@/components/icons";
import NetworkPopover from "@/components/network-popover";
import { useDictionary } from "@/hooks/use-dictionary";
import useTokenByNetwork from "@/hooks/use-token-by-network";
import { toHashOmitString } from "@/lib/utils/hash-util";
import { cn } from "@/lib/utils/tailwind-util";
import { renderNetworkIcon } from "@/lib/utils/uniswap-util";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { forwardRef, useEffect, useState } from "react";

interface Props {
  type: "from" | "to";
  onChangeOpenState: (isOpen: boolean) => void;
}

const TokenSelectModal = forwardRef<HTMLButtonElement, Props>(
  ({ type, onChangeOpenState }, ref) => {
    const [networkSearchParams, setNetworkSearchParams] = useState({
      query: "",
      chainId: type === "from" ? 1 : null,
    });
    const { dict, locale } = useDictionary();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { data: tokenList, isLoading } =
      useTokenByNetwork(networkSearchParams);

    useEffect(() => {
      onChangeOpenState(isOpen);
    }, [onChangeOpenState, isOpen]);

    return (
      <>
        <Button
          className={cn([
            "rounded-full text-white font-medium h-9 px-3 text-base shadow-[rgba(34,34,34,0.04),0,0,10px] shrink-0",
          ])}
          onPress={onOpen}
          ref={ref}
        >
          {dict?.tokenSelect}
          <Icons.chevronLeft className={cn(["-rotate-90"])} />
        </Button>
        <Modal
          size={"sm"}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior={"inside"}
          closeButton={
            <button>
              <Icons.close className={"!p-0 mt-1 mr-1"} />
            </button>
          }
        >
          <ModalContent>
            <>
              <ModalHeader className={"flex flex-col gap-1 px-4 pt-4 pb-0"}>
                {dict?.tokenSelectModal.label}
              </ModalHeader>
              <ModalBody className={"p-0"}>
                <div className={"flex flex-col gap-2 min-h-[586px] h-full"}>
                  <div
                    className={
                      "flex mx-auto mt-2 relative items-center gap-1 w-[calc(100%-32px)] px-4 py-1 h-10 rounded-[20px] bg-[rgb(249,249,249)] border"
                    }
                  >
                    <Icons.search />
                    <input
                      placeholder={
                        locale === "ko-KR" ? "토큰 검색" : "Search a token"
                      }
                      className={
                        "flex-1 bg-transparent border-none outline-none placeholder:font-medium placeholder:tracking-tight"
                      }
                      onChange={(e) =>
                        setNetworkSearchParams((prev) => ({
                          ...prev,
                          query: e.target.value,
                        }))
                      }
                      value={networkSearchParams.query}
                    />
                    <NetworkPopover
                      chainId={networkSearchParams.chainId}
                      onChangeSelectedChainId={(chainId) => {
                        console.log(chainId);
                        setNetworkSearchParams((prev) => ({
                          ...prev,
                          chainId,
                        }));
                      }}
                    />
                  </div>
                  <div className={"flex flex-col"}>
                    <div
                      className={
                        "flex items-center gap-2 text-neutral2 font-medium pt-3 px-4 pb-1"
                      }
                    >
                      <Icons.star />
                      <p>{dict?.tokenSelectModal.dayVolume}</p>
                    </div>
                    {tokenList.map((token) => (
                      <button
                        className={
                          "flex items-center gap-3 px-4 py-3 hover:bg-[rgba(134,134,134,0.05)] text-start"
                        }
                        key={token.chainId + token.symbol}
                      >
                        <div className={"relative size-10"}>
                          <Avatar
                            className={"bg-zinc-300"}
                            src={token.logoURI}
                          />
                          {networkSearchParams.chainId &&
                            networkSearchParams.chainId > 1 && (
                              <div
                                className={
                                  "absolute right-0 bottom-0 size-[18px]"
                                }
                              >
                                {renderNetworkIcon({
                                  chainId: networkSearchParams.chainId,
                                  className:
                                    "size-[18px] rounded-md border border-white",
                                })}
                              </div>
                            )}
                        </div>
                        <dl className={"flex flex-col"}>
                          <dt className={"font-medium"}>{token.name}</dt>
                          <dd>
                            <div className={"flex items-center gap-2"}>
                              <p
                                className={
                                  "text-sm text-neutral2 tracking-tight font-medium text-ellipsis w-full max-w-[48px]"
                                }
                              >
                                {token.symbol}
                              </p>
                              <p
                                className={
                                  "text-sm text-neutral3 text-ellipsis tracking-tight"
                                }
                              >
                                {toHashOmitString(token.address)}
                              </p>
                            </div>
                          </dd>
                        </dl>
                      </button>
                    ))}
                  </div>
                </div>
              </ModalBody>
            </>
          </ModalContent>
        </Modal>
      </>
    );
  }
);

export default TokenSelectModal;
TokenSelectModal.displayName = "token-select-modal";
