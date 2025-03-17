import { FiatCurrency } from "@yodlpay/yapp-sdk/dist/types/currency";
import { Address } from "viem";

export * from "./tag";
export * from "./chain";
export * from "./styles";

export const CONFIG = {
  YAPP_URL: process.env.NEXT_PUBLIC_YAPP_URL,
  YAPP_ENS_NAME: process.env.NEXT_PUBLIC_YAPP_ENS_NAME,
  YAPP_DOMAIN: process.env.NEXT_PUBLIC_YAPP_DOMAIN,
  PARENT_URL: process.env.NEXT_PUBLIC_PARENT_URL,
  INDEXER_URL: "https://tx.yodl.me/api/v1",
  IS_DEV: process.env.NODE_ENV === "development",
  DATABASE_URL: process.env.DATABASE_URL,
  POST_FEE: {
    currency: FiatCurrency.USD,
    amount: 0.01,
  },
  COMMUNITY_ADDRESS: "0x5A3598303ab723E557F577d40739062abD79d166" as Address,
};
