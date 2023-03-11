/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import tw, { styled } from "twin.macro";
import { useSpring, animated as a } from "react-spring";
import useMeasure from "react-use-measure";
import { BsLinkedin, BsInstagram } from "react-icons/bs";

import { NavProps } from "./nav";

//! ----------> TYPES <----------
type Props = NavProps & {
  open: boolean;
};

//! ----------> STYLES <----------
const Container = styled(a.nav)`
  ${tw`w-screen flex`};
  ${tw`fixed lg:(hidden)`};
  ${tw`top-[5.25rem] md:(top-[7.5rem])`};

  a {
    ${tw`transition duration-500 ease-in-out`};
    ${tw`hover:(text-mint)`};
  }
`;

const Nav = styled.div`
  ${tw`w-full min-h-screen`};
  ${tw`md:(w-1/2)`};
  ${tw`pt-16 pl-24`};
  ${tw`bg-teal text-white-off`};
  ${tw`text-2xl font-serif`};
  ${tw`flex flex-col space-y-10`};
`;

//! ----------> COMPONENTS <----------
const MobileMenu = ({ open, email, insta, linkedin }: Props) => {
  const [ref, bounds] = useMeasure();

  const menuSpring = useSpring({
    left: open ? 0 : -bounds?.width,
  });

  return (
    <Container ref={ref} style={menuSpring} tw="overflow-hidden">
      <div tw="w-0 md:(w-1/2 min-h-screen bg-olive-dark/60)" />
      <Nav>
        <Link href="/" passHref legacyBehavior>
          <a>work</a>
        </Link>
        <Link href="/about" passHref legacyBehavior>
          <a>about</a>
        </Link>
        <a href={`mailto:${email}`}>say hi!</a>
        <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          {" "}
          <BsLinkedin />
        </a>
        <a href={insta} target="_blank" rel="noreferrer" aria-label="Instagram">
          {" "}
          <BsInstagram />
        </a>
      </Nav>
    </Container>
  );
};

export default MobileMenu;
