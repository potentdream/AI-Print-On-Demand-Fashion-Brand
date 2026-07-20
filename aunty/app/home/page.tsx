import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuntyMark } from "@/components/aunty-mark";
import { BottomNav } from "@/components/bottom-nav";
import { logout } from "@/lib/auth/actions";
import { currentUser } from "@/lib/auth/current-user";

export const metadata: Metadata = { title: "Home" };

export default async function HomePage() {
  const user = await currentUser();
  if (!user) redirect("/login");

  return (
    <>
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-6 px-6 py-12 text-center">
        <AuntyMark mood="delighted" size={96} className="text-fg" />

        <span className="stamp stamp-label text-xs text-gold-text">
          File opened · {user.state}
        </span>

        <h1 className="font-display text-3xl font-black leading-snug">
          Good. You&apos;re in my files now.
        </h1>
        <p className="max-w-xs text-sm leading-relaxed text-muted">
          Aunty is setting up her office — the interview room, the intro desk,
          the chai. Your number ({user.phoneMasked}) is safely locked away.
          She&apos;ll call you in when it&apos;s time.
        </p>

        <form action={logout}>
          <button
            type="submit"
            className="min-h-11 rounded-ctl border border-line px-5 text-sm font-semibold text-muted transition-colors hover:text-fg"
          >
            Log out
          </button>
        </form>
      </main>
      <BottomNav active="/home" />
    </>
  );
}
