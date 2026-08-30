"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

// Lenis keeps native document scrolling, sticky sections, and anchor links working.
// Its built-in reduced-motion support disables smoothing when the user requests it.
export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        autoRaf: true,
        duration: 1.05,
        easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.05,
        wheelMultiplier: 0.86,
      }}
    >
      {children}
    </ReactLenis>
  );
}
