import type { ReactNode } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

type AnimationType =
  | "fadeUp"
  | "fadeIn"
  | "slideLeft"
  | "slideRight"
  | "slideIn";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
}

const ScrollReveal = ({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 700,
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const animationClass: Record<AnimationType, string> = {
    fadeUp: "opacity-0 translate-y-8",
    fadeIn: "opacity-0",
    slideLeft: "opacity-0 -translate-x-12",
    slideRight: "opacity-0 translate-x-12",
    slideIn: "opacity-0 scale-90",
  };

  const visibleClass =
    "opacity-100 translate-y-0 translate-x-0 scale-100";

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all ease-out ${
        isVisible ? visibleClass : animationClass[animation]
      }`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
