import { createContext, useState, useEffect } from "react";
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

export const useScrollListener = () => {
  const [scrollData, setScrollData] = useState({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollData((prev) => ({
        x: window?.scrollX,
        y: window?.scrollY,
        lastX: prev.x,
        lastY: prev.y,
      }));
    };

    // handleScroll();
    window?.addEventListener(`scroll`, handleScroll);

    return () => window?.removeEventListener(`scroll`, handleScroll);
  }, []);

  return scrollData;
};

export const ScrollContext = createContext(null);
