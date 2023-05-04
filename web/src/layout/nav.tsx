/* eslint-disable unicorn/no-negated-condition */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import tw, { styled } from "twin.macro";
import { useSpring, config, animated as a } from "react-spring";
import useMeasure from "react-use-measure";
import { useWindowSize, useEffectOnce } from "react-use";
import { Fade as Burger } from "hamburger-react";
import { ScrollLocky } from "react-scroll-locky";
import { BsLinkedin, BsInstagram } from "react-icons/bs";

import { useScrollListener } from "../utils";
import Logo from "@web/src/assets/logo";
import { Container as C, transform } from "@web/src/common/style";
import MobileMenu from "./mobile";

//! ----------> TYPES <----------
export type NavProps = {
  email: string;
  insta: string;
  linkedin: string;
};

//! ----------> STYLES <----------
const Wrapper = styled(a.nav)`
  ${tw`w-screen h-[5.25rem] md:(h-[7.5rem]) lg:(h-[11.25rem])`};
  ${tw`bg-white-off text-teal`};
  ${tw`font-serif`};
  ${tw`flex items-center`};
  ${tw`fixed z-20`};
`;

const Container = styled(C)`
  ${tw`w-full flex items-center justify-between`};
`;

const MobileContainer = styled(a.nav)`
  ${tw`w-screen flex`}
  ${tw`fixed lg:(hidden)`};
  ${tw`top-[5.25rem] md:(top-[7.5rem])`};

  a {
    ${tw`transition duration-500 ease-in-out`};
    ${tw`hover:(text-mint)`};
  }
`;

//! ----------> COMPONENTS <----------
const Nav = ({ email, insta, linkedin }: NavProps) => {
  const router = useRouter();
  const [ref, bounds] = useMeasure();

  const [open, setOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const scroll = useScrollListener();
  const { width } = useWindowSize();

  const springUp = width < 768 ? `-5.25rem` : width < 1280 ? `-7.5rem` : `-11.25rem`;

  const spring = useSpring({
    to: { top: show ? `0rem` : springUp, zIndex: show ? 50 : 20 },
    config: { ...config.slow, clamp: true },
  });

  const menuSpring = useSpring({
    left: !bounds.width ? -1000 : open ? 0 : -bounds.width,
  });

  useEffect(() => {
    if (scroll.y > 100 && scroll.y - scroll.lastY > 0) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [scroll.y, scroll.lastY]);

  useEffect(() => {
    router.events.on(`routeChangeStart`, () => setOpen(false));

    return () => router.events.off(`routeChangeStart`, () => setOpen(false));
  }, []);

  useEffectOnce(() => {
    setOpen(false);
  });

  return (
    <ScrollLocky enabled={open}>
      <>
        <Wrapper id="nav" style={spring}>
          <Container>
            <div tw="flex items-center space-x-5 text-2xl lg:(w-1/3)">
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                css={[transform]}
                tw="hidden md:(block)"
              >
                {" "}
                <BsLinkedin />
              </a>
              <a
                href={insta}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                css={[transform]}
                tw="hidden md:(block)"
              >
                {" "}
                <BsInstagram />
              </a>
            </div>

            <div tw="lg:(w-1/3)">
              <div tw="w-[12.3125rem] md:(w-[15.4375rem]) mx-auto">
                <Link href="/" passHref aria-label="Home">
                  <p css={[transform]}>
                    <Logo />
                  </p>
                </Link>
              </div>
            </div>

            <div tw="lg:(w-1/3)">
              <div tw="hidden lg:(flex items-center justify-end space-x-9 text-xl)">
                <Link href="/" passHref>
                  <p css={[transform]}>work</p>
                </Link>
                <Link href="/about" passHref>
                  <p css={[transform]}>about</p>
                </Link>
                <a href={`mailto:${email}`} target="_blank" rel="noreferrer" css={[transform]}>
                  say hi!
                </a>
              </div>
              <div
                tw="text-2xl lg:(hidden)"
                css={[
                  ` div.hamburger-react > div {
                height: 2px !important;
                border-radius: 13em !important;
              }`,
                ]}
              >
                <Burger
                  toggled={open}
                  toggle={() => setOpen(!open)}
                  size={20}
                  label={open ? `Close Menu` : `Open Menu`}
                  distance="md"
                  rounded
                />
              </div>
            </div>
          </Container>
        </Wrapper>
        <MobileContainer ref={ref} style={menuSpring} tw="overflow-hidden">
          <MobileMenu
            open={open}
            setOpen={setOpen}
            email={email}
            insta={insta}
            linkedin={linkedin}
          />
        </MobileContainer>
      </>
    </ScrollLocky>
  );
};

export default Nav;
