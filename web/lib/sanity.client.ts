import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import { usePreview } from "./sanity.preview";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || `production`;
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const apiVersion = `2023-02-03`;
const useCdn = process.env.NODE_ENV === `production`;

export const sanityClient = createClient({ dataset, projectId, apiVersion, useCdn });

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: SanityImageSource) => builder.image(source).url();

export const getClient = (isPreview: boolean) => (isPreview ? usePreview : sanityClient);
