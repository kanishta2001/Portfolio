"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type RotatingTextProps = {
  texts: readonly string[];
  interval?: number;
  className?: string;
};

/** Rotates technologies without changing the height of the role sentence. */
export function RotatingText({
  texts,
  interval = 2000,
  className = "",
}: RotatingTextProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || texts.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % texts.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval, reduceMotion, texts.length]);

  const currentText = texts[activeIndex];

  return (
    <span aria-hidden="true" className={`rotating-text ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          className="rotating-text-row"
          key={currentText}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          exit={reduceMotion ? undefined : "exit"}
          variants={{
            visible: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
            exit: { transition: { staggerChildren: 0.018 } },
          }}
        >
          {currentText.split("").map((character, index) => (
            <span className="rotating-text-cell" key={`${character}-${index}`}>
              <motion.span
                className="rotating-text-char"
                variants={{
                  hidden: { y: "110%", opacity: 0 },
                  visible: {
                    y: "0%",
                    opacity: 1,
                    transition: { type: "spring", damping: 30, stiffness: 400 },
                  },
                  exit: {
                    y: "-120%",
                    opacity: 0,
                    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
                  },
                }}
              >
                {character === " " ? "\u00A0" : character}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
