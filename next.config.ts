import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The two old project list pages were merged into /projects. Permanent
  // redirects keep old links and bookmarks working. Only these exact paths
  // move: the demos underneath (e.g. /demo-projects/ecommerce-demo) stay put.
  async redirects() {
    return [
      { source: "/demo-projects", destination: "/projects", permanent: true },
      { source: "/template-projects", destination: "/projects", permanent: true },
    ];
  },
};

export default nextConfig;
