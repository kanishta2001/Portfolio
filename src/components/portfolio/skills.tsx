import { Code2, Database, ServerCog, Wrench } from "lucide-react";
import { skillGroups } from "@/data/portfolio";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const skillIcons = [Code2, ServerCog, Database, Wrench];

export function Skills() {
  return (
    <section id="skills" className="py-28 sm:py-36">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            eyebrow="Skills"
            title="Tools I Work With"
            description="Technologies I use regularly and continue improving through practical projects."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, index) => {
            const Icon = skillIcons[index];

            return (
              <Reveal key={group.title} delay={index * 0.06}>
                <article className="glass-card h-full rounded-[1.6rem] p-6 transition-transform hover:-translate-y-1">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-violet-100">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading mt-6 text-xl font-semibold text-white">{group.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {group.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-3 text-sm text-zinc-400">
                        <span className="size-1.5 rounded-full bg-highlight/80" aria-hidden="true" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
