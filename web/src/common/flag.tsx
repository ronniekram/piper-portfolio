import Image from "next/image";
import tw, { styled } from "twin.macro";

//! ----------> TYPES <----------
const labels = {
  app: {
    text: `Apps + Interactives`,
    color: tw`bg-purple-pale`,
  },
  branding: {
    text: `Branding`,
    color: tw`bg-pink`,
  },
  scale: {
    text: `Large Scale Work`,
    color: tw`bg-yellow`,
  },
  illustration: {
    text: `Illustration`,
    color: tw`bg-mint`,
  },
};

type Label = keyof typeof labels;

//! ----------> STYLES <----------
const Tag = styled.div`
  ${tw`h-full w-[2.9375rem] relative`};
  ${tw`px-4`};
  p {
    ${tw`w-[2.9375rem]`};
    ${tw`text-base text-plum text-center`};
    ${tw`font-sans font-xbold`};
    ${tw`uppercase leading-[19.2px]`};
    ${tw`origin-[0_0] rotate-[-90deg]`};
    ${tw`absolute bottom-0`};
    ${tw`whitespace-nowrap`};
  }
`;

//! ----------> COMPONENTS <----------
const Flag = ({ label }: { label: Label }) => {
  return (
    <Tag css={[labels[label].color]}>
      <p>{labels[label].text}</p>
    </Tag>
  );
};

export default Flag;
