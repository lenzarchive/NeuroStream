/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    NEXTAUTH_SECRET: "your-secret-key-here",
    NEXTAUTH_URL: "http://localhost:3000",
  }
}

module.exports = nextConfig