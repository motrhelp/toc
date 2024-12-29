import type { NextConfig } from "next";

// While there is no other functionality, /clouds is the home page.
module.exports = {
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

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
