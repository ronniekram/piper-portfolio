import { useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffectOnce } from "react-use";
import tw from "twin.macro";
import { cache } from "@emotion/css";
import { CacheProvider } from "@emotion/react";
import { BsArrowThroughHeart } from "react-icons/bs";

import { Project } from "../../studio/utils/types";

import GlobalStyles from "@web/src/style/global";
import Nav from "@web/src/layout/nav";

import { projectColor } from "@web/src/utils";

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
        <main tw="antialiased font-sans min-h-screen w-screen bg-white-off">
          <Component {...pageProps} />
        </main>
        <footer
          className={router.pathname === `/` ? `rainbow` : ``}
          tw="h-8 px-5 md:(px-10) xl:(px-20 h-10) flex justify-end items-center"
          css={[projectColor(pageProps.project?.tag), router.pathname === `/about` && tw`bg-teal`]}
        >
          <a
            href="https://ronniebee.dev/"
            target="_blank"
            rel="noreferrer"
            tw="text-2xs text-plum font-sans font-xbold flex items-center transition duration-500 ease-in-out hover:(text-olive-dark)"
          >
            <p tw="mr-1.5">Made with</p> <BsArrowThroughHeart /> <p tw="ml-1.5">by ronnie bee</p>
          </a>
        </footer>
      </CacheProvider>
    </>
  );
}
