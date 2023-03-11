/* eslint-disable react/jsx-key */
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import { useSpring, animated as a, useReducedMotion } from "react-spring";

import { Project } from "@web/../studio/utils/types";
import { urlFor } from "@web/lib/sanity.client";

//! ----------> COMPONENTS <----------
const ProjectCard = ({ project }: { project: Project }) => {
  const [isHover, set] = useState<boolean>(false);
  // const reducedMotion = useReducedMotion();

  const thumb = urlFor(project.thumb.asset);
  const thumbHover = urlFor(project.thumbHover.asset);

  // const { transform, opacity } = useSpring({
  //   opacity: isHover ? 1 : 0,
  //   transform: `perspective(600px) rotateX(${isHover ? 180 : 0}deg)`,
  //   config: { mass: 5, tension: 500, friction: 115, skipAnimation: reducedMotion },
  //   delay: 250,
  // });

  return (
    <Link
      href={`/work/${project.slug.current}`}
      aria-label="Project details"
      onMouseEnter={() => set(true)}
      onMouseLeave={() => set(false)}
      // style={{ position: `relative` }}
    >
      {isHover ? (
        <Image src={thumbHover} alt="" width={768} height={730} quality={100} priority />
      ) : (
        <Image src={thumb} alt="" width={768} height={730} quality={100} priority />
      )}
      {/* <a.div style={{ opacity: opacity.to((o) => 1 - o), transform, position: `absolute`, top: 0 }}>
        <Image src={thumb} alt="" width={768} height={730} quality={100} priority />
      </a.div>
      <a.div style={{ opacity, transform, rotateX: `180deg`, position: `relative`, top: 0 }}>
        <Image src={thumbHover} alt="" width={768} height={730} quality={100} priority />
      </a.div> */}
    </Link>
  );
};

export default ProjectCard;
