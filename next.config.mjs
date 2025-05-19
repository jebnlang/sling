/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['vercel.com'],
    unoptimized: false,
  },
  output: 'standalone',
  // Use trailing slash for consistent URL handling
  trailingSlash: true,
  // Enable React strict mode
  reactStrictMode: true,
}

export default nextConfig