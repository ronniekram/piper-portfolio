/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import Link from "next/link";
import tw, { styled } from "twin.macro";
import { BsLinkedin, BsInstagram, BsList, BsXSquare } from "react-icons/bs";

import Logo from "@web/src/assets/logo";
import { Container as C } from "@web/src/common/style";

//! ----------> TYPES <----------
type NavProps = {
  email: string;
  insta: string;
  linkedin: string;
};

//! ----------> STYLES <----------
const Wrapper = styled.nav`
  ${tw`w-screen h-[5.25rem] md:(h-[7.5rem]) xl:(h-[11.25rem])`};
  ${tw`bg-white-off text-teal`};
  ${tw`font-serif`};
  ${tw`flex items-center`};
`;

const Container = styled(C)`
  ${tw`w-full flex items-center justify-between`};
`;

const transform = tw`transition duration-500 ease-in-out hover:(text-forest)`;

//! ----------> COMPONENTS <----------
const Nav = ({ email, insta, linkedin }: NavProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Wrapper>
      <Container>
        <div tw="flex items-center space-x-5 text-2xl">
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

        <div tw="w-[12.3125rem] md:(w-[15.4375rem])">
          <Link href="/" passHref aria-label="Home">
            <a css={[transform]}>
              <Logo />
            </a>
          </Link>
        </div>

        <div>
          <div tw="hidden xl:(flex items-center space-x-9 text-xl)">
            <Link href="/" passHref>
              <a css={[transform]}>work</a>
            </Link>
            <Link href="/about" passHref>
              <a css={[transform]}>about</a>
            </Link>
            <a href={`mailto:${email}`} target="_blank" rel="noreferrer" css={[transform]}>
              say hi!
            </a>
          </div>
          <div tw="text-2xl xl:(hidden)">
            <button
              type="button"
              css={[transform]}
              onClick={() => setOpen(!open)}
              aria-label={open ? `Close menu` : `Open menu`}
            >
              {open ? <BsXSquare /> : <BsList />}
            </button>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Nav;
