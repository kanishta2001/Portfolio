"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  centered?: boolean;
  size?: "default" | "compact" | "slightlyCompact";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  size = "default",
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();
  const eyebrowSize =
    size === "compact"
      ? "px-3.5 py-1.5 text-[0.6rem]"
      : size === "slightlyCompact"
        ? "px-4 py-2 text-[0.65rem]"
        : "px-4 py-2 text-[0.68rem]";
  const titleSize =
    size === "compact"
      ? "text-3xl sm:text-[2.55rem]"
      : size === "slightlyCompact"
        ? "text-[2.15rem] sm:text-[2.85rem]"
        : "text-4xl sm:text-5xl";
  const descriptionSize =
    size === "compact"
      ? "mt-4 text-sm leading-6"
      : size === "slightlyCompact"
        ? "mt-5 text-[0.95rem] leading-7"
        : "mt-5 text-base leading-7";

  return (
    <motion.div
      className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.55 }}
      variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
    >
      <motion.div
        className={`mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] font-medium tracking-[0.24em] text-zinc-400 uppercase ${eyebrowSize} ${
          centered ? "justify-center" : ""
        }`}
        variants={{
          hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.52 } },
        }}
      >
        <span className="size-1.5 rounded-full bg-highlight shadow-[0_0_10px_rgba(138,172,190,0.8)]" />
        {eyebrow}
      </motion.div>
      <div className="overflow-hidden pb-1">
        <motion.h2
          className={`font-heading leading-tight font-bold tracking-[-0.035em] text-white ${titleSize}`}
          variants={{
            hidden: { opacity: 0, y: "105%" },
            visible: {
              opacity: 1,
              y: "0%",
              transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {title}
        </motion.h2>
      </div>
      {description && (
        <motion.p
          className={`${descriptionSize} text-zinc-400`}
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(7px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
