import { CHAINID_TO_VIEM_CHAIN } from "@/constants";
import { SupportedChainId } from "@/types";
import { createPublicClient, http } from "viem";

export const getPublicClientByChainId = (chainId: SupportedChainId) => {
  const chain = CHAINID_TO_VIEM_CHAIN[chainId];
  return createPublicClient({
    chain,
    transport: http(),
  });
};
