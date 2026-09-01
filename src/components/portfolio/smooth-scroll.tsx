"use client";

import LenisSnap from "lenis/snap";
import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import {
  getProjectAdjustment,
  getProjectScrollTarget,
  getSectionScrollTarget,
  scrollMagnetSettings,
  sectionScrollStops,
} from "@/lib/section-scroll";

type SmoothScrollProps = {
  children: ReactNode;
};

function SectionScrollMagnet() {
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!lenis || reduceMotion) return;

    // Proximity snapping only takes over when scrolling finishes close to one
    // of the preferred section views. Continued input remains free to scroll.
    const magnet = new LenisSnap(lenis, {
      type: "proximity",
      // Wait for a genuine pause before settling so trackpads and repeated
      // wheel input never fight the long sticky Projects section.
      distanceThreshold: scrollMagnetSettings.distanceThreshold,
      debounce: scrollMagnetSettings.debounce,
      duration: scrollMagnetSettings.duration,
      easing: (progress) => 1 - Math.pow(1 - progress, 4),
    });

    let removeMagnetPoints: Array<() => void> = [];
    let resizeFrame: number | null = null;

    // Section එකේ actual document position එක ගණනය කරලා custom snap point එකක්
    // add කරනවා. මේ නිසා offset values section-by-section වෙනස් කළ හැක.
    const registerMagnetPoints = () => {
      removeMagnetPoints.forEach((removePoint) => removePoint());
      removeMagnetPoints = [];

      for (const { id, adjustment } of sectionScrollStops) {
        const section = document.getElementById(id);
        if (!section) continue;

        // Navbar click කරන විට Lenis භාවිතා කරන target එකම මෙහි ගණනය වේ.
        const stopPosition = getSectionScrollTarget(section, adjustment);

        removeMagnetPoints.push(magnet.add(stopPosition));
      }

      // Responsive layout එකේ visible project panels පමණක් magnet points ලෙස add කරයි.
      // Desktop sticky projects සහ mobile stacked projects දෙකම මේ logic එක භාවිතා කරයි.
      const projectPanels = document.querySelectorAll<HTMLElement>("[data-project-magnet-index]");

      projectPanels.forEach((projectPanel) => {
        if (projectPanel.getClientRects().length === 0) return;

        const projectIndex = Number(projectPanel.dataset.projectMagnetIndex);
        if (!Number.isInteger(projectIndex)) return;

        const adjustment = getProjectAdjustment(projectIndex);
        const stopPosition = getProjectScrollTarget(projectPanel, adjustment);

        removeMagnetPoints.push(magnet.add(stopPosition));
      });
    };

    // Browser width වෙනස් වූ විට responsive layout එකේ section positions වෙනස්
    // විය හැකි නිසා snap points නැවත calculate කරනවා.
    const handleResize = () => {
      if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(registerMagnetPoints);
    };

    registerMagnetPoints();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame);
      removeMagnetPoints.forEach((removePoint) => removePoint());
      magnet.destroy();
    };
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
