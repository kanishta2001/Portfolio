"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

export type StickyScrollItem = {
  title: string;
  description: string;
  titleContent?: ReactNode;
  descriptionContent?: ReactNode;
  content: ReactNode;
  eyebrow?: ReactNode;
  details?: ReactNode;
};

type StickyScrollProps = {
  content: StickyScrollItem[];
  className?: string;
};

/**
 * Page-scroll version of the Aceternity-style Sticky Scroll Reveal pattern.
 * The written project details remain in the normal document flow while only
 * the fixed preview slot changes as each project reaches the viewport centre.
 */
export function StickyScroll({ content, className = "" }: StickyScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const activationPoints = useRef<number[]>([]);
  const [activeCard, setActiveCard] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measurePanels = () => {
      const containerRect = container.getBoundingClientRect();

      activationPoints.current = panelRefs.current.map((panel, index) => {
        if (!panel || containerRect.height === 0) {
          return (index + 0.5) / content.length;
        }

        const panelRect = panel.getBoundingClientRect();
        const panelCenter = panelRect.top - containerRect.top + panelRect.height / 2;
        return panelCenter / containerRect.height;
      });
    };

    measurePanels();
    const resizeObserver = new ResizeObserver(measurePanels);
    resizeObserver.observe(container);
    panelRefs.current.forEach((panel) => {
      if (panel) resizeObserver.observe(panel);
    });

    return () => resizeObserver.disconnect();
  }, [content.length]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (content.length < 2) return;

    const measuredPoints = activationPoints.current;
    const closestIndex = content.reduce((closest, _item, index) => {
      const currentPoint = measuredPoints[index] ?? (index + 0.5) / content.length;
      const closestPoint = measuredPoints[closest] ?? (closest + 0.5) / content.length;

      return Math.abs(latest - currentPoint) < Math.abs(latest - closestPoint)
        ? index
        : closest;
    }, 0);

    setActiveCard((current) => (current === closestIndex ? current : closestIndex));
  });

  if (content.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`relative grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-12 xl:gap-16 ${className}`}
    >
      <div className="min-w-0">
        {content.map((item, index) => (
          <article
            key={item.title}
            ref={(panel) => {
              panelRefs.current[index] = panel;
            }}
            className="flex min-h-[64svh] flex-col justify-center py-12"
            aria-current={index === activeCard ? "step" : undefined}
          >
            {item.eyebrow}
            <h3 className="font-heading mt-4 max-w-xl text-3xl leading-[1.04] font-bold tracking-[-0.045em] text-white xl:text-4xl">
              {item.titleContent ?? item.title}
            </h3>
            <p className="mt-4 max-w-xl text-[0.78rem] leading-6 text-zinc-400 xl:text-sm xl:leading-7">
              {item.descriptionContent ?? item.description}
            </p>
            {item.details}
          </article>
        ))}
      </div>

      <div className="relative min-w-0">
        <div className="sticky top-[16svh] flex h-[66svh] items-center">
          <div className="w-full">
            <div
              className="relative aspect-[16/10] w-full"
              aria-live="polite"
              aria-label={`Project preview: ${content[activeCard].title}`}
            >
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={content[activeCard].title}
                  className="absolute inset-0"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.985, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 1.012, y: -8 }}
                  transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  {content[activeCard].content}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex items-center justify-between" aria-label="Project preview progress">
              <span className="text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase">
                {`${String(activeCard + 1).padStart(2, "0")} / ${String(content.length).padStart(2, "0")}`}
              </span>
              <div className="flex items-center gap-2" aria-hidden="true">
                {content.map((item, index) => (
                  <span
                    key={item.title}
                    className={`h-1 rounded-full transition-[width,background-color] duration-500 ${
                      index === activeCard ? "w-10 bg-highlight" : "w-4 bg-white/12"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
