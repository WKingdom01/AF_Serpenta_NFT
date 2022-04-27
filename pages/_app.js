import '../styles/globals.scss'
import '../styles/reset.scss'
import '../styles/main.scss'
import { appWithTranslation } from 'next-i18next'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp)
