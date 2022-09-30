/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const nextConfig = {
  reactStrictMode: true,
  concurrentFeatures: true,
  swcMinify: true,
  experimental: {
    reactMode: "concurrent",
  },
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: "public",
        },
      },
    ],
  ],
  nextConfig
);
