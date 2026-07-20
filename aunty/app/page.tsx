import Link from "next/link";
import { AuntyMark } from "@/components/aunty-mark";

/**
 * Phase 0 placeholder for the marketing landing page.
 * The full landing (sample roast cards, city waitlist) ships in Phase 1 — see
 * SPEC.md 4.11. This page exists so the deployed skeleton has a face.
 */
export default function Landing() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-14 text-center">
      <p className="stamp-label text-[11px] text-muted">
        The Matchmaking Bureau · Est. 2026
      </p>

      <h1 className="font-display mt-4 text-7xl font-black leading-none tracking-tight">
        Aunty<span className="text-accent">.</span>
      </h1>

      <AuntyMark mood="judging" size={104} className="mt-8 text-fg" />

      <p className="font-display mt-8 max-w-md text-2xl font-bold leading-snug">
        Your nosiest aunty. Minus the emotional damage.
      </p>
      <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
        She screens everyone, roasts freely, and introduces you to at most three
        people a day — hand-picked, verified, and thoroughly judged. No swiping.
        No timepass.
      </p>

      <div className="mt-9 flex flex-col items-center gap-4">
        <Link
          href="/login"
          className="rounded-ctl bg-accent px-8 py-3.5 text-lg font-semibold text-on-accent shadow-sm transition-transform active:scale-[0.97]"
        >
          Meet Aunty
        </Link>
        <span className="stamp stamp-label text-[11px] text-gold-text">
          Now screening · 18+ only
        </span>
      </div>

      <footer className="mt-16 text-xs text-faint">
        Made with love and judgment in India.
      </footer>
    </main>
  );
}
