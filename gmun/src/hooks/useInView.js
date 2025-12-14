import { useEffect, useRef, useState } from "react";

/**
 * Custom hook that detects when an element is in the viewport
 * @param {Object} options - IntersectionObserver options
 * @returns {[React.RefObject, boolean]} - [ref to attach to element, isInView state]
 */
const useInView = (options = { threshold: 0.3 }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isInView];
};

export default useInView;
