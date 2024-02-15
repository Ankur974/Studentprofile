import Document, { Html, Head, Main, NextScript } from "next/document";
/**
 * Reference: https://nextjs.org/docs/basic-features/font-optimization
 */

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,700;0,800;1,400;1,500;1,700;1,800&display=swap"
            rel="stylesheet"
          />
          <link
            rel="icon"
            type="image/svg+xml"
            href="/assets/images/favicon.svg"
          />
          <link rel="icon" type="image/png" href="/assets/images/favicon.png" />
          {/* <link
            rel="preload"
            fetchpriority="high"
            as="image"
            href=""
            type="image/png"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
