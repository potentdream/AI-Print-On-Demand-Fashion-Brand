import type { Metadata } from "next";
import Link from "next/link";
import { PhoneForm } from "@/components/auth/phone-form";
import { AuntyMark } from "@/components/aunty-mark";
import { isDemoMode } from "@/lib/env";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-12">
      <Link href="/" aria-label="Back to the front page">
        <AuntyMark mood="judging" size={72} className="text-fg" />
      </Link>
      <div className="text-center">
        <h1 className="font-display text-3xl font-black">
          Give Aunty your number.
        </h1>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
          One OTP, no password drama. She doesn&apos;t share it, she
          doesn&apos;t call — she only judges.
        </p>
      </div>
      <PhoneForm demoMode={isDemoMode()} />
      <p className="max-w-xs text-center text-xs text-faint">
        18+ only. By continuing you accept Aunty&apos;s terms — the polite ones
        and the unwritten ones.
      </p>
    </main>
  );
}
