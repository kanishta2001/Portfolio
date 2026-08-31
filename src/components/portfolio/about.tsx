import { profile } from "@/data/portfolio";
import { Reveal } from "./reveal";
import { Timeline } from "./timeline";

export function About() {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-24">
      <div className="site-container">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-[0.68rem] font-medium tracking-[0.24em] text-zinc-400 uppercase">
            <span className="size-1.5 rounded-full bg-highlight shadow-[0_0_10px_rgba(138,172,190,0.8)]" />
            About
          </div>
          <h2 className="font-heading mt-7 text-4xl leading-tight font-bold tracking-[-0.035em] text-white sm:text-5xl">
            About Me
          </h2>
          <div className="mt-6 h-px w-full bg-white/12" />
        </Reveal>

        <div className="mt-8 max-w-[70rem] space-y-7 sm:mt-10 sm:space-y-8">
          {profile.about.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * 0.055}>
              <p className="text-lg leading-[1.75] font-normal text-zinc-300 sm:text-xl lg:text-[1.3rem]">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      <Timeline />
    </section>
  );
}
