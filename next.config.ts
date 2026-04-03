import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    devtoolSegmentExplorer: false,
  },
};

export default nextConfig;
