import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "@/lib/env";

/**
 * Supabase scaffolding. Not wired into the Db seam yet — that happens in
 * Phase 1 once a project is provisioned (schema draft: supabase/migrations/).
 * RLS is the privacy backbone (SPEC 5.1); the anon client must stay the
 * default, with the service-role client reserved for jobs/admin.
 */

export function supabaseAnon(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, or run with DEMO_MODE=true.",
    );
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export function supabaseService(): SupabaseClient {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!isSupabaseConfigured() || !key) {
    throw new Error(
      "Supabase service-role client requires full configuration.",
    );
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { persistSession: false },
  });
}
