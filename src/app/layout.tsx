import "./globals.css";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppLayout } from "../components/layout/AppLayout";
import { Theme } from "@radix-ui/themes";
import { accentColor } from "@/constants";
import { ToastProvider } from "@/providers/ToastProvider";
import { TokenProvider } from "@/providers/TokenProviders";
import { TanStackProvider } from "@/providers/TanStackProvider";

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
        <TanStackProvider>
          <TokenProvider>
            <Theme accentColor={accentColor} hasBackground={false} panelBackground='translucent' radius='medium' appearance='dark'>
              <ToastProvider>
                <AppLayout>{children}</AppLayout>
              </ToastProvider>
            </Theme>
          </TokenProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
