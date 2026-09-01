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
  const coreScale = useTransform(visibleReached, [0, 1], [0.65, 1]);
  const borderColor = useTransform(
    visibleReached,
    [0, 1],
    ["rgba(224,231,255,0.3)", "rgba(248,250,255,0.92)"],
  );
  const nodeShadow = useTransform(
    visibleReached,
    [0, 1],
    [
      "0 0 0 rgba(224,231,255,0)",
      "0 0 0 3px rgba(224,231,255,0.08), 0 0 13px rgba(224,231,255,0.72)",
    ],
  );

  return (
    <motion.span
      ref={(node) => {
        nodeRef.current = node;
        registerNode?.(node);
      }}
      aria-hidden="true"
      data-timeline-node="true"
      className="absolute top-7 left-4 z-20 size-3 -translate-x-1/2 rounded-full border bg-background md:left-1/2"
      style={{ borderColor, boxShadow: nodeShadow }}
    >
      <motion.span
        data-timeline-node-glow="true"
        className="absolute inset-[1px] rounded-full bg-[#f4f7ff] shadow-[0_0_10px_rgba(244,247,255,0.82)]"
        style={{ opacity: visibleReached, scale: coreScale }}
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
  const progressScale = useTransform(progress, (latest) => {
    const clamped = Math.min(1, Math.max(0, latest));
    return clamped;
  });

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
    <div className="relative mt-16 sm:mt-20 lg:mt-24">
      <div className="site-container relative">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(7px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: reduceMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading text-center text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl">
            Journey
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-7 text-zinc-400 sm:text-base">
            A simple look at how I grew as a developer.
          </p>
        </motion.div>

        <div ref={trackRef} className="relative mx-auto mt-12 max-w-5xl sm:mt-14">
          <motion.div
            ref={railRef}
            aria-hidden="true"
            data-timeline-rail="true"
            className="pointer-events-none absolute left-4 z-10 w-3 -translate-x-1/2 md:left-1/2"
            style={{ top: railTop, height: railHeight }}
          >
            <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 rounded-full bg-[#435465]/80 shadow-[0_0_8px_rgba(67,84,101,0.35)]" />
            <motion.span
              data-timeline-progress="true"
              className="absolute inset-y-0 left-1/2 w-[2px] origin-top -translate-x-1/2 rounded-full bg-[linear-gradient(to_bottom,#f8faff_0%,#e0e7ff_42%,#8aacbe_78%,#64788a_100%)] shadow-[0_0_8px_rgba(224,231,255,0.9),0_0_18px_rgba(138,172,190,0.72)]"
              style={{ scaleY: progressScale }}
            />
          </motion.div>

          <ol className="relative z-10">
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isFirst = index === 0;
              const isLast = index === timeline.length - 1;

              return (
                <li
                  key={item.year}
                  className="relative mb-12 min-h-28 pl-11 last:mb-0 sm:mb-14 md:grid md:min-h-32 md:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] md:items-start md:pl-0 lg:mb-16"
                >
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
                    className={`relative max-w-[28rem] py-1 ${
                      isLeft
                        ? "md:col-start-1 md:justify-self-end md:pr-5 md:text-right"
                        : "md:col-start-3 md:pl-5"
                    }`}
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: 24, x: isLeft ? -14 : 14, filter: "blur(6px)" }
                    }
                    whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.32 }}
                    transition={{ duration: reduceMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="relative text-[0.66rem] font-medium tracking-[0.08em] text-zinc-300">
                      {item.year}
                    </span>
                    <h3 className="font-heading relative mt-1.5 text-lg leading-snug font-semibold text-white sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="relative mt-1.5 text-xs leading-5 text-zinc-300 sm:text-[0.82rem] sm:leading-6">
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
