"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId, useRef } from "react";

type StrokeTextProps = {
  text: string;
  className?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  drawDuration?: number;
  fillDelay?: number;
  stagger?: number;
  ease?: "power2.out";
  trigger?: "mount";
  fillMode?: "wipe";
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  reverse?: boolean;
  onComplete?: () => void;
};

/**
 * ReactBits-style Stroke Text using the project's existing Motion dependency.
 * Letter outlines draw first, then a left-to-right mask reveals the solid fill.
 */
export function StrokeText({
  text,
  className = "",
  strokeColor = "#8AACBE",
  fillColor = "#F8FAFF",
  strokeWidth = 1.35,
  drawDuration = 1.15,
  fillDelay = 0.16,
  stagger = 0.035,
  ease = "power2.out",
  trigger = "mount",
  fillMode = "wipe",
  fontSize = 136,
  fontWeight = 700,
  letterSpacing = -7,
  reverse = false,
  onComplete,
}: StrokeTextProps) {
  const reduceMotion = useReducedMotion();
  const clipId = `stroke-fill-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const hasCompleted = useRef(false);
  const characters = Array.from(text);
  const dashLength = 900;
  const fillStart = drawDuration + fillDelay;
  const motionEase =
    ease === "power2.out" ? ([0.22, 1, 0.36, 1] as const) : ([0.22, 1, 0.36, 1] as const);

  const handleComplete = () => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;
    onComplete?.();
  };

  return (
    <span
      aria-hidden="true"
      className={`stroke-text ${className}`}
      data-fill-mode={fillMode}
      data-trigger={trigger}
    >
      <svg
        viewBox="0 0 1600 190"
        preserveAspectRatio="xMidYMid meet"
        className="stroke-text-svg"
      >
        <defs>
          <clipPath id={clipId}>
            <motion.rect
              x="0"
              y="0"
              height="190"
              initial={reduceMotion ? false : { width: 0 }}
              animate={{ width: 1600 }}
              transition={{
                duration: reduceMotion ? 0 : Math.max(0.48, drawDuration * 0.5),
                delay: reduceMotion ? 0 : fillStart,
                ease: [0.65, 0, 0.35, 1],
              }}
              onAnimationComplete={handleComplete}
            />
          </clipPath>
        </defs>

        <text
          x="800"
          y="139"
          textAnchor="middle"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          className="stroke-text-lettering"
          style={{ fontSize, fontWeight, letterSpacing }}
        >
          {characters.map((character, index) => (
            <motion.tspan
              key={`${character}-${index}`}
              initial={
                reduceMotion
                  ? false
                  : {
                      strokeDasharray: dashLength,
                      strokeDashoffset: dashLength,
                    }
              }
              animate={{
                strokeDasharray: dashLength,
                strokeDashoffset: 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : drawDuration,
                delay: reduceMotion
                  ? 0
                  : (reverse ? characters.length - 1 - index : index) * stagger,
                ease: motionEase,
              }}
            >
              {character === " " ? "\u00A0" : character}
            </motion.tspan>
          ))}
        </text>

        <text
          x="800"
          y="139"
          textAnchor="middle"
          fill={fillColor}
          stroke="none"
          clipPath={`url(#${clipId})`}
          className="stroke-text-lettering"
          style={{ fontSize, fontWeight, letterSpacing }}
        >
          {text}
        </text>
      </svg>
    </span>
  );
}
