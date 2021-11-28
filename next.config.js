// /** @type {import('next').NextConfig} */

// eslint-disable-next-line
const withPlugins = require('next-compose-plugins')
// eslint-disable-next-line
const withPWA = require('next-pwa')

// eslint-disable-next-line
const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // swcMinify: true,
  compress: false,
  images: {
    domains: isDev
      ? ['192.168.30.210', '192.168.50.106', 'cdn.adybelli.com']
      : ['cdn.adybelli.com']
  }
}

const PWAPlugin = withPWA({
  pwa: {
    dest: 'public',
    disable: isDev
  }
})

module.exports = withPlugins([PWAPlugin], nextConfig)
