import type { Metadata } from "next";
import { AuntyMark } from "@/components/aunty-mark";

export const metadata: Metadata = { title: "Offline" };

export default function OfflinePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-12 text-center">
      <AuntyMark mood="unimpressed" size={96} className="text-fg" />
      <h1 className="font-display text-3xl font-black">No network, beta.</h1>
      <p className="max-w-xs text-sm leading-relaxed text-muted">
        Aunty has opinions about your signal provider too. Reconnect and
        she&apos;ll be right here.
      </p>
    </main>
  );
}
