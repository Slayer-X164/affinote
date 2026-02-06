import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.tenor.com" },
      { protocol: "https", hostname: "ik.imagekit.io" },
    ],
  },

  async headers() {
    return [
      {
        source: "/",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
      {
        source: "/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
