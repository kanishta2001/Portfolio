"use client";

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

    let magnetTimer: number | null = null;

    // IMPORTANT: targets are not cached on startup; they are calculated at
    // snap time so the Navbar and manual magnet stay in sync after layout changes.
    const getLiveMagnetPoints = () => {
      const magnetPoints: number[] = [];
      const sectionStopPositions: number[] = [];

      for (const { id, adjustment } of sectionScrollStops) {
        const section = document.getElementById(id);
        if (!section) continue;

        // This calculates the same target Lenis uses when the Navbar is clicked.
        const stopPosition = getSectionScrollTarget(section, adjustment);

        sectionStopPositions.push(stopPosition);
        magnetPoints.push(stopPosition);
      }

      // Only visible project panels in the responsive layout become magnet points.
      // This covers both desktop sticky projects and mobile stacked projects.
      const projectPanels = document.querySelectorAll<HTMLElement>("[data-project-magnet-index]");

      projectPanels.forEach((projectPanel) => {
        if (projectPanel.getClientRects().length === 0) return;

        const projectIndex = Number(projectPanel.dataset.projectMagnetIndex);
        if (!Number.isInteger(projectIndex)) return;
        if (projectIndex === 0 && !scrollMagnetSettings.includeFirstProjectPoint) return;

        const adjustment = getProjectAdjustment(projectIndex);
        const stopPosition = getProjectScrollTarget(projectPanel, adjustment);

        // If the Projects section entry point is very close to the Navbar target,
        // give section placement priority instead of adding a competing project snap.
        const competesWithSection = sectionStopPositions.some(
          (sectionPosition) =>
            Math.abs(stopPosition - sectionPosition) < scrollMagnetSettings.minimumSectionGap,
        );
        if (competesWithSection) return;

        magnetPoints.push(stopPosition);
      });

      return magnetPoints.sort((first, second) => first - second);
    };

    const getDistanceThreshold = (): number => {
      const threshold = scrollMagnetSettings.distanceThreshold;

      if (typeof threshold === "string" && threshold.endsWith("%")) {
        return (Number.parseFloat(threshold) / 100) * window.innerHeight;
      }

      return Number(threshold);
    };

    const settleAtNearestPoint = () => {
      const points = getLiveMagnetPoints();
      if (points.length === 0) return;

      // targetScroll compares against the position where Lenis inertia is going
      // to settle, avoiding drift from comparing the animated current frame.
      const intendedScroll = lenis.targetScroll;
      const nearestPoint = points.reduce((nearest, point) =>
        Math.abs(point - intendedScroll) < Math.abs(nearest - intendedScroll) ? point : nearest,
      );

      const distance = Math.abs(nearestPoint - intendedScroll);
      if (distance > getDistanceThreshold() || distance < 0.5) return;

      lenis.scrollTo(nearestPoint, {
        duration: scrollMagnetSettings.duration,
        easing: (progress) => 1 - Math.pow(1 - progress, 4),
        userData: { initiator: "portfolio-magnet" },
      });
    };

    const cancelPendingMagnet = () => {
      if (magnetTimer === null) return;
      window.clearTimeout(magnetTimer);
      magnetTimer = null;
    };

    const removeVirtualScrollListener = lenis.on("virtual-scroll", ({ event }) => {
      if (event.type === "touchmove") return;

      cancelPendingMagnet();
      magnetTimer = window.setTimeout(() => {
        magnetTimer = null;
        settleAtNearestPoint();
      }, scrollMagnetSettings.debounce);
    });

    // Cancel any pending manual snap before a Navbar click starts.
    window.addEventListener("portfolio:navigation-start", cancelPendingMagnet);

    return () => {
      cancelPendingMagnet();
      removeVirtualScrollListener();
      window.removeEventListener("portfolio:navigation-start", cancelPendingMagnet);
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
