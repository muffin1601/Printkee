import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5030",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "printkee.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
