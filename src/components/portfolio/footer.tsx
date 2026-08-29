import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-white/8 py-8">
      <div className="site-container flex flex-col gap-3 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p>Designed and built with care.</p>
      </div>
    </footer>
  );
}
