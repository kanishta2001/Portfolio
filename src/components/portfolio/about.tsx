import type { ReactNode } from "react";
import { profile } from "@/data/portfolio";
import { getSectionContentScaleStyle } from "@/lib/section-content-scale";
import { Reveal } from "./reveal";
import { Timeline } from "./timeline";

const highlightedTerms = [
  { value: "Nipun Karunarathna", className: "text-[1.05em] font-semibold" },
  { value: "NSBM Green University", className: "text-[1.05em] font-semibold" },
  {
    value: "React, Next.js, C#, .NET, and SQL Server",
    className: "text-[1.05em] font-semibold",
  },
] as const;

function renderHighlightedText(text: string) {
  const pattern = new RegExp(
    highlightedTerms
      .map(({ value }) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|"),
    "gi",
  );

  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(pattern)) {
    const [matchedText] = match;
    const index = match.index ?? 0;

    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index));
    }

    const term = highlightedTerms.find(
      ({ value }) => value.toLowerCase() === matchedText.toLowerCase(),
    );

    nodes.push(
      <span key={`${matchedText}-${index}`} className={term?.className ?? ""}>
        {matchedText}
      </span>,
    );

    lastIndex = index + matchedText.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function About() {
  return (
    <section
  id="about"
  className="scroll-mt-[-130px] py-12 sm:py-16 lg:py-24"
>
      <div
        className="section-content-scale"
        style={getSectionContentScaleStyle("about")}
      >
      <div className="site-container">
        <Reveal>
          
          <h2 className="font-heading mt-7 text-4xl leading-tight font-bold tracking-[-0.035em] text-white sm:text-5xl">
            About Me
          </h2>
          <div className="mt-6 h-px w-full bg-white/12" />
        </Reveal>

        <div className="mt-8 max-w-[70rem] space-y-7 sm:mt-10 sm:space-y-8">
          {profile.about.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * 0.055}>
              <p className="text-lg leading-[1.75] font-normal text-zinc-300 sm:text-xl lg:text-[1.3rem]">
                {renderHighlightedText(paragraph)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      <Timeline />
      </div>
    </section>
  );
}
