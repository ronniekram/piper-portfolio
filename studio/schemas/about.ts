export default {
  name: `about`,
  title: `About Me`,
  type: `document`,
  fieldsets: [
    { name: `seo`, title: `SEO` },
  ],
  groups: [
    { name: `seo`, title: `SEO`, },
  ],
  fields: [
    {
      name: `title`,
      title: `The Big Text`,
      description: `On the left`,
      type: `string`,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: `detail`,
      title: `The Little Text`,
      description: `On the right`,
      type: `text`,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: `resume`,
      title: `Resume`,
      type: `file`,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: `metaTitle`,
      title: `Page/Meta Title`,
      type: `string`,
      fieldset: `seo`,
      group: `seo`,
    },
    {
      name: `metaDesc`,
      title: `Meta Description`,
      type: `text`,
      rows: 2,
      fieldset: `seo`,
      group: `seo`,
    },
  ],
};
