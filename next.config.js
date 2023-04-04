/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    FILMOTEK_API: "http://localhost:3005",
    FILMOTEK_USER: "filmotek",
    FILMOTEK_PASSWORD: "admin",
  },
};

module.exports = nextConfig;
