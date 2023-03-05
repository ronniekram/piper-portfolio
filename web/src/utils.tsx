import tw from "twin.macro";

export const projectColor = (tag: string) => {
  switch (tag) {
    case `app`: {
      return tw`bg-purple-pale`;
    }
    case `branding`: {
      return tw`bg-pink`;
    }
    case `scale`: {
      return tw`bg-yellow`;
    }
    case `illustration`: {
      return tw`bg-mint`;
    }
  }
};
