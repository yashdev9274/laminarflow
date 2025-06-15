"use client";

import { motion, useAnimation } from "motion/react";
import type { Variants, SVGMotionProps } from "motion/react";

interface DollarSignIconProps extends SVGMotionProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
  stroke?: string;
}

const dollarLineVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1], // Draws the line
    opacity: [0, 1],
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const dollarPathVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1], // Draws the dollar sign path
    opacity: [0, 1],
    transition: {
      delay: 0.3, // Starts after the line
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const DollarSignIcon = ({
  size = 20,
  strokeWidth = 2,
  stroke = "currentColor",
  ...restProps
}: DollarSignIconProps) => {
  const controls = useAnimation();

  const finalWidth = restProps.width || size;
  const finalHeight = restProps.height || size;

  const handleHoverStart = async () => {
    // Reset all paths to hidden
    await controls.start({ pathLength: 0, opacity: 0 }, { duration: 0 });
    // Animate drawing
    await controls.start("animate");
  };

  const handleHoverEnd = () => {
    controls.start("normal"); // Reset to fully drawn
  };

  return (
    <div
      style={{
        cursor: "pointer",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
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
        {...restProps}
      >
        <motion.line
          x1="12"
          x2="12"
          y1="2"
          y2="22"
          variants={dollarLineVariants}
          initial="normal" // Starts visible
          animate={controls}
        />
        <motion.path
          d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
          variants={dollarPathVariants}
          initial="normal" // Starts visible
          animate={controls}
        />
      </motion.svg>
    </div>
  );
};

export { DollarSignIcon };