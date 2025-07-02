const nextConfig = {
  images: {
    domains: ['cdn.trungdienlanh.com'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.trungdienlanh.com',
      },
    ],
    loader: 'custom',
    loaderFile: './image-loader.js', // Custom image loader
  },
  compress: true,
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: '/((?!admin).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, immutable',
          },
        ],
      },
      {
        source: "/_next/static/chunks/main-app-:hash.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, immutable", // Cache 1 ngày
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
