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
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { BackgroundProvider } from "@/components/layout/BackgroundProvider";

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
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TanStackProvider>
          <TokenProvider>
            <NextThemeProvider attribute='class' defaultTheme='system' enableSystem>
              <Theme accentColor={accentColor} hasBackground={false} panelBackground='translucent' radius='large'>
                <BackgroundProvider>
                  <ToastProvider>
                    <AppLayout>{children}</AppLayout>
                  </ToastProvider>
                </BackgroundProvider>
              </Theme>
            </NextThemeProvider>
          </TokenProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
