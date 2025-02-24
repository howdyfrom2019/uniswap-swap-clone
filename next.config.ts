import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "token-icons.s3.amazonaws.com",
        protocol: "https",
      },
      {
        hostname: "assets.coingecko.com",
        protocol: "https",
      },
      {
        hostname: "raw.githubusercontent.com",
        protocol: "https",
      },
      {
        hostname: "app.uniswap.org",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
