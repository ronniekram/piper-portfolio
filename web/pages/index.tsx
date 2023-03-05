import type { NextPage, GetStaticProps } from "next";
import { groq } from "next-sanity";
import tw, { styled } from "twin.macro";

import { SiteDetail, Project } from "@web/../studio/utils/types";

import { sanityClient } from "@web/lib/sanity.client";
import { Container } from "@web/src/common/style";
import Flag from "@web/src/common/flag";
import ProjectCard from "@web/src/project/card";
import BackToTop from "@web/src/common/go-to";

type PageProps = {
  apps: Project[];
  branding: Project[];
  illustrations: Project[];
  scale: Project[];
};

const Grid = styled(Container)`
  ${tw`grid gap-4 xl:(gap-6)`};
  ${tw`grid-cols-1 md:(grid-cols-2) lg:(grid-cols-3)`};
  ${tw`pt-6 pb-20 md:(pt-8 pb-24) xl:(pb-32)`};
`;

const Home: NextPage = (props: PageProps) => {
  const { apps, branding, illustrations, scale } = props;

  return (
    <div tw="w-screen h-full bg-white-off">
      <Grid>
        {illustrations.map((project) => (
          <div key={project.slug.current}>
            <ProjectCard project={project} />
          </div>
        ))}
        {scale.map((project) => (
          <div key={project.slug.current}>
            <ProjectCard project={project} />
          </div>
        ))}
        {branding.map((project) => (
          <div key={project.slug.current}>
            <ProjectCard project={project} />
          </div>
        ))}
        {apps.map((project) => (
          <div key={project.slug.current}>
            <ProjectCard project={project} />
          </div>
        ))}
      </Grid>
      <div tw="w-full flex justify-center pb-8">
        <BackToTop />
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const siteQuery = groq`*[_type == "site"]`;
  const projectQuery = groq`*[_type == "project"] | order(orderRank)`;

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const client = () => sanityClient;
  const projects: Project[] = await client().fetch(projectQuery);
  const details: SiteDetail = await client().fetch(siteQuery);

  if (!projects) return { notFound: true };
  if (!details) return { notFound: true };

  const { email, insta, linkedin } = details[0];

  return {
    props: {
      email,
      insta,
      linkedin,
      apps: projects.filter((project) => project.tag === `app`) ?? [],
      scale: projects.filter((project) => project.tag === `scale`) ?? [],
      branding: projects.filter((project) => project.tag === `branding`) ?? [],
      illustrations: projects.filter((project) => project.tag === `illustration`) ?? [],
    },
  };
};
