"use client";

import { Icons } from "@/components/icons";
import NetworkPopover from "@/components/network-popover";
import { useDictionary } from "@/hooks/use-dictionary";
import useTokenByNetwork from "@/hooks/use-token-by-network";
import useUserBehaviour from "@/hooks/use-user-behaviour";
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
import { TokenInfo } from "@uniswap/token-lists";
import { forwardRef, useState } from "react";

interface Props {
  type: "from" | "to";
  token?: TokenInfo;
  onChangeTokenSelect: (token?: TokenInfo) => void;
}

interface NetworkSearchParams {
  query: string;
  chainId: number | null;
}

const TokenWithNetworkSpecButton = ({
  token,
  networkSearchParams,
  onClick,
}: {
  token: TokenInfo;
  networkSearchParams: NetworkSearchParams;
  onClick?: (token: TokenInfo) => void;
}) => {
  return (
    <button
      className={
        "flex items-center gap-3 px-4 py-3 hover:bg-[rgba(134,134,134,0.05)] text-start"
      }
      onClick={(e) => {
        e.preventDefault();
        onClick?.(token);
      }}
      key={token.chainId + token.symbol}
    >
      <div className={"relative size-10"}>
        <Avatar className={"bg-zinc-300"} src={token.logoURI} />
        {networkSearchParams.chainId && networkSearchParams.chainId > 1 && (
          <div className={"absolute right-0 bottom-0 size-[18px]"}>
            {renderNetworkIcon({
              chainId: networkSearchParams.chainId,
              className: "size-[18px] rounded-md border border-white",
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
            <p className={"text-sm text-neutral3 text-ellipsis tracking-tight"}>
              {toHashOmitString(token.address)}
            </p>
          </div>
        </dd>
      </dl>
    </button>
  );
};

const TokenSelectModal = forwardRef<HTMLButtonElement, Props>(
  ({ type, token, onChangeTokenSelect }, ref) => {
    const [networkSearchParams, setNetworkSearchParams] =
      useState<NetworkSearchParams>({
        query: "",
        chainId: type === "from" ? 1 : null,
      });
    const { dict, locale } = useDictionary();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { data: tokenList } = useTokenByNetwork(networkSearchParams);
    const { searchHistory, addSearchResult } = useUserBehaviour();
    const showQuickMenuSection =
      searchHistory[type]?.filter(
        (v) => v.chainId === networkSearchParams.chainId
      ).length || networkSearchParams.chainId === null;
    const filteredRecentHistoryTokens =
      networkSearchParams.chainId === null
        ? searchHistory[type]
        : searchHistory[type].filter(
            (v) => v.chainId === networkSearchParams.chainId
          );

    const handleClickTokenAsset = (token: TokenInfo) => {
      onChangeTokenSelect(token);
      addSearchResult({
        result: token,
        type,
      });
    };

    return (
      <>
        <Button
          className={cn([
            "rounded-full font-medium h-9 px-3 text-base shadow-[rgba(34,34,34,0.04),0,0,10px] shrink-0",
            token?.chainId &&
              "bg-white border shadow-lg pl-1 border-[rgb(242,242,242)] font-semibold tracking-tight",
            !token?.chainId && "text-white",
          ])}
          onPress={onOpen}
          ref={ref}
        >
          {token?.chainId && (
            <div className={"relative size-7"}>
              <Avatar className={"size-7 bg-zinc-300"} src={token.logoURI} />
              {networkSearchParams.chainId &&
                networkSearchParams.chainId > 1 && (
                  <div
                    className={"absolute -right-0.5 -bottom-0.5 size-[13px]"}
                  >
                    {renderNetworkIcon({
                      chainId: networkSearchParams.chainId,
                      className: "size-[13px] rounded-sm border border-white",
                    })}
                  </div>
                )}
            </div>
          )}
          {token?.symbol ?? dict?.tokenSelect}
          <Icons.chevronLeft
            className={cn(["-rotate-90", token?.chainId && "text-zinc-400"])}
          />
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
            {(onClose) => (
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
                        className={cn([
                          "flex items-center gap-2 text-neutral2 font-medium pt-3 px-4 pb-1",
                          !showQuickMenuSection && "hidden",
                        ])}
                      >
                        <Icons.time />
                        <p>{dict?.tokenSelectModal.recent}</p>
                      </div>
                      {showQuickMenuSection
                        ? filteredRecentHistoryTokens.map((token) => (
                            <TokenWithNetworkSpecButton
                              token={token}
                              networkSearchParams={{
                                query: "",
                                chainId: token.chainId,
                              }}
                              onClick={(token) => {
                                handleClickTokenAsset(token);
                                onClose();
                              }}
                              key={token.chainId + token.symbol}
                            />
                          ))
                        : null}
                      <div
                        className={
                          "flex items-center gap-2 text-neutral2 font-medium pt-3 px-4 pb-1"
                        }
                      >
                        <Icons.star />
                        <p>{dict?.tokenSelectModal.dayVolume}</p>
                      </div>
                      {tokenList.map((token) => (
                        <TokenWithNetworkSpecButton
                          token={token}
                          networkSearchParams={networkSearchParams}
                          onClick={(token) => {
                            handleClickTokenAsset(token);
                            onClose();
                          }}
                          key={token.chainId + token.symbol}
                        />
                      ))}
                    </div>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
);

export default TokenSelectModal;
TokenSelectModal.displayName = "token-select-modal";
