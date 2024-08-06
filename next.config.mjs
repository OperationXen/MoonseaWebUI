/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone", // Outputs a Single-Page Application (SPA).
  distDir: "./dist", // Changes the build output directory to `./dist/`.

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/:path*",
      },
    ];
  },
};

export default nextConfig;
