import Document, { Html, Head, Main, NextScript } from 'next/document';
import dynamic from 'next/dynamic';

// import { GTM_ID } from '../lib/gtm'
const HeadComponent = dynamic(() => import('./components/HeadComponent'));

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>{/* <HeadComponent></HeadComponent> */}</Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
