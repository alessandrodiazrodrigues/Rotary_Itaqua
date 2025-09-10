// next.config.js - VERSÃO CORRIGIDA PARA PRODUÇÃO
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Configurações de imagem
  images: {
    domains: [
      'drive.google.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com'
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
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
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

  // ❌ REMOVIDAS as configurações experimentais que causavam erro:
  // experimental: {
  //   optimizeCss: true,
  //   scrollRestoration: true,
  // },

  // Configuração de output para static export (se necessário)
  trailingSlash: true,
  
  // Configuração de transpilação
  transpilePackages: [],
}

module.exports = nextConfig
