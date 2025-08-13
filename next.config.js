/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configurações para evitar problemas de webpack
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
}

module.exports = nextConfig
