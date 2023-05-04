import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

import type { ProjectImage } from "../../../studio/utils/types";
import { sanityClient } from "@web/lib/sanity.client";

const SanityImage = ({ media, priority }: { media: ProjectImage; priority?: boolean }) => {
  const imageProps = useNextSanityImage(sanityClient, media.image, {
    imageBuilder: (imageBuilder) => imageBuilder.auto(`format`).quality(100).fit(`fill`),
  });

  return (
    <Image
      {...imageProps}
      alt={media?.alt ?? ``}
      style={{ width: `100%`, height: `auto` }}
      placeholder={media.image.asset.metadata?.lqip ? `blur` : `empty`}
      blurDataURL={media.image.asset.metadata?.lqip}
      priority={priority}
    />
  );
};

export default SanityImage;
