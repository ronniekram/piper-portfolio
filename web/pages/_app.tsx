import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffectOnce } from "react-use";

import { cache } from "@emotion/css";
import { CacheProvider } from "@emotion/react";
import tw from "twin.macro";
import { Project } from "../../studio/utils/types";

import GlobalStyles from "@web/src/style/global";
import Nav from "@web/src/layout/nav";

import "@web/public/style/global.css";

type CustomAppProps = AppProps & {
  email: string;
  insta: string;
  linkedin: string;
  project?: Project;
};

export default function App({ Component, pageProps }: CustomAppProps) {
  const router = useRouter();

  const [showChild, setShowChild] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const footerColor = () => {
    switch (pageProps.project?.tag) {
      case `app`: {
        return tw`bg-purple-pale`;
      }
      case `branding`: {
        return tw`bg-pink`;
      }
      case `scale`: {
        return tw`bg-yellow`;
      }
      case `illustration`: {
        return tw`bg-mint`;
      }
    }
  };

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
        <meta property="og:url" content="https://piperolsen.design" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en" />
        {/* <meta property="og:image" content="/opengraph.jpg" />
        <link rel="icon" href="/favicon.png" /> */}
      </Head>

      <CacheProvider value={cache}>
        <GlobalStyles />
        <Nav email={pageProps.email} insta={pageProps.insta} linkedin={pageProps.linkedin} />
        <main tw="antialiased font-sans min-h-screen w-screen">
          <Component {...pageProps} />
        </main>
        <footer
          className={router.pathname === `/` || router.pathname === `/about` ? `rainbow` : ``}
          tw="h-8 xl:(h-10)"
          css={[footerColor()]}
        />
      </CacheProvider>
    </>
  );
}
