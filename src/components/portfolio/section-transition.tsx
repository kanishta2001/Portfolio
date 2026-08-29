"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

type SectionTransitionProps = {
  children: ReactNode;
  variant?: "tilt" | "scale";
};

// The whole section moves through one restrained 3D scroll transition.
// Inner Reveal animations still handle the smaller content-level motion.
export function SectionTransition({ children, variant = "tilt" }: SectionTransitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 96%", "end 4%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 28,
    mass: 0.35,
  });

  const opacity = useTransform(progress, [0, 0.14, 0.82, 1], [0, 1, 1, 0.28]);
  const y = useTransform(progress, [0, 0.16, 0.82, 1], [96, 0, 0, -44]);
  const scale = useTransform(
    progress,
    [0, 0.16, 0.82, 1],
    variant === "tilt" ? [0.94, 1, 1, 0.97] : [0.86, 1, 1, 0.96],
  );
  const rotateX = useTransform(
    progress,
    [0, 0.16, 0.82, 1],
    variant === "tilt" ? [11, 0, 0, -3] : [0, 0, 0, 0],
  );
  const filter = useTransform(
    progress,
    [0, 0.15, 0.84, 1],
    ["blur(10px)", "blur(0px)", "blur(0px)", "blur(5px)"],
  );

  return (
    <div ref={sectionRef} className="scroll-section-perspective">
      <motion.div
        className="transform-gpu will-change-transform"
        style={reduceMotion ? undefined : { opacity, y, scale, rotateX, filter }}
      >
        {children}
      </motion.div>
    </div>
  );
}
