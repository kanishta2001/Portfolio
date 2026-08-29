"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/data/portfolio";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:pt-5">
      <nav
        aria-label="Main navigation"
        className="glass-card mx-auto flex max-w-[74rem] items-center justify-between rounded-2xl px-5 py-3.5 sm:px-6"
      >
        <a
          href="#home"
          className="font-heading text-lg font-bold tracking-tight text-white"
          onClick={() => setIsOpen(false)}
        >
          Nipun<span className="text-highlight">.</span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full bg-gradient-to-r from-primary to-indigo-400 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(167,139,250,0.2)] transition-transform hover:-translate-y-0.5 lg:inline-flex"
        >
          Hire Me
        </a>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 text-white lg:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>

        {isOpen && (
          <div
            id="mobile-menu"
            className="glass-card absolute inset-x-4 top-[4.85rem] flex flex-col rounded-2xl p-3 lg:hidden"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
