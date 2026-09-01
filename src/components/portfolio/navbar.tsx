"use client";

import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useState, type MouseEvent } from "react";
import { navigation } from "@/data/portfolio";
import { getSectionAdjustment, getSectionScrollTarget } from "@/lib/section-scroll";

export function Navbar() {
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileNavHidden, setIsMobileNavHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (isOpen || shouldReduceMotion) {
      setIsMobileNavHidden(false);
      return;
    }

    setIsMobileNavHidden(current > previous && current > 150);
  });

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

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const sectionId = href.slice(1);
    const section = document.getElementById(sectionId);

    // The shared adjustment is applied to both the Navbar and the magnet, so
    // clicks and manual scrolling stop at the same exact position.
    if (lenis && section) {
      event.preventDefault();
      // Stops the global `anchors: true` listener from starting a second
      // unadjusted scroll after this React Navbar handler.
      event.stopPropagation();
      window.dispatchEvent(new Event("portfolio:navigation-start"));
      const adjustment = getSectionAdjustment(sectionId);
      const sharedTarget = getSectionScrollTarget(section, adjustment);

      // The Navbar uses the same numeric position registered by the magnet.
      lenis.scrollTo(sharedTarget);
    }

    setActiveSection(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      <aside className="pointer-events-none fixed inset-y-0 left-0 z-50 hidden w-[7.5rem] items-center px-6 lg:flex">
        <nav aria-label="Main navigation" className="pointer-events-auto flex flex-col items-start gap-4">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleNavigation(event, item.href)}
              aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
              className={`group relative flex min-h-11 items-center text-[0.8rem] leading-5 font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${
                activeSection === item.href.slice(1) ? "text-white" : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute bottom-0 left-0 h-px w-full origin-left bg-highlight shadow-[0_0_10px_rgba(138,172,190,0.48)] transition-transform duration-300 ease-out ${
                  activeSection === item.href.slice(1)
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </a>
          ))}
        </nav>
      </aside>

      <motion.header
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-end px-4 pt-4 lg:hidden"
        animate={{
          y: isMobileNavHidden ? -96 : 0,
          opacity: isMobileNavHidden ? 0 : 1,
        }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
        }
      >
        <nav
          aria-label="Mobile navigation"
          className="pointer-events-auto relative flex items-center justify-end"
        >
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2.5 rounded-full border border-white/10 bg-[#08111b]/80 px-4 text-white shadow-[0_12px_32px_rgba(0,3,8,0.3)] backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-[#0d1622]/90"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((current) => !current)}
          >
            <span className="text-[0.67rem] font-semibold tracking-[0.18em] text-zinc-300 uppercase">
              {navigation.find((item) => item.href === `#${activeSection}`)?.label ?? "Menu"}
            </span>
            {isOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-menu"
                initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
                className="absolute top-[3.35rem] right-0 flex w-[min(18rem,calc(100vw-2rem))] origin-top-right flex-col rounded-2xl border border-white/10 bg-[#08111b]/92 p-2 shadow-[0_24px_64px_rgba(0,3,8,0.52)] backdrop-blur-2xl"
              >
                {navigation.map((item) => {
                  const isActive = activeSection === item.href.slice(1);

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`group flex min-h-11 items-center justify-between rounded-xl px-3.5 text-xs font-semibold tracking-[0.16em] uppercase transition-colors ${
                        isActive
                          ? "bg-white/[0.07] text-white"
                          : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100"
                      }`}
                      onClick={(event) => handleNavigation(event, item.href)}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`size-1.5 rounded-full transition-all duration-300 ${
                          isActive
                            ? "bg-highlight shadow-[0_0_10px_rgba(224,231,255,0.85)]"
                            : "bg-zinc-600 group-hover:bg-zinc-400"
                        }`}
                      />
                    </a>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  );
}
