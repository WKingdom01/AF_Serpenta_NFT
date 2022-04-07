const nextSafe = require('next-safe')
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async headers () {
    return [
    {
      source: '/:path*',
      headers: nextSafe({isDev, contentSecurityPolicy: {
        "img-src": "'self' data: https:;",
        "style-src": "'self' 'unsafe-inline'"
      } }),
    },
      ]
  },
  reactStrictMode: true,
  build: {
    transpile: ['gsap']
  }
}
