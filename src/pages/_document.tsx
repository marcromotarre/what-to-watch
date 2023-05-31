import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/app.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#3D3D3D" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}