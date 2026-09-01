"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { projects, type Project } from "@/data/portfolio";
import { getSectionContentScaleStyle } from "@/lib/section-content-scale";
import { Iphone16Pro } from "@/components/ui/iphone-16-pro";
import { MacbookPro } from "@/components/ui/macbook-pro";
import { StickyScroll, type StickyScrollItem } from "@/components/ui/sticky-scroll-reveal";
import TiltedCard from "@/components/ui/tilted-card";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type ProjectVisualProps = {
  project: Project;
  compact?: boolean;
};

function ProjectDevice({ project }: { project: Project }) {
  const isMobileProject = project.title === "LK_TRAVELMATE";

  if (isMobileProject) {
    return (
      <Iphone16Pro
        src={project.image}
        aria-hidden="true"
        // 96% × 1.15 = 110.4%. මේ value එකෙන් phone preview size එක පමණක් manual ලෙස වෙනස් කළ හැක.
        className="h-[130.4%] w-auto max-w-full text-[#07101a] drop-shadow-[0_28px_35px_rgba(0,0,0,0.55)]"
      />
    );
  }

  return (
    <MacbookPro
      src={project.image}
      aria-hidden="true"
      className="h-auto max-h-full w-[98%] max-w-full text-[#07101a] drop-shadow-[0_28px_35px_rgba(0,0,0,0.48)]"
    />
  );
}

function ProjectPreview({ project, compact = false }: ProjectVisualProps) {
  return (
    <div
      role="img"
      aria-label={`${project.title} project screenshot displayed on a ${project.title === "LK_TRAVELMATE" ? "phone" : "laptop"}`}
      className="aspect-[16/10] w-full"
    >
      <TiltedCard
        className="group/device"
        containerHeight="100%"
        containerWidth="100%"
        imageHeight="100%"
        imageWidth="100%"
        rotateAmplitude={compact ? 4 : 6}
        scaleOnHover={compact ? 1.015 : 1.025}
        showMobileWarning={false}
        showTooltip={false}
      >
        <div className="relative flex h-full w-full items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute inset-x-[12%] bottom-[5%] h-[28%] rounded-full bg-highlight/10 opacity-60 blur-3xl transition-opacity duration-500 group-hover/device:opacity-100"
          />
          <ProjectDevice project={project} />
        </div>
      </TiltedCard>
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.githubUrl && !project.liveUrl) {
    return (
      <p className="text-[0.65rem] tracking-[0.16em] text-zinc-600 uppercase">
        Links will be added when available
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="premium-button group inline-flex min-h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-4 text-xs font-medium text-zinc-200 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-highlight/40 hover:bg-highlight/10 hover:text-white"
        >
          <FiGithub size={16} aria-hidden="true" />
          Repository
          <ArrowUpRight className="button-arrow" size={14} aria-hidden="true" />
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="premium-button group inline-flex min-h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-4 text-xs font-medium text-zinc-200 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-highlight/40 hover:bg-highlight/10 hover:text-white"
        >
          <ExternalLink className="button-arrow" size={16} aria-hidden="true" />
          Live Demo
        </a>
      )}
    </div>
  );
}

export function Projects() {
  const stickyContent: StickyScrollItem[] = projects.map((project, index) => ({
    title: project.title,
    description: project.description,
    eyebrow: (
      <div className="flex items-center justify-between text-[0.65rem] tracking-[0.18em] text-zinc-500 uppercase">
        <span>{`[ ${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")} ]`}</span>
        {project.status && (
          <span className="text-highlight">{project.status}</span>
        )}
      </div>
    ),
    details: (
      <>
        <p className="mt-2.5 text-[0.58rem] tracking-[0.19em] text-highlight uppercase">
          {project.category}
        </p>
        <p className="mt-4 text-sm font-medium text-zinc-300">
          {project.subtitle}
        </p>
        <ul className="mt-6 flex max-w-xl flex-wrap gap-2" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => (
            <li key={technology} className="rounded-full border border-white/10 px-3 py-1 text-[0.58rem] text-zinc-400">
              {technology}
            </li>
          ))}
        </ul>
        <div className="mt-7">
          <ProjectLinks project={project} />
        </div>
      </>
    ),
    content: <ProjectPreview project={project} />,
  }));

  return (
    <section id="projects" className="relative scroll-mt-[20px]">
      <div
        className="section-content-scale"
        style={getSectionContentScaleStyle("projects")}
      >
      <div className="site-container py-10 sm:py-14 lg:hidden">
        <div className="mx-auto w-[85%]">
        <SectionHeading
          title="Selected Projects"
          size="compact"
        />

        <div className="mt-12 space-y-14">
          {projects.map((project, index) => (
            <Reveal key={project.title}>
              <article data-project-magnet-index={index === 0 ? undefined : index}>
                <div className="mb-4 flex items-center justify-between text-[0.65rem] tracking-[0.18em] text-zinc-500 uppercase">
                  <span>{`[ ${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")} ]`}</span>
                  {project.status && <span className="text-highlight">{project.status}</span>}
                </div>
                <ProjectPreview project={project} compact />
                <p className="mt-5 text-[0.65rem] tracking-[0.16em] text-highlight uppercase">{project.category}</p>
                <h3 className="font-heading mt-2.5 text-2xl font-bold tracking-tight text-white">{project.title}</h3>
                <p className="mt-2 text-xs font-medium text-zinc-300">{project.subtitle}</p>
                <p className="mt-3.5 text-xs leading-6 text-zinc-400">{project.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                  {project.technologies.map((technology) => (
                    <li key={technology} className="rounded-full border border-white/10 px-2.5 py-1 text-[0.58rem] text-zinc-400">
                      {technology}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <ProjectLinks project={project} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        </div>
      </div>

      <div className="site-container hidden max-w-[63rem] py-20 lg:block">
        <SectionHeading
          title="Selected Projects"
          size="compact"
        />
        <StickyScroll content={stickyContent} className="mt-8" />
      </div>
      </div>
    </section>
  );
}
