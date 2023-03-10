import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  titleTemplate: `%s @ Piper Olsen`,
  title: `Design Portfolio`,
  description: `The design portfolio of Piper Olsen - a graphic designer in Pittsburgh, PA`,
  canonical: `https://piperolsen.design`,
  openGraph: {
    type: `website`,
    locale: `en_US`,
    url: `https://piperolsen.design`,
    title: `Desing Portfolio @`,
    siteName: `Piper Olsen Design Portfolio`,
    description: `The design portfolio of Piper Olsen - a graphic designer in Pittsburgh, PA`,
    images: [
      {
        url: `/opengraph.png`,
        width: 1200,
        height: 630,
        alt: `Piper Olsen Design Portfolio Opengraph Image`,
        type: `image/png`,
      },
    ],
  },
  twitter: {
    cardType: `summary_large_image`,
  },
  additionalMetaTags: [
    {
      name: `viewport`,
      content: `width=device-width, initial-scale=1.0`,
    },
  ],
};

export default config;
