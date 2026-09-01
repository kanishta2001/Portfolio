# Nipun Karunarathna — Developer Portfolio

මෙය Nipun Karunarathna සඳහා සාදන ලද single-page developer portfolio එකයි. Project එක `Next.js App Router`, `React`, `TypeScript`, `Tailwind CSS`, `Motion`, සහ `Lucide React` භාවිතා කරයි.

## Project එක run කිරීම

```bash
npm install
npm run dev
```

ඉන්පසු browser එකෙන් `http://localhost:3000` open කරන්න.

Production check සඳහා:

```bash
npm run lint
npm run build
```

## Content වෙනස් කරන ස්ථානය

Profile details, navigation, projects, timeline සහ skills සියල්ල `src/data/portfolio.ts` file එකේ තිබේ. සාමාන්‍ය content edit එකක් සඳහා components වෙනස් කිරීමට අවශ්‍ය නැහැ.

## ප්‍රධාන folders

- `src/app/` — App Router page, metadata සහ global styles
- `src/components/portfolio/` — portfolio sections සහ interactive components
- `src/data/portfolio.ts` — edit කිරීමට පහසු centralized content
- `public/projects/` — real project screenshots දමන ස්ථානය
- `public/images/` — වෙනත් portfolio images සඳහා
- `public/cv/` — CV PDF එක සඳහා

## Project screenshot එකක් එකතු කිරීම

1. Image එක `public/projects/` folder එකට දමන්න. උදාහරණය: `public/projects/teamfit.png`.
2. `src/data/portfolio.ts` හි අදාළ project object එකට පහත property එක දමන්න:

```ts
image: "/projects/teamfit.png",
```

Image එකක් නැති project card එක clean placeholder එකක් පෙන්වයි. Fake screenshots භාවිතා කරන්නේ නැහැ.

## CV එක එකතු කිරීම

CV file එක මේ exact path එකට දමන්න:

```text
public/cv/Nipun-Karunarathna-CV.pdf
```

Hero සහ Contact section වල Download CV buttons දෙකම එම path එක භාවිතා කරයි.

## Client Components භාවිතා කරන හේතුව

- `navbar.tsx` — mobile menu state එක සඳහා
- `reveal.tsx` — viewport reveal animations සඳහා
- `timeline.tsx` — scroll progress line සහ Motion hooks සඳහා

අනෙක් content sections Server Components ලෙස තබා ඇති නිසා browser එකට අවශ්‍ය නොවන JavaScript යැවීම අඩු වේ.
