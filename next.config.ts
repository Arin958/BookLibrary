import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['placehold.co', "m.media-amazon.com"],
  },
  typescript: {
    ignoreBuildErrors: true
  },
   eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
