import { FiatCurrency } from '@yodlpay/yapp-sdk';
import { Address } from 'viem';

export * from './tag';
export * from './chain';

export const ACCENT_COLOR = 'gray';

export const POST_FEE = {
  currency: FiatCurrency.USD,
  amount: 0.01,
};

export const YAPP_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://messageboard-yapp.vercel.app/';
export const YAPP_ENS_NAME = 'messageboard-yapp.yodl.eth';
export const PARENT_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://dapp-git-sb-add-user-context-request-yodl.vercel.app/';

export const YODL_COMMUNITY_ADDRESS = '0x5A3598303ab723E557F577d40739062abD79d166' as Address; // fallback when not coming from a community. Only for global context app.
