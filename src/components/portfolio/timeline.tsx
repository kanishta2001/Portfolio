"use client";

import {
  motion,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useLayoutEffect, useRef, type RefObject } from "react";
import { timeline } from "@/data/portfolio";

const RAIL_END_PADDING = 20;

type TimelineNodeProps = {
  progress: MotionValue<number>;
  railRef: RefObject<HTMLDivElement | null>;
  reduceMotion: boolean | null;
  registerNode?: (node: HTMLSpanElement | null) => void;
};

function TimelineNode({
  progress,
  railRef,
  reduceMotion,
  registerNode,
}: TimelineNodeProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const activationPoint = useMotionValue(1);

  useLayoutEffect(() => {
    const node = nodeRef.current;
    const rail = railRef.current;
    if (!node || !rail) return;

    const measureActivationPoint = () => {
      const railRect = rail.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();
      const nodeCenter = nodeRect.top + nodeRect.height / 2;
      const point = (nodeCenter - railRect.top) / Math.max(railRect.height, 1);

      // Exact point where the visible line head reaches this dot.
      activationPoint.set(Math.min(1, Math.max(0, point)));
    };

    measureActivationPoint();
    const resizeObserver = new ResizeObserver(measureActivationPoint);
    resizeObserver.observe(rail);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, [activationPoint, railRef]);

  // A dot remains fully inactive until the same progress line crosses it.
  const reached: MotionValue<number> = useTransform((): number =>
    progress.get() >= activationPoint.get() && progress.get() > 0.001 ? 1 : 0,
  );
  const animatedReached = useSpring(reached, {
    stiffness: 420,
    damping: 28,
    mass: 0.28,
  });
  const visibleReached = reduceMotion ? reached : animatedReached;
  const coreScale = useTransform(visibleReached, [0, 1], [0.48, 1]);
  const ringScale = useTransform(visibleReached, [0, 1], [0.7, 1.85]);
  const ringOpacity = useTransform(visibleReached, [0, 1], [0, 0.5]);
  const borderColor = useTransform(
    visibleReached,
    [0, 1],
    ["rgba(224,231,255,0.26)", "rgba(224,231,255,1)"],
  );
  const nodeShadow = useTransform(
    visibleReached,
    [0, 1],
    ["0 0 0 rgba(138,172,190,0)", "0 0 18px rgba(138,172,190,0.78)"],
  );

  return (
    <motion.span
      ref={(node) => {
        nodeRef.current = node;
        registerNode?.(node);
      }}
      aria-hidden="true"
      data-timeline-node="true"
      className="absolute top-8 left-4 z-20 size-3 -translate-x-1/2 rounded-full border bg-background md:left-1/2"
      style={{ borderColor, boxShadow: nodeShadow }}
    >
      <motion.span
        data-timeline-node-glow="true"
        className="absolute inset-[2px] rounded-full bg-highlight shadow-[0_0_20px_rgba(138,172,190,0.95)]"
        style={{ opacity: visibleReached, scale: coreScale }}
      />
      <motion.span
        className="absolute -inset-1 rounded-full border border-highlight/60"
        style={{ opacity: ringOpacity, scale: ringScale }}
      />
    </motion.span>
  );
}

export function Timeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const firstNodeRef = useRef<HTMLSpanElement>(null);
  const lastNodeRef = useRef<HTMLSpanElement>(null);
  const railTop = useMotionValue(0);
  const railHeight = useMotionValue(1);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 72%", "end 42%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 28,
    mass: 0.38,
  });
  const progress = reduceMotion ? scrollYProgress : smoothProgress;
  const progressHeight = useTransform(progress, (latest) => {
    const clamped = Math.min(1, Math.max(0, latest));
    return `${clamped * 100}%`;
  });
  const lineHeadOpacity = useTransform(
    progress,
    [0, 0.012, 0.985, 1],
    [0, 1, 1, 0],
    { clamp: true },
  );

  useLayoutEffect(() => {
    const track = trackRef.current;
    const firstNode = firstNodeRef.current;
    const lastNode = lastNodeRef.current;
    if (!track || !firstNode || !lastNode) return;

    const measureRail = () => {
      const trackRect = track.getBoundingClientRect();
      const firstRect = firstNode.getBoundingClientRect();
      const lastRect = lastNode.getBoundingClientRect();
      const firstCenter = firstRect.top - trackRect.top + firstRect.height / 2;
      const lastCenter = lastRect.top - trackRect.top + lastRect.height / 2;

      // Extra rail at both ends lets the line visibly cross every node,
      // including the final node, before the animation is complete.
      const top = Math.max(0, firstCenter - RAIL_END_PADDING);
      const bottom = Math.min(trackRect.height, lastCenter + RAIL_END_PADDING);
      railTop.set(top);
      railHeight.set(Math.max(1, bottom - top));
    };

    measureRail();
    const resizeObserver = new ResizeObserver(measureRail);
    resizeObserver.observe(track);
    resizeObserver.observe(firstNode);
    resizeObserver.observe(lastNode);

    return () => resizeObserver.disconnect();
  }, [railHeight, railTop]);

  return (
    <div className="relative mt-20 sm:mt-24 lg:mt-32">
      <div className="site-container relative">
        <motion.div
          className="border-t border-white/12 pt-10 sm:pt-12"
          initial={reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(7px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: reduceMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[0.68rem] font-medium tracking-[0.24em] text-zinc-500 uppercase">
            About / Journey
          </p>
          <h2 className="font-heading mt-4 text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl">
            Journey
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            A scroll through how my development journey has grown, one practical step at a time.
          </p>
        </motion.div>

        <div ref={trackRef} className="relative mt-16 sm:mt-20">
          <motion.div
            ref={railRef}
            aria-hidden="true"
            data-timeline-rail="true"
            className="pointer-events-none absolute left-4 z-0 w-px -translate-x-1/2 md:left-1/2"
            style={{ top: railTop, height: railHeight }}
          >
            <span className="absolute inset-0 bg-white/12" />
            <motion.span
              data-timeline-progress="true"
              className="absolute top-0 left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-highlight via-primary to-secondary shadow-[0_0_16px_rgba(138,172,190,0.62)]"
              style={{ height: progressHeight }}
            >
              <motion.span
                className="absolute -right-[5px] -bottom-1.5 size-3 rounded-full bg-highlight shadow-[0_0_0_5px_rgba(138,172,190,0.12),0_0_24px_rgba(138,172,190,0.9)]"
                style={{ opacity: lineHeadOpacity }}
              />
            </motion.span>
          </motion.div>

          <ol>
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isFirst = index === 0;
              const isLast = index === timeline.length - 1;

              return (
                <li
                  key={item.year}
                  className="relative mb-20 pl-12 last:mb-0 sm:mb-24 md:grid md:grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)] md:pl-0 lg:mb-28"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-[2.16rem] h-px bg-white/12 max-md:left-4 max-md:w-8 ${
                      isLeft ? "md:right-1/2 md:w-8" : "md:left-1/2 md:w-8"
                    }`}
                  />
                  <TimelineNode
                    progress={progress}
                    railRef={railRef}
                    reduceMotion={reduceMotion}
                    registerNode={
                      isFirst
                        ? (node) => {
                            firstNodeRef.current = node;
                          }
                        : isLast
                          ? (node) => {
                              lastNodeRef.current = node;
                            }
                          : undefined
                    }
                  />

                  <motion.article
                    className={`glass-card interactive-surface relative overflow-hidden rounded-[1.65rem] p-6 sm:p-8 ${
                      isLeft ? "md:col-start-1" : "md:col-start-3"
                    }`}
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: 36, x: isLeft ? -18 : 18, filter: "blur(8px)" }
                    }
                    whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.32 }}
                    transition={{ duration: reduceMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -top-20 -right-16 size-44 rounded-full bg-primary/8 blur-3xl"
                    />
                    <span className="relative inline-flex rounded-full border border-highlight/20 bg-highlight/8 px-3.5 py-1.5 text-xs font-semibold tracking-[0.08em] text-highlight">
                      {item.year}
                    </span>
                    <h3 className="font-heading relative mt-6 text-xl font-semibold text-white sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="relative mt-3 text-sm leading-7 text-zinc-400">
                      {item.description}
                    </p>
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
