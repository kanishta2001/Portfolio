"use client";

import { motion, useReducedMotion } from "motion/react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.55 }}
      variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
    >
      <motion.div
        className={`mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-[0.68rem] font-medium tracking-[0.24em] text-zinc-400 uppercase ${
          centered ? "justify-center" : ""
        }`}
        variants={{
          hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.52 } },
        }}
      >
        <span className="size-1.5 rounded-full bg-highlight shadow-[0_0_10px_rgba(235,94,40,0.8)]" />
        {eyebrow}
      </motion.div>
      <div className="overflow-hidden pb-1">
        <motion.h2
          className="font-heading text-4xl leading-tight font-bold tracking-[-0.035em] text-white sm:text-5xl"
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
          className="mt-5 text-base leading-7 text-zinc-400"
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
