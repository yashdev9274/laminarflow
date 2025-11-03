"use client";

import type { Variants, SVGMotionProps } from "motion/react";
import { motion, useAnimation } from "motion/react";

const pathVariant: Variants = {
  normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    pathOffset: [1, 0],
  },
};

const circleVariant: Variants = {
  normal: {
    pathLength: 1,
    pathOffset: 0,
    scale: 1,
  },
  animate: {
    pathLength: [0, 1],
    pathOffset: [1, 0],
    scale: [0.5, 1],
  },
};

interface UserProps extends SVGMotionProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
  stroke?: string;
}

const User = ({
  size = 18,
  strokeWidth = 2,
  stroke = "currentColor",
  ...restProps
}: UserProps) => {
  const controls = useAnimation();

  const finalWidth = restProps.width || size;
  const finalHeight = restProps.height || size;

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
        {...restProps}
        initial="normal"
        animate={controls}
      >
        <motion.circle
          cx="12"
          cy="8"
          r="5"
          variants={circleVariant}
        />
        <motion.path
          d="M20 21a8 8 0 0 0-16 0"
          variants={pathVariant}
          transition={{
            delay: 0.2,
            duration: 0.4,
          }}
        />
      </motion.svg>
    </div>
  );
};

export { User };
