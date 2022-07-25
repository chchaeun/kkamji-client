/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const withImages = require("next-images");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const prod = process.env.NODE_ENV === "production";

module.exports = withPlugins(
  [
    withImages,
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
