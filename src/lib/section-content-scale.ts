import type { CSSProperties } from "react";

// Manually adjust the overall content size for each section here.
// Only the inner content is scaled; the background and section scroll area stay unchanged.
//
//   1     = original size (100%)
//   0.95  = 5% smaller
//   0.9   = 10% smaller
//   0.85  = 15% smaller
//
// Keep values in the 0.85 - 1 range to avoid making the layout too small.
export const sectionContentScales = {
  home: 1,
  about: 1,
  projects: 1,
  skills: 0.85,
  contact: 1,
} as const;

export type ScalableSection = keyof typeof sectionContentScales;

export function getSectionContentScaleStyle(section: ScalableSection) {
  return {
    "--section-content-scale": sectionContentScales[section],
  } as CSSProperties;
}
