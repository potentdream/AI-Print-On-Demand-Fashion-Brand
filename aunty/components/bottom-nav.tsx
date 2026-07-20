import Link from "next/link";

/**
 * The app's four rooms (SPEC PART 6): Aunty / Intros / Chats / You.
 * Only Aunty's room exists in Phase 0; the rest are honest "soon" stubs so the
 * IA is real from day one. Thumb-zone: min 44px targets, safe-area padding.
 */

const TABS = [
  { href: "/home", label: "Aunty", enabled: true },
  { href: "/intros", label: "Intros", enabled: false },
  { href: "/chats", label: "Chats", enabled: false },
  { href: "/you", label: "You", enabled: false },
] as const;

export function BottomNav({ active }: { active: string }) {
  return (
    <nav
      aria-label="Main"
      className="sticky bottom-0 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="mx-auto flex max-w-md">
        {TABS.map((tab) => (
          <li key={tab.href} className="flex-1">
            {tab.enabled ? (
              <Link
                href={tab.href}
                aria-current={active === tab.href ? "page" : undefined}
                className={`flex min-h-12 flex-col items-center justify-center gap-0.5 text-sm font-semibold ${
                  active === tab.href ? "text-accent" : "text-muted"
                }`}
              >
                {tab.label}
              </Link>
            ) : (
              <span
                aria-disabled="true"
                title="Aunty is preparing this room."
                className="flex min-h-12 cursor-not-allowed flex-col items-center justify-center gap-0.5 text-sm text-faint"
              >
                {tab.label}
                <span className="stamp-label text-[9px]">soon</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
