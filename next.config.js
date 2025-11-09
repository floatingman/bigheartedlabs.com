/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Ensures clean URLs with static hosting
};

module.exports = nextConfig;
