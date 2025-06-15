"use client";

import { motion, useAnimation } from "motion/react";
import type { Variants, SVGMotionProps } from "motion/react";

interface CardIconProps extends SVGMotionProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
  stroke?: string;
}

const cardVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1], // Subtle pulse
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const lineVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1], // Draws the line
    opacity: [0, 1],
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const CardIcon = ({
  size = 20,
  strokeWidth = 2,
  stroke = "currentColor",
  ...restProps
}: CardIconProps) => {
  const controls = useAnimation();

  const finalWidth = restProps.width || size;
  const finalHeight = restProps.height || size;

  const handleHoverStart = async () => {
    // Start main card animation
    controls.start("animate");
    // Re-draw the line
    await controls.start((i) => ({ pathLength: 0, opacity: 0, transition: { duration: 0 } }));
    controls.start((i) => ({ pathLength: 1, opacity: 1, transition: { duration: 0.6, delay: 0.1 } }));
  };

  const handleHoverEnd = () => {
    controls.start("normal");
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
        variants={cardVariants}
        initial="normal"
        animate={controls}
        style={{ transformOrigin: "center" }}
      >
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <motion.line
          x1="2"
          x2="22"
          y1="10"
          y2="10"
          variants={lineVariants}
          initial="normal" // Line starts visible
          animate={controls} // Controlled by hover
        />
      </motion.svg>
    </div>
  );
};

export { CardIcon };