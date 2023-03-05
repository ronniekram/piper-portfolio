import type { NextPage, GetStaticProps } from "next";
import { groq } from "next-sanity";
import "twin.macro";

import { SiteDetail } from "@web/../studio/utils/types";

import Flag from "@web/src/common/flag";
import { sanityClient } from "@web/lib/sanity.client";

const Home: NextPage = () => {
  return (
    <div tw="w-screen h-screen bg-white-off flex items-center justify-center">
      <div tw="h-72 flex space-x-14">
        <Flag label="illustration" />
        <Flag label="branding" />
        <Flag label="app" />
        <Flag label="scale" />
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const siteQuery = groq`*[_type == "site"]`;

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const client = () => sanityClient;
  const details: SiteDetail = await client().fetch(siteQuery);

  if (!details) return { notFound: true };

  const { email, insta, linkedin } = details[0];
  console.log(`EMAIL`, email);
  console.log(`INSTA`, insta);
  console.log(`LINKEDIN`, linkedin);

  return {
    props: {
      email,
      insta,
      linkedin,
    },
  };
};
