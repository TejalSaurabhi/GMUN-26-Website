import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Scroll window
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    
    // Also scroll document element and body
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
