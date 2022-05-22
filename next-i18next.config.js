const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ch'],
    localePath: path.resolve('./public/locales')
  }
}