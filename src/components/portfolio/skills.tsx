"use client";

import { motion, useReducedMotion } from "motion/react";
import type { IconType } from "react-icons";
import { BsDatabaseGear } from "react-icons/bs";
import { DiMsqlServer } from "react-icons/di";
import { FiPenTool } from "react-icons/fi";
import {
  SiAndroidstudio,
  SiDart,
  SiDotnet,
  SiFigma,
  SiFlutter,
  SiGit,
  SiGithub,
  SiIntellijidea,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";
import ScrollVelocity from "@/components/ui/scroll-velocity";
import { skillGroups } from "@/data/portfolio";
import { getSectionContentScaleStyle } from "@/lib/section-content-scale";
import { SectionHeading } from "./section-heading";

type SkillGroup = (typeof skillGroups)[number];

// All skills are rendered through the same react-icons component system.
// This mapping keeps every logo at the same size, color, and alignment.
// Canva does not have an official brand icon in the installed icon set, so a
// generic design-tool icon is used.
const skillIconComponents: Record<string, IconType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "C#": TbBrandCSharp,
  ".NET": SiDotnet,
  "ASP.NET Core Web API": SiDotnet,
  "SQL Server": DiMsqlServer,
  "Entity Framework Core": BsDatabaseGear,
  "Node.js": SiNodedotjs,
  Flutter: SiFlutter,
  Dart: SiDart,
  "Android Studio": SiAndroidstudio,
  Git: SiGit,
  GitHub: SiGithub,
  "VS Code": VscVscode,
  Swagger: SiSwagger,
  Postman: SiPostman,
  "IntelliJ IDEA": SiIntellijidea,
  Figma: SiFigma,
  Canva: FiPenTool,
};

function SkillLogoStrip({ group }: { group: SkillGroup }) {
  return (
    <span className="skill-velocity-strip">
      {group.skills.map((skill) => {
        const SkillIcon = skillIconComponents[skill.name] ?? FiPenTool;

        return (
          <span key={skill.name} className="skill-velocity-item">
            <SkillIcon aria-hidden="true" />
            <span>{skill.name}</span>
          </span>
        );
      })}
    </span>
  );
}

function SkillVelocityRow({ group, index }: { group: SkillGroup; index: number }) {
  return (
    <div role="region" aria-label={`${group.title} technologies`}>
      <ScrollVelocity
        texts={[<SkillLogoStrip key={group.title} group={group} />]}
        velocity={index % 2 === 0 ? 10 : -10}
        damping={30}
        stiffness={300}
        numCopies={5}
        velocityMapping={{ input: [0, 1000], output: [0, 5] }}
        dragToScroll
        dragSensitivity={1}
        parallaxClassName="skill-velocity-mask py-2"
      />
    </div>
  );
}

export function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" className="relative scroll-mt-[-180px] overflow-hidden py-2 sm:py-2 lg:py-30">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 h-80 w-[70%] -translate-x-1/2 -translate-y-1/2 bg-primary/8 blur-[120px]"
      />

      <div
        className="section-content-scale site-container relative max-w-[70.3rem]"
        style={getSectionContentScaleStyle("skills")}
      >
        <SectionHeading
          title="Tools I Work With"
          description="Languages, technologies, and tools I use to build clean interfaces, structured APIs, and dependable full-stack applications."
          size="slightlyCompact"
        />

        <div className="mt-5 space-y-4 sm:mt-2 sm:space-y-2">
          {skillGroups.map((group, index) => (
            <motion.article
              key={group.title}
              className="grid min-w-0 items-center gap-4 lg:grid-cols-[13.3rem_minmax(0,1fr)] lg:gap-2"
              initial={reduceMotion ? false : { opacity: 0, y: 26, filter: "blur(6px)" }}
              whileInView={
                reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.58,
                delay: index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex items-start gap-2 lg:block">
                <span className="font-mono text-[0.71rem] text-highlight/75">0{index + 1}</span>
                <div className="lg:mt-2.5">
                  <h3 className="font-heading text-[1.2rem] font-semibold text-white sm:text-[1.425rem]">
                    {group.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-[0.83rem] leading-[1.425rem] text-zinc-500">
                    {group.description}
                  </p>
                </div>
              </div>

              <div className="relative min-w-0 overflow-hidden py-2">
                <SkillVelocityRow group={group} index={index} />
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
