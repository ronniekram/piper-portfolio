import tw, { styled } from "twin.macro";

import { Project } from "@web/../studio/utils/types";

import { projectColor } from "@web/src/utils";
import { ToDetail } from "@web/src/common/go-to";

//! ----------> TYPES <----------
const tagNames = {
  app: `Apps + Interactives`,
  branding: `Branding`,
  scale: `Large-Scale Work`,
  illustration: `Illustration`,
};

//! ----------> STYLES <----------
const Tag = styled.div`
  ${tw`w-[12.75rem] md:(w-[14.875rem])`};
  ${tw`text-sm text-plum text-center md:(text-base)`};
  ${tw`font-sans font-xbold`};
  ${tw`uppercase`};
  ${tw`py-2.5`};
`;

const H1 = tw.h1`text-olive-dark text-2xl font-sans my-4 md:(text-4xl)`;

//! ----------> COMPONENTS <----------
const ProjectTag = ({ project }: { project: Project }) => (
  <section>
    <Tag css={[projectColor(project.tag)]}>
      <h2>{tagNames[project.tag]}</h2>
    </Tag>
    <H1>{project.title}</H1>

    <div tw=" mb-14 xl:(hidden mb-0)">
      <ToDetail />
    </div>
  </section>
);

export default ProjectTag;
