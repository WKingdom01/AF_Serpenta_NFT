const nextSafe = require('next-safe')
const isDev = process.env.NODE_ENV !== 'production'
const { i18n } = require('./next-i18next.config')


module.exports = {
  i18n,
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*',
  //       headers: nextSafe({
  //         isDev, contentSecurityPolicy: {
  //           "img-src": "'self' data: https:;",
  //           "style-src": "'self' 'unsafe-inline'"
  //         }
  //       }),
  //     },
  //   ]
  // },
  reactStrictMode: true,
  build: {
    transpile: ['gsap']
  }
}
