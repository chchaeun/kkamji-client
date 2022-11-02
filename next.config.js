/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const nextConfig = {
  reactStrictMode: true,
  concurrentFeatures: true,
  experimental: {
    reactMode: "concurrent",
  },
};

module.exports = withPWA({
  pwa: {
    disable: false,
    dest: "public",
  },
  ...nextConfig,
});
