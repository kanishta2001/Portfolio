"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
};

// Reserved for one featured surface so the portfolio stays calm rather than gimmicky.
export function TiltCard({ children, className = "" }: TiltCardProps) {
  const reduceMotion = useReducedMotion();
  const rotateXSource = useMotionValue(0);
  const rotateYSource = useMotionValue(0);
  const rotateX = useSpring(rotateXSource, { stiffness: 180, damping: 22, mass: 0.45 });
  const rotateY = useSpring(rotateYSource, { stiffness: 180, damping: 22, mass: 0.45 });

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = event.clientX - bounds.left;
    const pointerY = event.clientY - bounds.top;
    const normalizedX = pointerX / bounds.width - 0.5;
    const normalizedY = pointerY / bounds.height - 0.5;

    rotateXSource.set(normalizedY * -5);
    rotateYSource.set(normalizedX * 5);
    event.currentTarget.style.setProperty("--spotlight-x", `${pointerX}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${pointerY}px`);
  };

  const resetTilt = () => {
    rotateXSource.set(0);
    rotateYSource.set(0);
  };

  return (
    <motion.article
      className={`spotlight-card ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
    >
      {children}
    </motion.article>
  );
}
