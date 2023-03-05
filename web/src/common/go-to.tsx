import Link from "next/link";
import tw, { styled } from "twin.macro";
import AnchorLink from "react-anchor-link-smooth-scroll-v2";
import { BsArrow90DegUp, BsArrow90DegDown, BsEyeglasses } from "react-icons/bs";

import { transform } from "./style";

//! ----------> STYLES <----------
const Content = styled.div`
  ${tw`text-teal text-lg font-serif`};
  ${tw`flex items-center space-x-3`};
  ${tw`md:(text-xl)`};
`;

//! ----------> COMPONENTS <----------
export const ToDetail = () => (
  <AnchorLink href="#details" css={[transform]}>
    <Content>
      <BsArrow90DegDown />
      <p tw="mb-2.5">project details</p>
    </Content>
  </AnchorLink>
);

export const SeeLive = ({ slug }: { slug: string }) => (
  <Link href={`/work/${slug}`}>
    <Content>
      <BsEyeglasses />
      <p tw="mt-2">next project</p>
    </Content>
  </Link>
);

const BackToTop = () => (
  <AnchorLink href="#nav" css={[transform]}>
    <Content>
      <BsArrow90DegUp />
      <p tw="mt-2">back to top</p>
    </Content>
  </AnchorLink>
);

export default BackToTop;
