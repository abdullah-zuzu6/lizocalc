/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  async redirects() {
    return [
      {
        source: "/:path*(.php)",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-admin/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",

              // Next.js + Google Analytics
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",

              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

              "font-src 'self' https://fonts.gstatic.com",

              "img-src 'self' data: https:",

              // Google Analytics
              "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",

              // Google Tag Manager
              "frame-src https://www.googletagmanager.com",

              "frame-ancestors 'self'",

              "object-src 'none'",

              "base-uri 'self'",

              "form-action 'self'",

              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },

      {
        source: "/:path*(.png|.jpg|.jpeg|.webp|.svg|.ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      {
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

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;