"use client";

import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { timeline } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";

type TimelineNodeProps = {
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
  total: number;
};

function TimelineNode({ index, progress, reduceMotion, total }: TimelineNodeProps) {
  // Cards are evenly spaced, while the rail continues below the last card's node.
  // Dividing by total aligns each activation with the visual point the line crosses.
  const threshold = total > 0 ? (index + 0.06) / total : 0;
  const activation = useTransform(
    progress,
    [Math.max(0, threshold - 0.035), Math.min(1, threshold + 0.015)],
    [0, 1],
  );
  const glow = useSpring(activation, { stiffness: 360, damping: 24, mass: 0.28 });
  const dotScale = useTransform(glow, [0, 1], [0.55, 1]);
  const ringScale = useTransform(glow, [0, 1], [0.7, 1.8]);

  return (
    <span
      aria-hidden="true"
      className="absolute top-7 left-2 z-10 size-3 -translate-x-[5.5px] rounded-full border-2 border-highlight bg-background md:left-1/2"
    >
      <motion.span
        className="absolute -inset-0.5 rounded-full bg-highlight shadow-[0_0_14px_rgba(235,94,40,0.95)]"
        style={reduceMotion ? { opacity: activation, scale: 1 } : { opacity: glow, scale: dotScale }}
      />
      <motion.span
        className="absolute -inset-1 rounded-full border border-highlight/50"
        style={reduceMotion ? { opacity: 0 } : { opacity: glow, scale: ringScale }}
      />
    </span>
  );
}

export function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 68%", "end 72%"],
  });

  // Spring smoothing prevents the progress line from jumping during fast scrolls.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.35,
  });
  const dotPosition = useTransform(smoothProgress, [0, 1], ["0.5rem", "calc(100% - 0.75rem)"]);
  const movingDotOpacity = useTransform(smoothProgress, [0, 0.015, 0.985, 1], [0, 1, 1, 0]);

  return (
    <section id="journey" className="relative py-28 sm:py-36">
      <div aria-hidden="true" className="absolute top-1/3 left-1/2 h-[42rem] w-64 -translate-x-1/2 bg-primary/10 blur-[110px]" />
      <div className="site-container relative">
        <SectionHeading
          eyebrow="Journey"
          title="Tracing My Path"
          description="A scroll through how my development journey has grown, one practical step at a time."
        />

        <div ref={timelineRef} className="relative mt-16 sm:mt-20">
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-2 w-px bg-white/10 md:left-1/2" />
          <motion.div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-2 w-px origin-top bg-gradient-to-b from-highlight via-indigo-400 to-secondary shadow-[0_0_18px_rgba(235,94,40,0.65)] md:left-1/2"
            style={{ scaleY: reduceMotion ? scrollYProgress : smoothProgress }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-2 z-10 size-3 -translate-x-[5.5px] rounded-full bg-highlight shadow-[0_0_0_6px_rgba(235,94,40,0.12),0_0_28px_rgba(235,94,40,0.9)] md:left-1/2"
            style={reduceMotion ? { display: "none" } : { top: dotPosition, opacity: movingDotOpacity }}
          />

          <ol className="space-y-16 sm:space-y-20 md:space-y-24">
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <li key={item.year} className="relative pl-11 md:grid md:grid-cols-2 md:gap-20 md:pl-0">
                  <TimelineNode
                    index={index}
                    progress={smoothProgress}
                    reduceMotion={reduceMotion}
                    total={timeline.length}
                  />
                  <motion.article
                    className={`glass-card interactive-surface rounded-[1.65rem] p-6 sm:p-8 ${
                      isLeft ? "md:col-start-1" : "md:col-start-2"
                    }`}
                    initial={reduceMotion ? false : { opacity: 0, y: 34, x: isLeft ? -18 : 18 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="inline-flex rounded-full bg-gradient-to-r from-primary to-indigo-400 px-3.5 py-1.5 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(235,94,40,0.18)]">
                      {item.year}
                    </span>
                    <h3 className="font-heading mt-6 text-xl font-semibold text-white sm:text-2xl">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-400">{item.description}</p>
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
