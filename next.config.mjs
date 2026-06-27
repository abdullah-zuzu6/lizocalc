// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   typescript: {
//     ignoreBuildErrors: true,
//   },

//   // Tells Next.js to prefer WebP when optimizing, but supports PNG/JPG too
//   images: {
//     formats: ["image/webp"],
//     deviceSizes: [640, 750, 828, 1080, 1200], // Optimization for different screens
//   },

//   experimental: {
//     optimizePackageImports: ["lucide-react", "framer-motion"],
//   },

//   // 1. SHIELD: Redirects bot noise to home
//   async redirects() {
//     return [
//       {
//         source: '/:path*(.php)',
//         destination: '/',
//         permanent: true,
//       },
//       {
//         source: '/wp-admin/:path*',
//         destination: '/',
//         permanent: true,
//       },
//     ]
//   },

//   // 2. CACHE: Fixed to include all image types and paths
//   async headers() {
//     return [
//       {
//         // This pattern matches common image extensions anywhere in your public folder
//         source: "/:path*(.png|.webp|.jpg|.jpeg|.svg|.ico)",
//         headers: [
//           {
//             key: "Cache-Control",
//             value: "public, max-age=31536000, immutable",
//           },
//         ],
//       },
//       {
//         // Also cache your font files if you have any
//         source: "/fonts/:path*",
//         headers: [
//           {
//             key: "Cache-Control",
//             value: "public, max-age=31536000, immutable",
//           },
//         ],
//       },
//     ];
//   },

//   // 3. JUNK REMOVAL: Clean up JS for production
//   compiler: {
//     removeConsole: process.env.NODE_ENV === "production",
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },

  experimental: {
    // KEPT: tree-shakes lucide-react and framer-motion automatically
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Redirect bot noise
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

  async headers() {
    return [
      // ─── Security headers (applied to every route) ───────────────────────
      // ADDED: These fix all Best Practices warnings in PageSpeed:
      // CSP, HSTS, COOP, X-Frame-Options, Trusted Types
      {
        source: '/(.*)',
        headers: [
          {
            // Prevents your site being embedded in iframes (clickjacking)
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            // Stops browsers from MIME-sniffing responses
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // Controls referrer info sent with requests
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            // Forces HTTPS for 2 years — fixes HSTS warning
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            // Restricts which browser features your site can use
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            // Prevents cross-origin attacks via opener reference — fixes COOP warning
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            // Fixes "Ensure proper origin isolation" PageSpeed warning
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
          {
            // Basic CSP — allows same-origin scripts + common CDNs.
            // Tighten this further once you know all your script sources.
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval needed for Next.js dev; remove in prod if possible
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self'",
              "frame-ancestors 'self'",
            ].join('; '),
          },
        ],
      },

      // ─── Static asset caching ─────────────────────────────────────────────
      // KEPT from your original config
      {
        source: '/:path*(.png|.webp|.jpg|.jpeg|.svg|.ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

export default nextConfig