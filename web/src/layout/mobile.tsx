/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import tw, { styled } from "twin.macro";
import { useSpring, animated as a, config } from "react-spring";
import useMeasure from "react-use-measure";
import { BsLinkedin, BsInstagram } from "react-icons/bs";

import { NavProps } from "./nav";

//! ----------> TYPES <----------
type Props = NavProps & {
  open: boolean;
};

//! ----------> STYLES <----------
const Container = styled.nav`
  ${tw`w-screen min-h-screen`};
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

  const overlaySpring = useSpring({
    opacity: open ? 0.6 : 0,
    config: {
      ...config.gentle,
      clamp: true,
    },
  });

  const menuSpring = useSpring({
    left: open ? 0 : bounds?.width,
    config: {
      ...config.slow,
      clamp: true,
    },
  });

  return (
    <Container ref={ref} css={[!open && tw`z-[-10]`]}>
      <a.div tw="w-full h-full bg-olive-dark absolute top-0 z-0" style={overlaySpring} />
      <a.div tw="w-full h-full flex absolute top-0 z-10" style={menuSpring}>
        <div tw="w-0 md:(w-1/2 min-h-screen bg-transparent)" />
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
      </a.div>
    </Container>
  );
};

export default MobileMenu;
