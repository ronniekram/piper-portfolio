import { PortableText } from "@portabletext/react";
import type { PortableTextReactComponents } from "@portabletext/react";
import tw, { styled } from "twin.macro";

import BackToTop, { SeeLive, NextProject } from "@web/src/common/go-to";
import { Project } from "@web/../studio/utils/types";

//! ----------> STYLES <----------
const Container = styled.div`
  ${tw`text-olive-dark text-lg font-serif`};
`;

const P = tw.p`text-olive-dark text-lg font-serif`;
//! ----------> UTILS <----------
const portableComponents: Pick<PortableTextReactComponents, `block`> = {
  block: {
    normal: ({ children }) => <P>{children}</P>,
  },
};

//! ----------> COMPONENTS <----------
const ProjectDetail = ({ project, nextSlug }: { project: Project; nextSlug: string }) => (
  <Container>
    <PortableText value={project.desc} components={portableComponents} />
    <div tw="flex flex-col space-y-4 mt-4">
      {project.credits.map((credit) => (
        <p tw="font-xbold" key={credit.name}>
          {credit.title}: {credit.name}
        </p>
      ))}
    </div>
    {project.live && (
      <div tw="mt-4">
        <SeeLive url={project.live} />
      </div>
    )}
    <div tw="mt-20 xl:(hidden mt-0)">
      <BackToTop />
    </div>
    <div tw="hidden xl:(mt-20 block)">
      <NextProject slug={nextSlug} />
    </div>
  </Container>
);

export default ProjectDetail;
