# Nipun Karunarathna — Developer Portfolio

This is a single-page developer portfolio built for Nipun Karunarathna. The project uses `Next.js App Router`, `React`, `TypeScript`, `Tailwind CSS`, `Motion`, and `Lucide React`.

## Running the project

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

For a production check:

```bash
npm run lint
npm run build
```

## Where to edit content

Profile details, navigation, projects, timeline, and skills are all stored in `src/data/portfolio.ts`. For normal content edits, you usually do not need to change the components.

## Main folders

- `src/app/` — App Router page, metadata, and global styles
- `src/components/portfolio/` — portfolio sections and interactive components
- `src/data/portfolio.ts` — centralized content that is easy to edit
- `public/projects/` — place for real project screenshots
- `public/images/` — place for other portfolio images
- `public/cv/` — place for the CV PDF

## Adding a project screenshot

1. Place the image inside the `public/projects/` folder. Example: `public/projects/teamfit.png`.
2. Add the following property to the relevant project object in `src/data/portfolio.ts`:

```ts
image: "/projects/teamfit.png",
```

If a project does not have an image, the project card shows a clean placeholder. Fake screenshots are not used.

## Adding the CV

Place the CV file at this exact path:

```text
public/cv/Nipun-Karunarathna-CV.pdf
```

The Download CV buttons in the Hero and Contact sections both use that path.

## Why Client Components are used

- `navbar.tsx` — for mobile menu state
- `reveal.tsx` — for viewport reveal animations
- `timeline.tsx` — for the scroll progress line and Motion hooks

The other content sections are kept as Server Components, which reduces the amount of unnecessary JavaScript sent to the browser.
