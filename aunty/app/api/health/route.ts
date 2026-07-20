import { NextResponse } from "next/server";
import { isDemoMode, isSupabaseConfigured } from "@/lib/env";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "aunty",
    demoMode: isDemoMode(),
    supabase: isSupabaseConfigured() ? "configured" : "unconfigured",
    time: new Date().toISOString(),
  });
}
