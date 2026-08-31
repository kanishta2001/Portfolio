"use client";

import LenisSnap from "lenis/snap";
import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useEffect } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

const magnetSectionIds = ["about", "projects", "skills"] as const;

function SectionScrollMagnet() {
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!lenis || reduceMotion) return;

    const sections = magnetSectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    // Proximity snapping only takes over when scrolling finishes close to one
    // of the preferred section views. Continued input remains free to scroll.
    const magnet = new LenisSnap(lenis, {
      type: "proximity",
      // Wait for a genuine pause before settling so trackpads and repeated
      // wheel input never fight the long sticky Projects section.
      distanceThreshold: "16%",
      debounce: 460,
      duration: 0.52,
      easing: (progress) => 1 - Math.pow(1 - progress, 4),
    });

    magnet.addElements(sections, { align: "start" });

    return () => magnet.destroy();
  }, [lenis, reduceMotion]);

  return null;
}

// Lenis keeps native document scrolling, sticky sections, and anchor links working.
// Its built-in reduced-motion support disables smoothing when the user requests it.
export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        autoRaf: true,
        // A short lerp keeps the premium inertia without making long sticky
        // sections feel as though the wheel input is being held back.
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.05,
        wheelMultiplier: 1,
      }}
    >
      <SectionScrollMagnet />
      {children}
    </ReactLenis>
  );
}
