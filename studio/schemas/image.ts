export default {
  name: `img`,
  title: `Project Image`,
  type: `object`,
  // USE GRID SPAN FOR FULL WIDTH IMAGES
  fields: [
    {
      name: `image`,
      title: `Image`,
      type: `image`,
      validation: (Rule: any) => Rule.required(),
      options: {
        hotspot: true,
      },
    },
    {
      name: `wide`,
      title: `Image Width`,
      type: `boolean`,
      description: `When set to true, the image will take the full width of it's container`,
    },
  ],
};
