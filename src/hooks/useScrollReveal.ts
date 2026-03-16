import { useState, useEffect, useRef } from "react";

type ScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
};

export const useScrollReveal = (
  options: ScrollRevealOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = "0px",
  } = options;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
};
