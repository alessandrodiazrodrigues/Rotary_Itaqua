// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Configurações de imagem
  images: {
    domains: [
      'drive.google.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'script.google.com'
    ],
    formats: ['image/webp', 'image/avif'],
  },

  // Redirecionamentos
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
      {
        source: '/home',
        destination: '/dashboard',
        permanent: true,
      }
    ]
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // Alterado de DENY para SAMEORIGIN (Google Sheets)
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          }
        ],
      },
    ]
  },

  // Configurações de build
  env: {
    CUSTOM_DOMAIN: process.env.CUSTOM_DOMAIN || 'convites.rotaryitaqua.org.br',
    ROTARY_VERSION: '1.0.0',
  },

  // Configuração para APIs externas
  async rewrites() {
    return [
      {
        source: '/api/sheets/:path*',
        destination: '/api/sheets/:path*',
      },
    ]
  },

  // REMOVIDO trailingSlash: true (causa problemas com API Routes)
  
  // Otimizações
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Configuração de transpilação (para recharts e outras libs)
  transpilePackages: ['recharts'],

  // Webpack personalizado para otimizações
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Otimizações para produção
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = 'all'
    }
    
    return config
  },
}

module.exports = nextConfig
