import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Keep Turbopack rooted in this app (parent dirs may contain other lockfiles).
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "themodeltoken.com",
      },
    ],
  },
};

export default nextConfig;
