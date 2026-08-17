import Link from "next/link";
import { AuntyMark } from "@/components/aunty-mark";
import { VerdictCard } from "@/components/verdict-card";
import { WaitlistForm } from "@/components/waitlist-form";

/** The marketing landing (SPEC 4.11) — the brand's public face. */

const SAMPLE_RULINGS = [
  {
    caseNo: "Case Nº 0041",
    subject: "Subject: A., 28 · Mumbai",
    line: "Six photos, five mirrors, zero hobbies. Even the mirror looks tired of you, beta.",
    stamp: "Needs supervision",
    stampTone: "rani",
  },
  {
    caseNo: "Case Nº 0117",
    subject: "Subject: S., 25 · Bengaluru",
    line: "“Just here for good vibes.” Vibes is not a plan, beta. Even Aunty's chai has more ingredients.",
    stamp: "Roasted with love",
    stampTone: "gold",
  },
  {
    caseNo: "Case Nº 0203",
    subject: "Subject: R., 30 · Delhi NCR",
    line: "Punctual. Employed. Calls his mother without being reminded. Aunty checked twice — this one I did not have to fix.",
    stamp: "Aunty approved",
    stampTone: "ok",
  },
] as const;

const PROCESS = [
  {
    step: "01",
    title: "The interview",
    body: "No blank bio boxes. Aunty asks, you answer, she writes it better — then roasts it, free of charge.",
  },
  {
    step: "02",
    title: "The screening",
    body: "Everyone verified, everyone vetted, everyone judged. Men enter by vouch — somebody must answer for you, beta.",
  },
  {
    step: "03",
    title: "The introduction",
    body: "At most three a day, each with her reasons attached. Both say yes, then you talk. No swiping. Ever.",
  },
] as const;

const HOUSE_RULES = [
  {
    title: "Ladies first. Always.",
    body: "Women's inboxes are protected — no floods, no strangers, finer controls. The queue answers to her.",
  },
  {
    title: "Faith is a preference, not a wall.",
    body: "Aunty never blocks a match on religion or stars. A kundli score is her spicy opinion — never a gate.",
  },
  {
    title: "Your secrets stay in the file.",
    body: "Birth details and community are encrypted, never sold, never fed to analytics. Nosy, yes. Leaky, never.",
  },
  {
    title: "18+, verified, no timepass.",
    body: "Photo verification, one-tap reporting, and consequences. Her queue, her rules.",
  },
] as const;

export default function Landing() {
  return (
    <main className="flex flex-1 flex-col items-center px-6">
      {/* hero ------------------------------------------------------------ */}
      <section className="flex min-h-[88dvh] w-full max-w-2xl flex-col items-center justify-center py-16 text-center">
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
          She screens everyone, roasts freely, and introduces you to at most
          three people a day — hand-picked, verified, and thoroughly judged. No
          swiping. No timepass.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4">
          <Link
            href="/login"
            className="rounded-ctl bg-accent px-8 py-3.5 text-lg font-semibold text-on-accent shadow-sm transition-transform active:scale-[0.97]"
          >
            Meet Aunty
          </Link>
          <a
            href="#waitlist"
            className="text-sm font-semibold text-muted underline decoration-line underline-offset-4 transition-colors hover:text-fg"
          >
            Not in her cities yet? Join the waitlist
          </a>
          <span className="stamp stamp-label mt-2 text-[11px] text-gold-text">
            Now screening · 18+ only
          </span>
        </div>
      </section>

      {/* process ---------------------------------------------------------- */}
      <section className="w-full max-w-4xl py-16">
        <h2 className="stamp-label text-center text-xs text-muted">
          Standard procedure
        </h2>
        <p className="font-display mt-2 text-center text-3xl font-black">
          How the Bureau works
        </p>

        <ol className="mt-10 grid gap-8 sm:grid-cols-3">
          {PROCESS.map((p) => (
            <li key={p.step} className="flex flex-col items-center text-center">
              <span className="stamp stamp-label text-sm text-accent">
                {p.step}
              </span>
              <h3 className="font-display mt-4 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* sample rulings --------------------------------------------------- */}
      <section className="w-full max-w-5xl py-16">
        <h2 className="stamp-label text-center text-xs text-muted">
          Public record
        </h2>
        <p className="font-display mt-2 text-center text-3xl font-black">
          Recent rulings
        </p>
        <p className="mt-3 text-center text-sm text-muted">
          Real format, sample subjects. Names sealed — obviously.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-5">
          {SAMPLE_RULINGS.map((r) => (
            <VerdictCard key={r.caseNo} {...r} />
          ))}
        </div>
      </section>

      {/* house rules ------------------------------------------------------ */}
      <section className="w-full max-w-4xl py-16">
        <div className="rounded-card bg-sunken px-6 py-10 sm:px-10">
          <h2 className="stamp-label text-center text-xs text-muted">
            Non-negotiable
          </h2>
          <p className="font-display mt-2 text-center text-3xl font-black">
            House rules
          </p>

          <dl className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {HOUSE_RULES.map((rule) => (
              <div key={rule.title}>
                <dt className="font-display text-base font-bold">
                  {rule.title}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted">
                  {rule.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* waitlist --------------------------------------------------------- */}
      <section
        id="waitlist"
        className="flex w-full max-w-2xl scroll-mt-8 flex-col items-center py-16 text-center"
      >
        <AuntyMark mood="delighted" size={72} className="text-fg" />
        <h2 className="font-display mt-5 text-3xl font-black">
          She&apos;s coming to your city.
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          One city at a time, done properly — Aunty doesn&apos;t do half jobs.
          Tell her where to open the next office.
        </p>
        <div className="mt-8 flex w-full justify-center">
          <WaitlistForm />
        </div>
      </section>

      {/* footer ----------------------------------------------------------- */}
      <footer className="flex w-full max-w-4xl flex-col items-center gap-2 border-t border-line py-10 text-center">
        <p className="text-xs text-faint">
          Made with love and judgment in India. 18+ only.
        </p>
        <p className="stamp-label text-[10px] text-faint">
          © 2026 The Matchmaking Bureau
        </p>
      </footer>
    </main>
  );
}
