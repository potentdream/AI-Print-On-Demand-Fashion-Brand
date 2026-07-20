export type AuntyMood = "judging" | "delighted" | "unimpressed";

/**
 * The Aunty mark: hair bun, big glasses, bindi, and an expression.
 * Draws in currentColor so it adapts to theme; bindi is always rani,
 * glasses always turmeric — her two constants.
 */
export function AuntyMark({
  mood = "judging",
  size = 64,
  className,
  title = "Aunty",
}: {
  mood?: AuntyMood;
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 96 96"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
    >
      {/* hair: swept crown + side bun */}
      <path
        d="M22 46 C20 24 36 14 50 14 C66 14 78 26 76 46 L70 46 C71 30 62 21 50 21 C37 21 27 30 28 46 Z"
        fill="currentColor"
      />
      <circle cx="18" cy="38" r="9" fill="currentColor" />
      <circle cx="18" cy="38" r="3.2" fill="var(--gold, #e9a13b)" />
      {/* bindi */}
      <circle cx="49" cy="36" r="3.4" fill="var(--accent, #d6156c)" />
      {/* glasses: her instrument of judgment */}
      <g stroke="var(--gold, #e9a13b)" strokeWidth="3.4" fill="none">
        <circle cx="36" cy="54" r="11.5" />
        <circle cx="62" cy="54" r="11.5" />
        <path d="M47.5 52 Q49 50.5 50.5 52" />
        <path d="M24.5 51 L20 48.5 M73.5 51 L78 48.5" strokeLinecap="round" />
      </g>
      {/* expression */}
      {mood === "judging" && (
        <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
          <path d="M31 54.5 L41 54.5 M57 54.5 L67 54.5" />
          <path d="M43 76 Q49 79 55 76" fill="none" />
        </g>
      )}
      {mood === "delighted" && (
        <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
          <path d="M31 56 Q36 50 41 56 M57 56 Q62 50 67 56" fill="none" />
          <path d="M41 74 Q49 82 57 74" fill="none" />
        </g>
      )}
      {mood === "unimpressed" && (
        <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
          <path d="M31 54.5 L41 54.5 M57 53 L67 55.5" />
          <path d="M29 40 L40 38.5" />
          <path d="M43 77 L55 77" />
        </g>
      )}
      {/* earrings: jhumka dots */}
      <g fill="currentColor">
        <circle cx="21.5" cy="62" r="2.6" />
        <circle cx="76.5" cy="62" r="2.6" />
        <circle cx="21.5" cy="67.5" r="1.6" />
        <circle cx="76.5" cy="67.5" r="1.6" />
      </g>
    </svg>
  );
}
