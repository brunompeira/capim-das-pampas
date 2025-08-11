/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Configurações para evitar problemas de build
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Desativar funcionalidades problemáticas
  experimental: {
    // Desativar build traces que causam o erro
    buildTraces: false,
    // Outras opções experimentais seguras
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
