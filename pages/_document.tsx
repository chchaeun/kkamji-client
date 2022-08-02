import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="touch-icon-iphone.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="touch-icon-ipad-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="touch-icon-iphone-retina.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
