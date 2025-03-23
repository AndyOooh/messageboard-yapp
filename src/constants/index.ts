import { FiatCurrency } from "@yodlpay/yapp-sdk";
import { Address } from "viem";

export * from "./tag";
export * from "./chain";
export * from "./styles";

export const POST_FEE = {
  currency: FiatCurrency.USD,
  amount: 0.01,
};

export const YODL_COMMUNITY_ADDRESS = "0x5A3598303ab723E557F577d40739062abD79d166" as Address; // fallback when not coming from a community
