/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: `http://127.0.0.1:8000/api/:path*`,
        }
      ]
    }
  }
}

module.exports = nextConfig
