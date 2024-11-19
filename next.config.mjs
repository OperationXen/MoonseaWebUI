/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone", // Outputs a Single-Page Application (SPA).

  async redirects() {
    return [
      {
        source: "/",
        destination: "/characters",
        permanent: false,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/:path*",
      },
      {
        source: "/media/:path*",
        destination: "http://127.0.0.1:8000/media/:path*",
      },
      {
        source: "/admin/:path*",
        destination: "http://127.0.0.1:8000/admin/:path*",
      },
    ];
  },
};

export default nextConfig;
