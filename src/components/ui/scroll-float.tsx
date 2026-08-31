"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, type ReactNode, type RefObject } from "react";

type ScrollFloatProps = {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  splitBy?: "char" | "word";
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
};

/**
 * React Bits-inspired character reveal. A span is used instead of a fixed h2
 * so the effect can live inside semantic headings, paragraphs, tags, and links.
 */
export default function ScrollFloat({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  splitBy = "char",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03,
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const text = typeof children === "string" ? children : "";

  const splitText = useMemo(() => {
    if (!text) return null;

    // Long copy animates by word to keep the page light; display headings can
    // still opt into the original character-by-character React Bits motion.
    return text.split(" ").map((word, wordIndex, words) => {
      const content = splitBy === "word"
        ? <span className="scroll-float-char inline-block">{word}</span>
        : Array.from(word).map((character, characterIndex) => (
            <span
              className="scroll-float-char inline-block"
              key={`${character}-${characterIndex}`}
            >
              {character}
            </span>
          ));

      return (
        <span
          className="inline-block overflow-hidden align-bottom whitespace-nowrap"
          key={`${word}-${wordIndex}`}
        >
          {content}
          {wordIndex < words.length - 1 ? "\u00A0" : null}
        </span>
      );
    });
  }, [splitBy, text]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || !text) return;

    const characters = element.querySelectorAll<HTMLElement>(".scroll-float-char");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);

    // Hidden desktop/mobile duplicates do not need active scroll observers.
    if (reducedMotion || element.getClientRects().length === 0) {
      gsap.set(characters, { clearProps: "all", opacity: 1 });
      return;
    }

    const scroller = scrollContainerRef?.current ?? window;
    const context = gsap.context(() => {
      gsap.fromTo(
        characters,
        {
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: "50% 0%",
        },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          force3D: true,
          stagger,
          scrollTrigger: {
            trigger: element,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            // Play once at the same viewport point instead of scrubbing dozens
            // of text tweens on every scroll frame in the Projects section.
            toggleActions: "play none none none",
            once: true,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        },
      );
    }, element);

    return () => context.revert();
  }, [
    animationDuration,
    ease,
    scrollContainerRef,
    scrollEnd,
    scrollStart,
    splitBy,
    stagger,
    text,
  ]);

  if (!text) {
    return <span className={containerClassName}>{children}</span>;
  }

  return (
    <span
      ref={containerRef}
      className={`inline overflow-hidden ${containerClassName}`.trim()}
      aria-label={text}
    >
      <span className={`inline leading-[inherit] ${textClassName}`.trim()} aria-hidden="true">
        {splitText}
      </span>
    </span>
  );
}
