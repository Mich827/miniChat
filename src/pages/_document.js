import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
    <title>Mini Chat</title>
        <link rel="shortcut icon" href="/icon.ico" />
    <meta
          //ajout des meta desc
          name="description"
          content="Small messagerie, mini chat for exchange instantly..."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
