"use client";

import { motion, useAnimation } from "motion/react";
import type { Variants, SVGMotionProps } from "motion/react";

interface SandClockIconProps extends SVGMotionProps<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
  size?: number;
}

const sandClockVariants: Variants = {
  normal: {
    rotateZ: 0, // No rotation in normal state
    scale: 1,
  },
  animate: {
    rotateZ: [0, 5, -5, 0], // Subtle swing effect
    scale: [1, 1.05, 1], // Subtle pulse effect
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};

const SandClockIcon = ({
  width: propWidth,
  height: propHeight,
  size = 18,
  strokeWidth = 2,
  stroke = "currentColor",
  ...restProps
}: SandClockIconProps) => {
  const controls = useAnimation();

  const finalWidth = size || propWidth || 18;
  const finalHeight = size || propHeight || 18;

  const { onAnimationStart, ...svgProps } = restProps;

  return (
    <div
      style={{
        cursor: "pointer",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={finalWidth}
        height={finalHeight}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...svgProps}
        variants={sandClockVariants}
        animate={controls}
        initial="normal"
        style={{ transformOrigin: "center" }}
      >
        <path d="M5 22h14"/>
        <path d="M5 2h14"/>
        <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/>
        <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
      </motion.svg>
    </div>
  );
};

export { SandClockIcon };