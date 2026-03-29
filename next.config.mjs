/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  // Tells Next.js to prefer WebP when optimizing, but supports PNG/JPG too
  images: {
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200], // Optimization for different screens
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // 1. SHIELD: Redirects bot noise to home
  async redirects() {
    return [
      {
        source: '/:path*(.php)',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-admin/:path*',
        destination: '/',
        permanent: true,
      },
    ]
  },

  // 2. CACHE: Fixed to include all image types and paths
  async headers() {
    return [
      {
        // This pattern matches common image extensions anywhere in your public folder
        source: "/:path*(.png|.webp|.jpg|.jpeg|.svg|.ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Also cache your font files if you have any
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // 3. JUNK REMOVAL: Clean up JS for production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;