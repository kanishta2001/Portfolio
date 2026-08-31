import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-white/8 py-8">
      <div className="site-container text-center text-sm text-zinc-500">
        <p>{profile.name}</p>
      </div>
    </footer>
  );
}
