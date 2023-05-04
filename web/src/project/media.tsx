import tw, { styled } from "twin.macro";

import { Project } from "@web/../studio/utils/types";
import SanityImage from "../common/sanity-image";

//! ----------> STYLES <----------
const Wrapper = styled.section`
  ${tw`grid gap-y-[18px]`};
  ${tw`grid-cols-1 md:(grid-cols-2 gap-x-[18px])`};
`;

const ImgWrapper = styled.div(({ isWide }: { isWide: boolean }) => [
  `border: 1px solid rgba(0, 39, 34, 0.5);`,
  isWide && tw`md:(col-span-2)`,
]);

//! ----------> COMPONENTS <----------
const ProjectMedia = ({ project, related }: { project: Project; related?: boolean }) => {
  const images = related ? project.related : project.media;

  return (
    <Wrapper>
      {images.map((img) => (
        <ImgWrapper key={img.image.asset?._id} isWide={img.wide}>
          <SanityImage media={img} />
        </ImgWrapper>
      ))}
    </Wrapper>
  );
};

export default ProjectMedia;
