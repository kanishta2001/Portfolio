import type { CSSProperties } from "react";

// එක් එක් section එකේ overall content size එක මෙතැනින් manual adjust කරන්න.
// Background සහ section scroll area වෙනස් නොකර inner content පමණක් scale වේ.
//
//   1     = original size (100%)
//   0.95  = 5% smaller
//   0.9   = 10% smaller
//   0.85  = 15% smaller
//
// ඉතා කුඩා value භාවිතා නොකර 0.85 - 1 range එක තුළ තබා ගැනීම recommended.
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
