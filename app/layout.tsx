import { Providers } from "@/providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buy, sell & trade Ethereum and other top tokens on Uniswap",
  description:
    "Swapping made simple. Buy and sell crypto on Ethereum, Base, Arbitrum, Polygon, and more. Trusted by millions.",
  icons: "/logo.png",
  openGraph: {
    title: "Uniswap Interface",
    description:
      "Swapping made simple. Buy and sell crypto on Ethereum, Base, Arbitrum, Polygon, and more. Trusted by millions.",
    images:
      "https://app.uniswap.com/images/1200x630_Rich_Link_Preview_Image.png",
    url: "https://app.uniswap.org/swap?lng=ko-KR",
  },
  twitter: {
    title: "Uniswap Interface",
    description: "Swap or provide liquidity on the Uniswap Protocol",
    images:
      "https://app.uniswap.com/images/1200x630_Rich_Link_Preview_Image.png",
  },
};

export default function RootLayout({
  children,
  header,
}: Readonly<{
  children: React.ReactNode;
  header: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {header}
          {children}
          {/* <div id="token-select-portal-container" /> */}
        </Providers>
      </body>
    </html>
  );
}

// export const dynamic = "force-dynamic";
