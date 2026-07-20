/** Typed access to environment flags. Every var is documented in CLAUDE.md + .env.example. */

export function isDemoMode(): boolean {
  return process.env.DEMO_MODE === "true";
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
