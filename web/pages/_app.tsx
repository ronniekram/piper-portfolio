import type { AppProps } from "next/app";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import { useRouter } from "next/router";
import tw from "twin.macro";
import { cache } from "@emotion/css";
import { CacheProvider } from "@emotion/react";
import { DefaultSeo } from "next-seo";
import { AnimatePresence } from "framer-motion";
import { BsArrowThroughHeart } from "react-icons/bs";
import { Analytics } from "@vercel/analytics/react";

import { Project } from "../../studio/utils/types";

import GlobalStyles from "@web/src/style/global";
import Nav from "@web/src/layout/nav";

import { projectColor } from "@web/src/utils";
import config from "@web/next-seo.config";

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
      <DefaultSeo {...config} />
      <CacheProvider value={cache}>
        <GlobalStyles />
        <Nav email={pageProps.email} insta={pageProps.insta} linkedin={pageProps.linkedin} />
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
          <main tw="antialiased font-sans min-h-screen w-screen bg-white-off mt-[5.25rem] md:(mt-[7.5rem]) xl:(mt-[11.25rem])">
            <Component {...pageProps} />
          </main>
        </AnimatePresence>
        <footer
          className={router.pathname === `/` ? `rainbow` : ``}
          tw="h-8 px-5 md:(px-10) xl:(px-20 h-10) flex justify-end items-center antialiased"
          css={[projectColor(pageProps.project?.tag), router.pathname === `/about` && tw`bg-teal`]}
        >
          <a
            href="https://ronniebee.dev/"
            target="_blank"
            rel="noreferrer"
            tw="text-xs text-plum font-sans font-xbold flex items-center transition duration-500 ease-in-out hover:(text-olive-dark)"
          >
            <p tw="mr-1.5">Made with</p> <BsArrowThroughHeart /> <p tw="ml-1.5">by ronnie bee</p>
          </a>
        </footer>
        <Analytics />
      </CacheProvider>
    </>
  );
}
