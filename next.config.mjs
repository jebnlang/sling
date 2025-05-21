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
  // Add explicit configuration for RSC payloads
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Improve RSC streaming and chunking
    serverComponentsExternalPackages: [],
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig