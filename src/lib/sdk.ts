import { CONFIG } from "@/constants";
import YappSDK from "@yodlpay/yapp-sdk";

export const sdk = new YappSDK({
  ensName: CONFIG.YAPP_ENS_NAME!,
  origin: CONFIG.IS_DEV ? "http://localhost:3001/" : CONFIG.PARENT_URL,
  publicKey: process.env.NEXT_PUBLIC_YODL_PUBLIC_KEY,
});
