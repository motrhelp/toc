import type { NextConfig } from "next";

// While there is no other functionality, /clouds is the home page.
const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/clouds',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
