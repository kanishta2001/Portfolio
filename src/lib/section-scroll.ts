// Navbar click සහ manual-scroll magnet දෙකම මේ එකම section positions භාවිතා කරයි.
// ඔබට position එක වෙනස් කිරීමට අවශ්‍ය නම් මෙහි `adjustment` value එක පමණක් වෙනස් කරන්න.
//
//   adjustment: 0    -> දැනට Navbar click කළ විට පෙනෙන position එක
//   adjustment: 40   -> section එක තව ඉහළට ගෙන එයි (page එක තව 40px scroll වේ)
//   adjustment: -40  -> section එක තව පහළින් පෙන්වයි (page එක 40px අඩුවෙන් scroll වේ)
export const sectionScrollStops = [
  { id: "home", adjustment: 0 },
  { id: "about", adjustment: 0 },
  { id: "projects", adjustment: 100 },
  { id: "skills", adjustment: 0 },
  { id: "contact", adjustment: 0 },
] as const;

export type SectionScrollId = (typeof sectionScrollStops)[number]["id"];

// Projects section එක ඇතුළේ project එකෙන් project එකට යන magnet positions.
// Array order එක portfolio data එකේ project order එකට සමානයි.
//
//   adjustment: 0    -> project text panel එක viewport center එකට align වේ
//   adjustment: 40   -> project content එක තව ඉහළට ගෙන එයි
//   adjustment: -40  -> project content එක තව පහළින් පෙන්වයි
//
// Example: දෙවැනි project එක තව 30px පහළින් පෙන්වීමට
// `{ project: 2, adjustment: -30 }` ලෙස වෙනස් කරන්න.
export const projectScrollStops = [
  { project: 1, adjustment: 30 },
  { project: 2, adjustment: 0 },
  { project: 3, adjustment: 0 },
  { project: 4, adjustment: 0 },
] as const;

// Section සහ project-step magnets දෙකේම sensitivity controls.
// මේ values වෙනස් කළත් Navbar click position වෙනස් නොවේ.
export const scrollMagnetSettings = {
  // වැඩි percentage එකක් = section එකට දුරින් සිටියත් magnet එක catch වේ.
  // Examples: "20%" soft, "32%" balanced, "42%" strong.
  // 60% වැනි ඉතා වැඩි value එකක් large wheel/trackpad input වලදී section skip කළ හැක.
  distanceThreshold: "42%" as const,
  // User scroll කිරීම නතර කළ පසු snap වීමට පෙර wait කරන milliseconds.
  debounce: 380,
  // Magnet එක stop position එකට යන animation duration එක seconds වලින්.
  duration: 0.5,
  // Projects Navbar/section target එකම first project entry view ලෙස භාවිතා කරයි.
  // `false` තැබීමෙන් first-project point එක section target එක සමඟ compete නොකරයි.
  // Project 2, 3, 4 magnets තවම ක්‍රියා කරයි.
  includeFirstProjectPoint: false,
  // Section target එකකට මේ pixel distance එකට වඩා ළඟ project target එකක්
  // තිබේ නම් section placement එකට priority දී project target එක ignore කරයි.
  // අඩු කළොත් project magnets section start එකට තව ළඟින් ක්‍රියා කරයි.
  minimumSectionGap: 140,
};

export function getSectionAdjustment(id: string) {
  return sectionScrollStops.find((section) => section.id === id)?.adjustment ?? 0;
}

export function getProjectAdjustment(index: number) {
  return projectScrollStops[index]?.adjustment ?? 0;
}

// Lenis Navbar anchor එක භාවිතා කරන calculation එකම magnet එකටත් ලබා දෙයි.
// CSS scroll-margin-top සහ global scroll-padding-top values ද මෙහි ගණනය වේ.
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

// Project panel එක viewport center එකට එන scroll position එක calculate කරයි.
export function getProjectScrollTarget(projectPanel: HTMLElement, adjustment = 0) {
  // Render වූ actual size එක භාවිතා කරන නිසා section content scale value එක
  // වෙනස් කළත් project magnet එක visual center එකටම align වේ.
  const panelRect = projectPanel.getBoundingClientRect();
  const panelCenter = window.scrollY + panelRect.top + panelRect.height / 2;
  const maximumScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const target = panelCenter - window.innerHeight / 2 + adjustment;

  return Math.min(maximumScroll, Math.max(0, target));
}
