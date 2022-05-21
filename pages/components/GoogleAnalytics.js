import Script from 'next/script';

function GoogleAnalytics({ strategy }) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  console.log('google')
  if (!gaMeasurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy={strategy}
      />
      <Script id="nextjs-google-analytics"
        strategy={strategy}
      >
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}', {
              anonymize_ip: true,
              page_path: window.location.pathname,
            });
          `}
      </Script>
    </>
  );
}

export default GoogleAnalytics;