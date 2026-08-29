import { Braces, Layers3, Sparkles } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const strengths = [
  {
    title: "Clean Interfaces",
    description: "Building readable, responsive UI with React and Tailwind CSS.",
    icon: Layers3,
  },
  {
    title: "Structured APIs",
    description: "Designing clear REST endpoints with ASP.NET Core and Entity Framework Core.",
    icon: Braces,
  },
  {
    title: "Always Learning",
    description: "Turning new concepts into small, practical software projects.",
    icon: Sparkles,
  },
] as const;

export function About() {
  return (
    <section id="about" className="py-28 sm:py-36">
      <div className="site-container">
        <Reveal>
          <SectionHeading eyebrow="About" title="About Me" />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="glass-card rounded-[1.75rem] p-7 sm:p-9">
            <p className="max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl sm:leading-9">
              {profile.bio}
            </p>
            <div className="mt-10 border-t border-white/10 pt-7">
              <p className="font-heading text-xl font-semibold text-white">What I care about</p>
              <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-500">
                Clear code, thoughtful user experiences, and steady improvement through building real things.
              </p>
            </div>
          </Reveal>

          <div className="space-y-4">
            {strengths.map((strength, index) => {
              const Icon = strength.icon;

              return (
                <Reveal key={strength.title} delay={index * 0.08}>
                  <article className="glass-card group flex items-start gap-4 rounded-3xl p-6 transition-transform hover:-translate-y-1">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-indigo-400 text-white shadow-[0_10px_30px_rgba(167,139,250,0.18)]">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-white">{strength.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">{strength.description}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
