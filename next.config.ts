import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    // Redirect old Squarespace URLs → new structure.
    return [
      { source: "/km-tools", destination: "/work/km-tools", permanent: true },
      { source: "/joinourroster", destination: "/join-our-roster", permanent: true },
      { source: "/what-we-do", destination: "/services", permanent: true },
      { source: "/who-we-are", destination: "/#studio", permanent: true },
    ];
  },
};

export default nextConfig;
