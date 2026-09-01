// Navbar clicks and the manual-scroll magnet both use these same section positions.
// To change a stop position, edit only the `adjustment` value here.
//
//   adjustment: 0    -> the current position shown after a Navbar click
//   adjustment: 40   -> moves the section higher (the page scrolls 40px more)
//   adjustment: -40  -> shows the section lower (the page scrolls 40px less)
export const sectionScrollStops = [
  { id: "home", adjustment: 0 },
  { id: "about", adjustment: 0 },
  { id: "projects", adjustment: 100 },
  { id: "skills", adjustment: 0 },
  { id: "contact", adjustment: 0 },
] as const;

export type SectionScrollId = (typeof sectionScrollStops)[number]["id"];

// Magnet positions for moving from one project to the next inside the Projects section.
// The array order matches the project order in the portfolio data.
//
//   adjustment: 0    -> aligns the project text panel to the viewport center
//   adjustment: 40   -> moves the project content higher
//   adjustment: -40  -> shows the project content lower
//
// Example: to show the second project 30px lower,
// change it to `{ project: 2, adjustment: -30 }`.
export const projectScrollStops = [
  { project: 1, adjustment: 30 },
  { project: 2, adjustment: 0 },
  { project: 3, adjustment: 0 },
  { project: 4, adjustment: 0 },
] as const;

// Sensitivity controls for both section and project-step magnets.
// Changing these values does not change the Navbar click positions.
export const scrollMagnetSettings = {
  // A higher percentage lets the magnet catch even when farther from a section.
  // Examples: "20%" soft, "32%" balanced, "42%" strong.
  // Very high values like 60% may skip sections with large wheel or trackpad input.
  distanceThreshold: "42%" as const,
  // Milliseconds to wait after the user stops scrolling before snapping.
  debounce: 380,
  // Animation duration, in seconds, for moving to the magnet stop position.
  duration: 0.5,
  // The Projects Navbar/section target is also used as the first project entry view.
  // Setting this to `false` keeps the first-project point from competing with the section target.
  // Project 2, 3, and 4 magnets still work.
  includeFirstProjectPoint: false,
  // If a project target is closer than this pixel distance to a section target,
  // the section placement gets priority and the project target is ignored.
  // Lowering this lets project magnets activate closer to the section start.
  minimumSectionGap: 140,
};

export function getSectionAdjustment(id: string) {
  return sectionScrollStops.find((section) => section.id === id)?.adjustment ?? 0;
}

export function getProjectAdjustment(index: number) {
  return projectScrollStops[index]?.adjustment ?? 0;
}

// Gives the magnet the same calculation used by the Lenis Navbar anchor.
// CSS scroll-margin-top and global scroll-padding-top are included here.
export function getSectionScrollTarget(section: HTMLElement, adjustment = 0) {
  const sectionTop = window.scrollY + section.getBoundingClientRect().top;
  const sectionStyle = window.getComputedStyle(section);
  const rootStyle = window.getComputedStyle(document.documentElement);
  const scrollMarginTop = Number.parseFloat(sectionStyle.scrollMarginTop) || 0;
  const scrollPaddingTop = Number.parseFloat(rootStyle.scrollPaddingTop) || 0;
  const maximumScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const target = sectionTop - scrollMarginTop - scrollPaddingTop + adjustment;

  return Math.min(maximumScroll, Math.max(0, target));
}

// Calculates the scroll position that brings a project panel to the viewport center.
export function getProjectScrollTarget(projectPanel: HTMLElement, adjustment = 0) {
  // Uses the actual rendered size, so the project magnet still aligns to the
  // visual center even when the section content scale value changes.
  const panelRect = projectPanel.getBoundingClientRect();
  const panelCenter = window.scrollY + panelRect.top + panelRect.height / 2;
  const maximumScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const target = panelCenter - window.innerHeight / 2 + adjustment;

  return Math.min(maximumScroll, Math.max(0, target));
}
