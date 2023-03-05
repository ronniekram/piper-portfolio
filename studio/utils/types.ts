import type { FileAsset, ImageAsset, ImageCrop, ImageHotspot, ImageMetadata, AssetSource, PortableTextBlock } from "sanity";

import type { SanityDocument } from "@sanity/client";

export type Image = {
  _type: `img`;
  asset: ImageAsset;
  sources?: AssetSource[];
  hotspot?: ImageHotspot;
  crop?: ImageCrop;
  metadata?: ImageMetadata;
};

export type ProjectImage = Image & {
  wide?: boolean;
};

export type Credit = {
  _type: `credit`;
  title: string;
  name: `string`;
};

export type SiteDetail = SanityDocument & {
  _type: `site`;
  title: string;
  email: string;
  insta: string;
  linkedin: string;
};

export type About = SanityDocument & {
  _type: `about`;
  body: PortableTextBlock;
  resume: FileAsset;
  metaTitle: string;
  metaDesc: string;
};

export type Project = SanityDocument & {
  _type: `project`;
  title: string;
  tag: string;
  slug: {
    current: string;
  };
  thumb: Image;
  thumbHover: Image;
  desc: string;
  credits: Credit[];
  live?: string;
  media: ProjectImage[];
  metaTitle?: string;
  metaDesc?: string;
};
