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
      // Old PHP URLs
      {
        source: "/:path*(.php)",
        destination: "/",
        permanent: true,
      },

      // Old WordPress admin URLs
      {
        source: "/wp-admin/:path*",
        destination: "/",
        permanent: true,
      },

      // Old Days From Today URLs → New Info URLs
      {
        source: "/calculators/time/7-days-from-today-calculator",
        destination: "/info/days/7-days-from-today",
        permanent: true,
      },
      {
        source: "/calculators/time/14-days-from-today-calculator",
        destination: "/info/days/14-days-from-today",
        permanent: true,
      },
      {
        source: "/calculators/time/21-days-from-today-calculator",
        destination: "/info/days/21-days-from-today",
        permanent: true,
      },
      {
        source: "/calculators/time/28-days-from-today-calculator",
        destination: "/info/days/28-days-from-today",
        permanent: true,
      },
      {
        source: "/calculators/time/30-days-from-today-calculator",
        destination: "/info/days/30-days-from-today",
        permanent: true,
      },
      {
        source: "/calculators/time/45-days-from-today-calculator",
        destination: "/info/days/45-days-from-today",
        permanent: true,
      },
      {
        source: "/calculators/time/60-days-from-today-calculator",
        destination: "/info/days/60-days-from-today",
        permanent: true,
      },
      {
        source: "/calculators/time/90-days-from-today-calculator",
        destination: "/info/days/90-days-from-today",
        permanent: true,
      },
      {
        source: "/calculators/time/120-days-from-today-calculator",
        destination: "/info/days/120-days-from-today",
        permanent: true,
      },
      {
        source: "/calculators/time/150-days-from-today-calculator",
        destination: "/info/days/150-days-from-today",
        permanent: true,
      },
      {
        source: "/calculators/time/180-days-from-today-calculator",
        destination: "/info/days/180-days-from-today",
        permanent: true,
      },
      {
        source: "/calculators/statistics/z-score-calculator",
        destination: "/calculators/math/z-score-calculator",
        permanent: true,
      },
      {
        source: "/calculators/saved-calculator",
        destination: "/calculators/saved-calculators",
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

      // Cache images
      {
        source: "/:path*(.png|.jpg|.jpeg|.webp|.svg|.ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // Cache fonts
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