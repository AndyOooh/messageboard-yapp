import { getChains } from '@yodlpay/tokenlists';
import { SupportedChainId } from '@/types';
import { mainnet, polygon, arbitrum, base } from 'viem/chains';

export const CHAINID_TO_VIEM_CHAIN = {
  [mainnet.id]: mainnet,
  [polygon.id]: polygon,
  [arbitrum.id]: arbitrum,
  [base.id]: base,
};

export const SUPPORTED_CHAIN_IDS = Object.keys(CHAINID_TO_VIEM_CHAIN).map(
  Number,
) as SupportedChainId[];

export const SUPPORTED_CHAINS = getChains().filter((chain) =>
  SUPPORTED_CHAIN_IDS.includes(chain.chainId as SupportedChainId),
);
