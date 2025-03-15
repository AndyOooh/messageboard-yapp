import { WalletProvider } from "@/providers/WalletProvider";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppLayout } from "../components/layout/AppLayout";
import { Theme } from "@radix-ui/themes";
import { accentColor } from "@/constants";
import { ToastProvider } from "@/providers/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Message Board Yapp",
  description: "Message Board Yapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <WalletProvider>
          <Theme accentColor={accentColor} hasBackground={false} panelBackground='translucent' radius='medium' appearance='dark'>
            <ToastProvider>
              <AppLayout>{children}</AppLayout>
            </ToastProvider>
          </Theme>
        </WalletProvider>
      </body>
    </html>
  );
}
