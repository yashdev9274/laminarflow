"use client";

import { motion, useAnimation } from "motion/react";
import type { Variants, SVGMotionProps } from "motion/react";

// The interface for the component's props, extending SVGMotionProps for compatibility
interface AnalyticsIconProps extends SVGMotionProps<SVGSVGElement> {
  size?: number; // Custom size prop
  strokeWidth?: number;
  stroke?: string;
}

// Variants for the static frame of the chart (axis)
const frameVariants: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 1 }, // Frame remains visible, no specific animation for it
};

// Variants for the animated line of the chart
const lineVariants: Variants = {
  visible: { pathLength: 1, opacity: 1 }, // Fully drawn line
  hidden: { pathLength: 0, opacity: 0 }, // Hidden line
};

const AnalyticsIcon = ({
  size = 20, // Default size for consistency in dashboard blocks
  strokeWidth = 2,
  stroke = "currentColor", // Allows color to be controlled by CSS
  ...restProps // Captures all other SVG and motion props
}: AnalyticsIconProps) => {
  const controls = useAnimation();

  // Determine final width/height based on size prop, or fallback to default/passed width/height
  const finalWidth = restProps.width || size;
  const finalHeight = restProps.height || size;

  // Custom hover animation for the line
  const handleHoverStart = async () => {
    // Reset the line (hide it)
    await controls.start((i) => ({
      pathLength: 0,
      opacity: 0,
      transition: { duration: 0.1, delay: i * 0.05 }, // Quick reset
    }));
    // Draw the line
    await controls.start((i) => ({
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.5, delay: i * 0.05 }, // Draw animation
    }));
  };

  // On hover end, simply ensure it's in the 'visible' state
  const handleHoverEnd = () => {
    controls.start("visible");
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
        {...restProps} // Spread all remaining props
      >
        {/* The static frame of the chart */}
        <motion.path d="M3 3v16a2 2 0 0 0 2 2h16" variants={frameVariants} initial="visible" />

        {/* The animated line of the chart */}
        <motion.path
          d="m19 9-5 5-4-4-3 3"
          variants={lineVariants}
          initial="visible" // Initial state is visible (drawn)
          animate={controls} // Controlled by animation hook
          custom={1} // Custom prop passed to variants for staggered effects if needed
        />
      </motion.svg>
    </div>
  );
};

export { AnalyticsIcon };
