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
  async rewrites() {
    // beforeFiles runs before public/, otherwise POST /mail.php hits the
    // static file and Next.js returns 405 (static assets only allow GET/HEAD).
    return {
      beforeFiles: [
        {
          source: "/mail.php",
          destination: "http://localhost/themodeltoken/mail.php",
        },
      ],
    };
  },
};

export default nextConfig;
