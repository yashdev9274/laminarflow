"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

const pathVariants: Variants = {
  normal: {
    opacity: 1,
    scale: 1,
  },
  animate: (i: number) => ({
    opacity: [0.3, 1, 0.3],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      delay: i * 0.2,
    },
  }),
};

interface SmartphoneNfcProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
}

const SmartphoneNfc = ({
  width = 18,
  height = 18,
  strokeWidth = 2,
  stroke = "currentColor",
  ...props
}: SmartphoneNfcProps) => {
  const controls = useAnimation();

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <rect width="7" height="12" x="2" y="6" rx="1" />
        <motion.path
          d="M13 8.32a7.43 7.43 0 0 1 0 7.36"
          variants={pathVariants}
          animate={controls}
          custom={0}
        />
        <motion.path
          d="M16.46 6.21a11.76 11.76 0 0 1 0 11.58"
          variants={pathVariants}
          animate={controls}
          custom={1}
        />
        <motion.path
          d="M19.91 4.1a15.91 15.91 0 0 1 .01 15.8"
          variants={pathVariants}
          animate={controls}
          custom={2}
        />
      </svg>
    </div>
  );
};

export { SmartphoneNfc };

