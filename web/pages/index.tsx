import type { NextPage, GetStaticProps } from "next";
import { useState } from "react";
import { groq } from "next-sanity";
import { useSpring, animated as a, config } from "react-spring";
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

const Grid = styled.div`
  ${tw`grid gap-4 xl:(gap-6)`};
  ${tw`grid-cols-1 md:(grid-cols-2) lg:(grid-cols-3)`};
  ${tw`mb-4 xl:(mb-6)`};
`;

const Row = ({
  projects,
  type,
}: {
  projects: Project[];
  type: `illustration` | `scale` | `branding` | `app`;
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const spring = useSpring({
    width: isHover ? `2.9375rem` : `0rem`,
    config: {
      ...config.slow,
      // clamp: true,
    },
  });

  return (
    <div tw="relative" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <a.div tw="absolute h-full overflow-hidden -ml-[4rem]" style={spring}>
        <Flag label={type} />
      </a.div>

      <Grid>
        {projects.map((project) => (
          <div key={project.slug.current}>
            <ProjectCard project={project} />
          </div>
        ))}
      </Grid>
    </div>
  );
};

const Home: NextPage = (props: PageProps) => {
  const { apps, branding, illustrations, scale } = props;

  return (
    <div tw="w-screen h-full bg-white-off">
      <Container>
        <div tw="pt-6 pb-20 md:(pt-8 pb-24) xl:(pb-32)">
          <div tw="hidden lg:(block)">
            <Row projects={illustrations} type="illustration" />
            <Row projects={scale} type="scale" />
            <Row projects={branding} type="branding" />
            <Row projects={apps} type="app" />
          </div>
          <Grid tw="lg:(hidden)">
            {[...illustrations, ...scale, ...branding, ...apps].map((project) => (
              <div key={project.slug.current}>
                <ProjectCard project={project} />
              </div>
            ))}
          </Grid>
        </div>
        <div tw="w-full flex justify-center pb-8">
          <BackToTop />
        </div>
      </Container>
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
