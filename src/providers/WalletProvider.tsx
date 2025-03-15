"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { darkTheme, getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { polygon, optimism, arbitrum, base, mainnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { memo } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 2,
    },
  },
});

const config = getDefaultConfig({
  appName: "Message Board Yapp",
  projectId: "YOUR_PROJECT_ID",
  chains: [polygon, optimism, arbitrum, base, mainnet],
  ssr: true,
});

export const WalletProvider = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "var(--light-purple)",
            accentColorForeground: "white",
            overlayBlur: "small",
            borderRadius: "small",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
});

WalletProvider.displayName = "WalletProvider";
