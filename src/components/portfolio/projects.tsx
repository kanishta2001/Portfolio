import { ArrowUpRight, Code2, ExternalLink } from "lucide-react";
import Image from "next/image";
import { projects } from "@/data/portfolio";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const projectMarks = ["TF", "LK", "SM", "AM"];

export function Projects() {
  return (
    <section id="projects" className="py-28 sm:py-36">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title="Things I’ve Been Building"
            description="A selection of full-stack, mobile, and academic projects that reflect how I learn by building."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={(index % 2) * 0.08}>
              <article className="glass-card group flex h-full flex-col overflow-hidden rounded-[1.75rem] transition-transform duration-300 hover:-translate-y-1.5">
                {project.image ? (
                  <div className="relative m-4 min-h-60 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0b0c1a]">
                    <Image
                      src={project.image}
                      alt={`${project.title} project screenshot`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                ) : (
                  <div
                    role="img"
                    aria-label={`${project.title} project image placeholder`}
                    className="relative m-4 min-h-60 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0b0c1a] p-6"
                  >
                    <div aria-hidden="true" className="absolute -top-20 -right-16 size-56 rounded-full bg-primary/35 blur-[70px]" />
                    <div aria-hidden="true" className="absolute -bottom-24 -left-16 size-56 rounded-full bg-secondary/25 blur-[70px]" />
                    <div className="relative flex h-full min-h-48 flex-col justify-between">
                      <div className="flex items-center justify-between text-[0.65rem] tracking-[0.18em] text-zinc-600 uppercase">
                        <span>{project.category}</span>
                        <Code2 size={17} className="text-highlight" aria-hidden="true" />
                      </div>
                      <div className="flex items-end justify-between gap-4">
                        <span className="font-heading text-7xl font-bold tracking-[-0.08em] text-white/10 sm:text-8xl">
                          {projectMarks[index]}
                        </span>
                        <div className="mb-2 grid w-28 grid-cols-3 gap-2" aria-hidden="true">
                          {Array.from({ length: 6 }).map((_, cellIndex) => (
                            <span
                              key={cellIndex}
                              className={`h-2 rounded-full ${cellIndex === 1 || cellIndex === 3 ? "bg-highlight/70" : "bg-white/10"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-1 flex-col px-6 pt-2 pb-7 sm:px-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs font-medium tracking-[0.16em] text-highlight uppercase">{project.category}</p>
                    {project.status && (
                      <span className="rounded-full border border-highlight/25 bg-highlight/10 px-3 py-1 text-[0.7rem] font-medium text-violet-200">
                        {project.status}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading mt-5 text-2xl font-semibold tracking-tight text-white">{project.title}</h3>
                  <p className="mt-2 text-sm font-medium text-zinc-300">{project.subtitle}</p>
                  <p className="mt-4 text-sm leading-6 text-zinc-500">{project.description}</p>

                  <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                    {project.technologies.map((technology) => (
                      <li key={technology} className="rounded-lg border border-white/8 bg-white/[0.025] px-3 py-1.5 text-[0.7rem] text-zinc-400">
                        {technology}
                      </li>
                    ))}
                  </ul>

                  {(project.githubUrl || project.liveUrl) && (
                    <div className="mt-auto flex flex-wrap gap-3 pt-7">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
                        >
                          Repository <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
                        >
                          Live Demo <ExternalLink size={15} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
