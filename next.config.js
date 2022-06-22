const nextSafe = require('next-safe');
const isDev = process.env.NODE_ENV !== 'production';
const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  reactStrictMode: true,
  build: {
    transpile: ['gsap'],
  },
};
