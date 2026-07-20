import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OtpForm } from "@/components/auth/otp-form";
import { AuntyMark } from "@/components/aunty-mark";
import { PENDING_COOKIE, verifyPending } from "@/lib/auth/session";
import { isDemoMode } from "@/lib/env";
import { maskPhone } from "@/lib/phone";

export const metadata: Metadata = { title: "Verify" };

export default async function VerifyPage() {
  const jar = await cookies();
  const pending = await verifyPending(jar.get(PENDING_COOKIE)?.value);
  if (!pending) redirect("/login");

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-12">
      <AuntyMark mood="unimpressed" size={72} className="text-fg" />
      <div className="text-center">
        <h1 className="font-display text-3xl font-black">
          Prove it&apos;s you.
        </h1>
        <p className="mt-2 text-sm text-muted">
          Aunty texted a code to {maskPhone(pending.phone)}.
        </p>
      </div>
      <OtpForm demoMode={isDemoMode()} />
    </main>
  );
}
