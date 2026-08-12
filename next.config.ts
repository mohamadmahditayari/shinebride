import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Use SWC compiler instead of Turbopack for better stability
  compiler: {
    styledComponents: false,
  },
};

export default nextConfig;