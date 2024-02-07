/** @type {import('next').NextConfig} */
const nextConfig = {
  resolve: {
    fallback: {
      "mongodb-client-encryption": false,
      aws4: false,
    },
  },
  experimental: {
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
  },
};

module.exports = nextConfig;
