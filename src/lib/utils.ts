import { isAddress } from 'viem';

export const getEnsOrTruncatedAddress = (ens: string) => {
  return isAddress(ens) ? ens.slice(0, 6) + '...' + ens.slice(-4) : ens;
};
