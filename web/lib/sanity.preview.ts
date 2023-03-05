import { definePreview } from "next-sanity/preview";

export const dataset = `production`;
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

function onPublicAccessOnly() {
  throw new Error(`Unable to load preview -- Please log in to your Sanity studio.`);
}

export const usePreview = definePreview({ projectId, dataset, onPublicAccessOnly });

// https://github.com/sanity-io/next-sanity#examples
