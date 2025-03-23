import YappSDK from "@yodlpay/yapp-sdk";

const devOrigin = "http://localhost:3001/";
const prodOrigin = "https://dapp-git-sb-add-user-context-request-yodl.vercel.app/";

export const sdk = new YappSDK({
  ensName: "messageboard-yapp.yodl.eth",
  origin: process.env.NODE_ENV === "development" ? devOrigin : prodOrigin,
});
