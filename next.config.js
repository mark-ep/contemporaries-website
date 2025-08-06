/** @type {import('next').NextConfig} */
const API_URL = process.env.API_ROOT || `http://127.0.0.1:8000/api/`

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: `${API_URL}:path*`,
        }
      ]
    }
  }
}

module.exports = nextConfig
