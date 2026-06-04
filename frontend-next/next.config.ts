import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    // Trim Swiper's barrel imports to only the modules actually used
    // (lucide-react and react-icons are already optimized by default in Next 16).
    optimizePackageImports: ["swiper"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5031",
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
