"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";

type VelocityMapping = {
  input: [number, number];
  output: [number, number];
};

type ScrollVelocityProps = {
  scrollContainerRef?: RefObject<HTMLElement | null>;
  texts: ReactNode[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: CSSProperties;
  scrollerStyle?: CSSProperties;
};

type VelocityTextProps = Omit<ScrollVelocityProps, "texts"> & {
  children: ReactNode;
  baseVelocity: number;
};

function useElementWidth<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateWidth = () => setWidth(element.getBoundingClientRect().width);
    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);
    updateWidth();

    return () => observer.disconnect();
  }, [ref]);

  return width;
}

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  if (range === 0) return value;
  return (((value - min) % range) + range) % range + min;
}

function VelocityText({
  children,
  baseVelocity,
  scrollContainerRef,
  className = "",
  damping = 30,
  stiffness = 300,
  numCopies = 5,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = "",
  scrollerClassName = "",
  parallaxStyle,
  scrollerStyle,
}: VelocityTextProps) {
  const reduceMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping, stiffness });
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping.input,
    velocityMapping.output,
    { clamp: false },
  );
  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);
  const x = useTransform(baseX, (value) => {
    if (copyWidth === 0) return "0px";
    return `${wrap(-copyWidth, 0, value)}px`;
  });
  const copies = useMemo(
    () => Array.from({ length: Math.max(2, numCopies) }, (_, index) => index),
    [numCopies],
  );

  useAnimationFrame((_time, delta) => {
    if (reduceMotion || copyWidth === 0) return;

    // Unlike an auto-marquee, movement is zero while the page is idle. The
    // spring lets the row coast briefly and stop naturally after a scroll.
    const scrollDrivenSpeed = velocityFactor.get();
    if (Math.abs(scrollDrivenSpeed) < 0.01) return;

    const moveBy = -baseVelocity * scrollDrivenSpeed * (delta / 1000) * 3;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className={`relative overflow-hidden ${parallaxClassName}`.trim()}
      style={parallaxStyle}
    >
      <motion.div
        className={`flex w-max whitespace-nowrap ${scrollerClassName}`.trim()}
        style={{ x: reduceMotion ? 0 : x, ...scrollerStyle }}
      >
        {copies.map((copyIndex) => (
          <span
            key={copyIndex}
            ref={copyIndex === 0 ? copyRef : undefined}
            className={`flex shrink-0 ${className}`.trim()}
            aria-hidden={copyIndex > 0}
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** React Bits ScrollVelocity adapted to pause completely between scrolls. */
export default function ScrollVelocity({
  texts = [],
  velocity = 10,
  ...props
}: ScrollVelocityProps) {
  return (
    <div>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          {...props}
          baseVelocity={index % 2 === 0 ? velocity : -velocity}
        >
          {text}
        </VelocityText>
      ))}
    </div>
  );
}
