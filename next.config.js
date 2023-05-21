const webpack = require("webpack");

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    FILMOTEK_API: "http://localhost:3005",
    FILMOTEK_USER: "filmotek",
    FILMOTEK_PASSWORD: "admin",
  },
};

module.exports = nextConfig;
