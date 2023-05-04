import Image from "next/image";
import tw, { styled } from "twin.macro";

import { Project, ProjectImage } from "@web/../studio/utils/types";
import { urlFor } from "@web/lib/sanity.client";

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
const Media = ({ img }: { img: ProjectImage }) => {
  const media = img.image;
  const width = media.asset.metadata?.dimensions.width;
  const height = media.asset.metadata?.dimensions.height;

  return (
    <Image
      alt={img.alt ?? ``}
      src={urlFor(media.asset)}
      width={width}
      height={height}
      quality={100}
      style={{ objectFit: `cover` }}
    />
  );
};
const ProjectMedia = ({ project, related }: { project: Project; related?: boolean }) => {
  const images = related ? project.related : project.media;

  return (
    <Wrapper>
      {images.map((img) => (
        <ImgWrapper key={img.image.asset?._id} isWide={img.wide}>
          <Media img={img} />
        </ImgWrapper>
      ))}
    </Wrapper>
  );
};

export default ProjectMedia;
