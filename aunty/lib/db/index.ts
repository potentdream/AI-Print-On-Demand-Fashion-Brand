import { isDemoMode } from "@/lib/env";
import { demoDb } from "./demo-store";
import type { Db } from "./types";

export type { Db, User, UserState, WaitlistEntry } from "./types";

/**
 * The one place that decides which Db implementation the app talks to.
 * Phase 1 adds the Supabase implementation; every caller stays unchanged.
 */
export function getDb(): Db {
  if (isDemoMode()) return demoDb;
  throw new Error(
    "Supabase Db is wired in Phase 1. Until then run with DEMO_MODE=true.",
  );
}
