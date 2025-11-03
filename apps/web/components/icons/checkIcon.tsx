"use client";

import { motion, useAnimation } from "motion/react";
import type { Variants, SVGMotionProps } from "motion/react";

interface CheckProps extends SVGMotionProps<SVGSVGElement> {
  size?: number;
}

const checkVariants: Variants = {
  normal: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const CheckIcon = ({
  size = 18,
  strokeWidth = 2,
  stroke = "currentColor",
  ...restProps
}: CheckProps) => {
  const controls = useAnimation();

  const finalWidth = restProps.width || size;
  const finalHeight = restProps.height || size;

  const handleHoverStart = () => {
    controls.start("animate");
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
        variants={checkVariants}
        initial="normal"
        animate={controls}
        style={{ transformOrigin: "center" }}
      >
        <path
          d="M20 6 9 17l-5-5"
        />
      </motion.svg>
    </div>
  );
};

export { CheckIcon };
