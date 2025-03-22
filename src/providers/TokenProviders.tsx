"use client";

import { createContext, useContext, ReactNode, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { sdk } from "@/lib/sdk";
import { FullScreenLoader } from "@/components/ui/Loader";
import { JWTPayload } from "@yodlpay/yapp-sdk/dist/types/jwt";

type TokenContextType = {
  tokenInfo: JWTPayload | null;
  setTokenInfo: (info: JWTPayload) => void;
  isLoading: boolean;
};

const TokenContext = createContext<TokenContextType | undefined>(undefined);

function TokenProviderInner({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [tokenInfo, setTokenInfo] = useState<JWTPayload | null>(null);

  useEffect(() => {
    const verifyJWT = async () => {
      const jwt = searchParams.get("jwt");

      if (jwt) {
        try {
          const payload = await sdk.verify(jwt);
          if (!payload) throw new Error("Invalid JWT payload");
          localStorage.setItem("tokenInfo", JSON.stringify(payload));
          setTokenInfo(payload as JWTPayload);
        } catch (error) {
          console.error("Failed to verify JWT:", error);
          const saved = localStorage.getItem("tokenInfo");
          if (saved) {
            setTokenInfo(JSON.parse(saved));
          }
        }
      } else {
        const saved = localStorage.getItem("tokenInfo");
        if (saved) {
          setTokenInfo(JSON.parse(saved));
        }
      }
      setIsLoading(false);
    };

    verifyJWT();
  }, [searchParams]);

  return <TokenContext.Provider value={{ tokenInfo, setTokenInfo, isLoading }}>{children}</TokenContext.Provider>;
}

export function TokenProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <TokenProviderInner>{children}</TokenProviderInner>
    </Suspense>
  );
}

export function useToken() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
}
