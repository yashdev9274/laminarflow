"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

interface WalletIconProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
  size?: number;
}

const pathVariants: Variants = {
  normal: {
    opacity: 1,
    scale: 1,
  },
  animate: (i: number) => ({
    opacity: [0.3, 1, 0.3],
    scale: [0.95, 1, 0.95],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      delay: i * 0.2,
    },
  }),
};

const WalletIcon = ({
  width = 20,
  height = 20,
  strokeWidth = 2,
  stroke = "currentColor",
  size,
  ...props
}: WalletIconProps) => {
  const controls = useAnimation();

  // Use size if provided, otherwise width/height
  const finalWidth = size || width;
  const finalHeight = size || height;

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
        width={finalWidth}
        height={finalHeight}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <motion.path
          d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"
          variants={pathVariants}
          animate={controls}
          initial="normal"
          custom={0}
        />
        <motion.path
          d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"
          variants={pathVariants}
          animate={controls}
          initial="normal"
          custom={1}
        />
      </svg>
    </div>
  );
};

export { WalletIcon };
