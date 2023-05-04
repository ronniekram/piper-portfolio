/* eslint-disable react/jsx-key */
import { useState } from "react";
import Link from "next/link";

import { Project } from "@web/../studio/utils/types";
import SanityImage from "../common/sanity-image";

//! ----------> COMPONENTS <----------
const ProjectCard = ({ project, priority }: { project: Project; priority?: boolean }) => {
  const [isHover, set] = useState<boolean>(false);

  const thumb = {
    alt: project.name,
    image: project.thumb,
  };

  const thumbHover = {
    alt: project.name,
    image: project.thumbHover,
  };

  return (
    <Link
      href={`/work/${project.slug.current}`}
      aria-label="Project details"
      onMouseEnter={() => set(true)}
      onMouseLeave={() => set(false)}
    >
      {isHover ? (
        <SanityImage media={thumb} priority={priority} />
      ) : (
        <SanityImage media={thumbHover} priority={priority} />
      )}
    </Link>
  );
};

export default ProjectCard;
