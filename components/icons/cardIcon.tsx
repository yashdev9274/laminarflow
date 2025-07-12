"use client";

import { motion } from "framer-motion";
import type { SVGMotionProps } from "framer-motion";

interface CardIconProps extends SVGMotionProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
  stroke?: string;
}

const CardIcon = ({
  size = 20,
  strokeWidth = 2,
  stroke = "currentColor",
  ...restProps
}: CardIconProps) => {
  const finalWidth = restProps.width || size;
  const finalHeight = restProps.height || size;

  return (
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
      whileHover={{ scale: 1.1, rotate: -5 }}
      whileTap={{ scale: 0.95, rotate: 5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ transformOrigin: "center", cursor: "pointer" }}
    >
      <motion.rect
        width="20"
        height="14"
        x="2"
        y="5"
        rx="2"
        initial={{ pathLength: 1 }}
        whileHover={{ pathLength: [0, 1], transition: { duration: 0.4, ease: "easeOut" } }}
        whileTap={{ pathLength: [0, 1], transition: { duration: 0.4, ease: "easeOut" } }}
      />
      <motion.line
        x1="2"
        x2="22"
        y1="10"
        y2="10"
        initial={{ pathLength: 1, opacity: 1 }}
        whileHover={{
          pathLength: [0, 1],
          opacity: [0, 1],
          transition: { duration: 0.4, ease: "easeOut", delay: 0.2 },
        }}
        whileTap={{
          pathLength: [0, 1],
          opacity: [0, 1],
          transition: { duration: 0.4, ease: "easeOut", delay: 0.2 },
        }}
      />
    </motion.svg>
  );
};

export { CardIcon };
