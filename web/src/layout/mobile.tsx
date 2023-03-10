import Link from "next/link";
import tw, { styled } from "twin.macro";
import { useSpring, animated as a } from "react-spring";
import { Fade as Burger } from "hamburger-react";
import { ScrollLocky } from "react-scroll-locky";
import { BsLinkedin, BsInstagram } from "react-icons/bs";

//! ----------> TYPES <----------
//! ----------> STYLES <----------
const Container = styled.nav`
  ${tw`w-screen min-h-screen`};
  ${tw`bg-teal text-white-off`};
  ${tw`text-2xl font-serif`};
  ${tw`flex flex-col space-y-10`};
  ${tw`pt-16`};

  a {
    ${tw`transition duration-500 ease-in-out`};
    ${tw`hover:(text-mint)`};
  }
`;

//! ----------> COMPONENTS <----------
