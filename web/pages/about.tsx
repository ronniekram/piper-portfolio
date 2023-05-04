import type { NextPage, GetStaticProps } from "next";
import { groq } from "next-sanity";
import tw, { styled } from "twin.macro";
import { PortableText } from "@portabletext/react";
import type { PortableTextReactComponents } from "@portabletext/react";
import { NextSeo } from "next-seo";

import { About, SiteDetail } from "@web/../studio/utils/types";
import { sanityClient } from "@web/lib/sanity.client";

import { Container as C } from "@web/src/common/style";
import OhHey from "@web/src/assets/about";
import { DownloadResume } from "@web/src/common/go-to";

import config from "@web/next-seo.config";

const client = () => sanityClient;

//! ----------> TYPES <----------
type AboutProps = {
  about: About;
};

//! ----------> STYLES <----------
const Container = styled(C)`
  ${tw`grid grid-cols-1`};
  ${tw`xl:(grid-cols-[29.5%, 60.5%] gap-x-[10%])`};
  ${tw`pt-14 md:(pt-20) xl:(pt-24)`};
`;

const P = tw.p`text-olive-dark text-lg font-serif md:(text-xl) xl:(text-2xl)`;

const portableComponents: Pick<PortableTextReactComponents, `block`> = {
  block: {
    normal: ({ children }) => <P>{children}</P>,
  },
};

//! ----------> COMPONENTS <----------
const AboutMe: NextPage<AboutProps> = ({ about }: AboutProps) => {
  const { body, metaTitle, metaDesc, resume } = about;
  return (
    <>
      <NextSeo {...config} title={metaTitle} description={metaDesc} />
      <div tw="w-screen min-h-screen" className="rainbow">
        <Container>
          <div tw="w-[65%] mx-auto md:(w-[43.75%]) xl:(w-full)">
            <div tw="flex">
              <OhHey />
            </div>
          </div>
          <div tw="mt-12 md:(w-[53%] mx-auto) xl:(w-full mt-0)">
            <PortableText value={body} components={portableComponents} />
            <div tw="mt-10 md:(mt-24) xl:(mt-32)">
              <DownloadResume url={resume.asset.url} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AboutMe;

export const getStaticProps: GetStaticProps = async () => {
  const siteQuery = groq`*[_type == "site"]`;
  const query = groq`*[_type == "about"]{
    ...,
    resume{
      ...,
      asset->
    }
  }`;

  const about = await client().fetch(query);
  const details: SiteDetail = await client().fetch(siteQuery);

  if (!about) return { notFound: true };
  if (!details) return { notFound: true };

  const { email, insta, linkedin } = details[0];

  return {
    props: {
      email,
      insta,
      linkedin,
      about: about[0],
    },
  };
};
