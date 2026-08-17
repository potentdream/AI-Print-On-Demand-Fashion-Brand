import { AuntyMark } from "./aunty-mark";

/**
 * The verdict card — the brand's signature object (SPEC P6): a bureau
 * document with letterhead, case number, the ruling in Martel, a subject
 * line, and an inked stamp. Phase 1 uses it for landing samples; the same
 * anatomy becomes the share card and the intro verdict later.
 */

export type StampTone = "gold" | "rani" | "ok" | "danger";

const STAMP_TONE: Record<StampTone, string> = {
  gold: "text-gold-text",
  rani: "text-accent",
  ok: "text-ok",
  danger: "text-danger",
};

export function VerdictCard({
  caseNo,
  subject,
  line,
  stamp,
  stampTone = "gold",
  className = "",
}: {
  caseNo: string;
  subject: string;
  line: string;
  stamp: string;
  stampTone?: StampTone;
  className?: string;
}) {
  return (
    <article
      className={`relative rounded-card border-[1.5px] border-fg/30 bg-surface p-1 text-left shadow-sm ${className}`}
    >
      {/* the stamp, inked over the frame */}
      <span
        aria-hidden="true"
        className={`stamp stamp-label absolute -top-3 right-3 z-10 bg-surface text-[11px] ${STAMP_TONE[stampTone]}`}
      >
        {stamp}
      </span>

      <div className="flex h-full flex-col rounded-[calc(var(--radius-card)-6px)] border border-fg/20 px-4 pb-4 pt-3.5">
        <header className="flex items-center justify-between gap-2 border-b border-line pb-2.5">
          <span className="stamp-label text-[10px] text-muted">
            The Matchmaking Bureau
          </span>
          <span className="stamp-label text-[10px] text-muted">{caseNo}</span>
        </header>

        <p className="font-display flex-1 pt-4 pb-3 text-lg font-bold leading-relaxed">
          {line}
        </p>

        <p className="stamp-label pb-3 text-[10px] text-faint">{subject}</p>

        <footer className="flex items-center justify-between border-t border-line pt-2.5">
          <span className="text-xs text-muted">From the desk of Aunty</span>
          <AuntyMark mood="judging" size={22} className="text-fg/80" />
        </footer>
      </div>
      {/* screen-reader text for the decorative stamp */}
      <span className="sr-only">Stamped: {stamp}</span>
    </article>
  );
}
