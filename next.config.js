/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const withImages = require("next-images");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "",
    domains: ["drive.google.com"],
  },
  experimental: {
    reactMode: "concurrent",
  },
};

const prod = process.env.NODE_ENV === "production";

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: "public",
          disable: prod ? false : true,
        },
      },
    ],
  ],
  nextConfig
);
