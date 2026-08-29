"use client";

import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { navigation } from "@/data/portfolio";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);
    let animationFrame: number | null = null;

    // A point slightly above the viewport centre decides which section is active.
    // This stays accurate for both normal sections and the tall sticky Projects section.
    const updateActiveSection = () => {
      const marker = window.scrollY + window.innerHeight * 0.42;
      let currentSection = sections[0]?.id ?? "home";

      for (const section of sections) {
        const sectionTop = window.scrollY + section.getBoundingClientRect().top;

        if (marker >= sectionTop) {
          currentSection = section.id;
        } else {
          break;
        }
      }

      setActiveSection((previous) => (previous === currentSection ? previous : currentSection));
    };

    const scheduleUpdate = () => {
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleNavigation = (href: string) => {
    setActiveSection(href.slice(1));
    setIsOpen(false);
  };

  return (
    <>
      <aside className="pointer-events-none fixed inset-y-0 left-0 z-50 hidden w-48 items-center px-7 lg:flex">
        <nav aria-label="Main navigation" className="pointer-events-auto flex flex-col items-start gap-8">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => handleNavigation(item.href)}
              aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
              className={`relative py-1 text-[0.8rem] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${
                activeSection === item.href.slice(1) ? "text-white" : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {item.label}
              {activeSection === item.href.slice(1) && (
                <motion.span
                  layoutId="active-navigation-underline"
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-0 h-px w-14 bg-highlight shadow-[0_0_10px_rgba(235,94,40,0.5)]"
                  transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.45 }}
                />
              )}
            </a>
          ))}
        </nav>
      </aside>

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 lg:hidden">
        <nav
          aria-label="Mobile navigation"
          className="mx-auto flex items-center justify-between rounded-2xl bg-background/90 px-5 py-3.5 shadow-[0_12px_40px_rgba(18,17,16,0.24)] backdrop-blur-xl"
        >
          <a
            href="#home"
            className="font-heading text-lg font-bold tracking-tight text-white"
            onClick={() => handleNavigation("#home")}
          >
            Nipun<span className="text-highlight">.</span>
          </a>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-xl text-white"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>

          {isOpen && (
            <div id="mobile-menu" className="glass-card absolute inset-x-4 top-[4.85rem] flex flex-col rounded-2xl p-3">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
                  className={`rounded-xl px-4 py-3 text-sm transition-colors ${
                    activeSection === item.href.slice(1)
                      ? "bg-highlight/12 text-highlight"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => handleNavigation(item.href)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
