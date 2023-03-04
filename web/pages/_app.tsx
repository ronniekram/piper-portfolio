import { useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffectOnce } from "react-use";

import { cache } from "@emotion/css";
import { CacheProvider } from "@emotion/react";
import "twin.macro";

import GlobalStyles from "@web/src/style/global";
import "@web/public/style/global.css";

export default function App({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffectOnce(() => {
    setShowChild(true);
  });

  if (!showChild) return null;

  if (typeof window === `undefined`) return <></>;

  return (
    <>
      <Head>
        <title>Piper Olsen</title>
        <meta name="description" content="Piper Olsen Portfolio Website" key="desc" />
        <meta property="og:url" content="https://ronniebee.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en" />
        {/* <meta property="og:image" content="/opengraph.jpg" />
        <link rel="icon" href="/favicon.png" /> */}
      </Head>

      <CacheProvider value={cache}>
        <GlobalStyles />
        <main tw="antialiased font-sans min-h-screen w-screen">
          <Component {...pageProps} />
        </main>
      </CacheProvider>
    </>
  );
}
