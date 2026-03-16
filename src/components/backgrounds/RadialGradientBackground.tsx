import type { CSSProperties, ReactNode } from "react";

type ColorStop = {
  color: string;
  stop: string;
};

type GradientLayer = {
  position: string;
  size: string;
  colors: ColorStop[];
  blur: string;
  opacity: number;
};

interface RadialGradientBackgroundProps {
  variant?: "hero" | "about" | "custom" | string;
  gradient?: GradientLayer[]; // se quiser customizar via prop (nome original do vídeo: gradient)
  children?: ReactNode;
}

const RadialGradientBackground = ({
  variant = "hero",
  gradient = [],
}: RadialGradientBackgroundProps) => {
  const variants: Record<string, GradientLayer[]> = {
    hero: [
      {
        position: "top-1 left-1 -translate-x-1/2 -translate-y-1/2",
        size: "w-[1400px] h-[1400px]",
        colors: [
          { color: "rgba(141, 255, 105, 0.25)", stop: "100%" },
          { color: "rgba(141, 255, 105, 0.45)", stop: "100%" },
          { color: "rgba(141, 255, 105, 0.5)", stop: "100%" },
          { color: "rgba(141, 255, 105, 0.45)", stop: "100%" },
          { color: "rgba(141, 255, 105, 0.25)", stop: "100%" },
        ],
        blur: "0px",
        opacity: 0.5,
      },
      {
        position: "top-1 left-1",
        size: "w-[1400px] h-[1400px]",
        colors: [
          { color: "rgba(141, 255, 105, 0.25)", stop: "100%" },
          { color: "rgba(141, 255, 105, 0.45)", stop: "100%" },
          { color: "rgba(141, 255, 105, 0.5)", stop: "100%" },
          { color: "rgba(141, 255, 105, 0.45)", stop: "100%" },
          { color: "rgba(141, 255, 105, 0.25)", stop: "100%" },
        ],
        blur: "0px",
        opacity: 0.5,
      },
      {
        position: "bottom-1 right-1",
        size: "w-[1400px] h-[1400px]",
        colors: [
          { color: "rgba(141, 255, 105, 0.25)", stop: "100%" },
          { color: "rgba(141, 255, 105, 0.45)", stop: "100%" },
          { color: "rgba(141, 255, 105, 0.5)", stop: "100%" },
          { color: "rgba(141, 255, 105, 0.45)", stop: "100%" },
          { color: "rgba(141, 255, 105, 0.25)", stop: "100%" },
        ],
        blur: "0px",
        opacity: 0.5,
      },
    ],
    about: [
      {
        position: "bottom-0 left-[75%]",
        size: "w-[700px] h-[700px]",
        colors: [
          { color: "rgba(141, 255, 105, 0.25)", stop: "100%" },
          { color: "rgba(141, 255, 105, 0.45)", stop: "100%" },
          { color: "rgba(141, 255, 105, 0.5)", stop: "100%" },
          { color: "rgba(141, 255, 105, 0.45)", stop: "100%" },
          { color: "rgba(141, 255, 105, 0.25)", stop: "100%" },
        ],
        blur: "0px",
        opacity: 0.5,
      },
    ],
  };

  const activeGradients =
    variant === "custom" ? gradient : variants[variant] || variants.hero;

  const generateGradient = (colors: ColorStop[]): CSSProperties["background"] => {
    const colorStops = colors.map(({ color, stop }) => `${color} ${stop}`).join(", ");

    return `radial-gradient(circle at center, transparent 0%, transparent 30%, ${colorStops}, transparent 60%, transparent 100%)`;
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {activeGradients.map((layer, index) => (
        <div
          key={index}
          className={`absolute ${layer.position} ${layer.size} rounded-full`}
          style={{
            background: generateGradient(layer.colors),
            filter: `blur(${layer.blur})`,
            opacity: layer.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default RadialGradientBackground;
