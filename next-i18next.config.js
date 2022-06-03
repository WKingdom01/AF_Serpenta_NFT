const path = require('path')

const i18n = require('i18next').default;
const LanguageDetector = require('i18next-browser-languagedetector');


module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ch', 'ja'],
    localePath: path.resolve('./public/locales'),
    reloadOnPrerender: true
  },
  use: [LanguageDetector.default ?? LanguageDetector],
  serializeConfig: false
}