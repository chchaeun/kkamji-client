/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const nextConfig = {
  reactStrictMode: true,
  concurrentFeatures: true,
  swcMinify: true,
  experimental: {
    reactMode: "concurrent",
  },
};

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "production" ? false : true,
    dest: "public",
  },
  nextConfig,
});
