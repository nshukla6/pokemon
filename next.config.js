/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['amazonaws.com', 'jherr-pokemon.s3.us-west-1.amazonaws.com'],
  },
}

module.exports = nextConfig
