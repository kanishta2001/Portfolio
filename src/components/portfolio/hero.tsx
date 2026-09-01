"use client";

import { ArrowDown, Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { profile } from "@/data/portfolio";
import { RotatingText } from "./hero-effects/rotating-text";
import { SpecularButton } from "./hero-effects/specular-button";
import { StrokeText } from "./hero-effects/stroke-text";

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "C#",
  "ASP.NET Core",
  "SQL Server",
] as const;

const supportingReveal = {
  hidden: { opacity: 0, y: 16, filter: "blur(7px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="hero-section relative isolate flex min-h-[80svh] items-center overflow-hidden px-0 pt-20 pb-12 lg:h-svh lg:min-h-0 lg:py-0"
    >
      <div className="relative z-10 flex w-full items-center justify-center px-5 sm:px-8 lg:px-6">
        <motion.div
          className="mx-auto flex w-full max-w-[78rem] flex-col items-center text-center"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            visible: {
              transition: {
                delayChildren: 0.12,
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.p
            variants={supportingReveal}
            className="mb-4 text-xs font-medium tracking-[0.2em] text-zinc-300 uppercase lg:text-base"
          >
            Hello, this is
          </motion.p>

          <h1 aria-label={profile.name} className="hero-name mb-6 w-full">
            <StrokeText
              text={profile.name}
              strokeColor="#69627b"
              fillColor="#F8FAFC"
              strokeWidth={1.4}
              drawDuration={1.5}
              fillDelay={0.2}
              stagger={0.05}
              ease="power2.out"
              trigger="mount"
              fillMode="wipe"
              fontSize={128}
              fontWeight={800}
              letterSpacing={-4}
              reverse
            />
          </h1>

          <motion.div
            variants={supportingReveal}
            className="mb-12 flex max-w-4xl flex-col items-center justify-center gap-3 font-heading text-base font-normal text-zinc-200 sm:flex-row sm:text-xl lg:text-2xl"
          >
            <span className="leading-relaxed">
              Full-Stack Software Engineer Crafting with
              <span className="sr-only"> React, Next.js, TypeScript, C#, ASP.NET Core, and SQL Server</span>
            </span>
            <RotatingText texts={technologies} className="min-w-[10.5rem]" />
          </motion.div>

          <motion.div
            variants={supportingReveal}
            className="flex w-full flex-col items-center justify-center gap-3 min-[430px]:flex-row min-[430px]:gap-6"
          >
            <SpecularButton
              href="#projects"
              baseColor="transparent"
              lineColor="#E0E7FF"
              textColor="#E0E7FF"
              className="hero-specular-button w-full min-[430px]:w-auto"
            >
              View Work
            </SpecularButton>
            <SpecularButton
              href={profile.cv}
              download
              baseColor="transparent"
              lineColor="#E0E7FF"
              textColor="#E0E7FF"
              className="hero-specular-button w-full min-[430px]:w-auto"
            >
              Download CV
            </SpecularButton>
          </motion.div>

          <motion.nav
            variants={supportingReveal}
            className="mt-7 flex items-center justify-center gap-6 lg:fixed lg:inset-y-0 lg:right-0 lg:z-40 lg:mt-0 lg:w-[7.5rem] lg:flex-col lg:items-end lg:justify-center lg:gap-6 lg:pr-8"
            aria-label="Social and contact links"
          >
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hero-social-link"
              aria-label="Visit Nipun's LinkedIn profile"
              title="LinkedIn"
            >
              <FiLinkedin size={20} aria-hidden="true" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="hero-social-link"
              aria-label="Visit Nipun's GitHub profile"
              title="GitHub"
            >
              <FiGithub size={20} aria-hidden="true" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="hero-social-link"
              aria-label="Email Nipun Karunarathna"
              title="Email"
            >
              <Mail size={20} strokeWidth={1.7} aria-hidden="true" />
            </a>
          </motion.nav>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to the About section"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-xs font-medium tracking-[0.3em] text-zinc-400 uppercase transition-colors hover:text-white md:flex"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.15 }}
      >
        Scroll
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}
