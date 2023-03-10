import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { groq } from "next-sanity";
import tw, { styled } from "twin.macro";
import { NextSeo } from "next-seo";

import { Project, SiteDetail } from "@web/../studio/utils/types";
import { sanityClient } from "@web/lib/sanity.client";

import ProjectTag from "@web/src/project/tag";
import ProjectDetail from "@web/src/project/detail";
import ProjectMedia from "@web/src/project/media";
import BackToTop from "@web/src/common/go-to";

import { Container as C } from "@web/src/common/style";

const client = () => sanityClient;
//! ----------> TYPES <----------
type PageProps = {
  project: Project;
  nextProject: string;
};

//! ----------> STYLES <----------
const Container = styled(C)`
  ${tw`grid grid-cols-1`};
  ${tw`xl:(grid-cols-[29.5%, 60.5%] gap-x-[10%])`};
`;

//! ----------> COMPONENTS <----------
const Work: NextPage<PageProps> = ({ project, nextProject }: PageProps) => {
  return (
    <>
      <NextSeo title={project.metaTitle} description={project.metaDesc} />
      <Container>
        <section>
          <ProjectTag project={project} />
          <div tw="hidden xl:(block)">
            <ProjectDetail project={project} nextSlug={nextProject} />
          </div>
        </section>
        <section>
          <ProjectMedia project={project} />
          <div tw="my-16 md:(w-[74.4%] mx-auto my-20) xl:(hidden my-0)" id="details">
            <ProjectDetail project={project} nextSlug={nextProject} />
          </div>
          {project.related && (
            <div tw="my-20">
              <h2 tw="text-teal text-xl text-center font-serif">Related Work</h2>
              <div tw="w-full h-px bg-teal mb-5 lg:(mb-6)" />
              <ProjectMedia project={project} related />
            </div>
          )}
        </section>
      </Container>
      <div tw="hidden xl:(w-full flex justify-center mt-32 pb-12 )">
        <BackToTop />
      </div>
    </>
  );
};

export default Work;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const options = { slug: params.slug };
  const siteQuery = groq`*[_type == "site"]`;
  const query = groq`*[_type == "project" && slug.current == $slug]{
      ...,
      media[]{
        ...,
        image{
        ...,
        asset->
        }
      },
      related[]{
        ...,
        image{
        ...,
        asset->
        }
      }
  }`;

  const details: SiteDetail = await client().fetch(siteQuery);
  const project: Project = await client().fetch(query, options);
  const projectsQuery = groq`*[_type == "project"] |order(orderRank)`;
  const projects = await client().fetch(projectsQuery);

  if (!details) return { notFound: true };
  if (!project) return { notFound: true };
  if (!projects) return { notFound: true };

  const { email, insta, linkedin } = details[0];

  const nextProject = projects.find((p: Project) => p.orderRank > project[0].orderRank);

  return {
    props: {
      email,
      insta,
      linkedin,
      project: project[0],
      nextProject: nextProject ? nextProject.slug.current : projects[0].slug.current,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = groq`*[_type == "project"]{ slug }`;

  const projects = await client().fetch(query);

  const paths =
    projects?.map((project) => ({
      params: {
        slug: project.slug.current,
      },
    })) || [];

  return {
    paths,
    fallback: false,
  };
};
