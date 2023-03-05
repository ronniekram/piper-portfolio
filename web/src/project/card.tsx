import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Project } from "@web/../studio/utils/types";
import { urlFor } from "@web/lib/sanity.client";

//! ----------> COMPONENTS <----------
const ProjectCard = ({ project }: { project: Project }) => {
  const [isHover, set] = useState<boolean>(false);

  const thumb = urlFor(project.thumb.asset);
  const thumbHover = urlFor(project.thumbHover.asset);

  return (
    <Link href={`/work/${project.slug.current}`} aria-label="Project details">
      <div onMouseEnter={() => set(true)} onMouseLeave={() => set(false)}>
        {isHover ? (
          <Image src={thumbHover} alt="" width={768} height={730} quality={100} priority />
        ) : (
          <Image src={thumb} alt="" width={768} height={730} quality={100} priority />
        )}
      </div>
    </Link>
  );
};

export default ProjectCard;
