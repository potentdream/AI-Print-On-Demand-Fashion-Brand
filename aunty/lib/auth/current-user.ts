import { cookies } from "next/headers";
import { getDb, type User } from "@/lib/db";
import { SESSION_COOKIE, verifySession } from "./session";

/** Server-side session → user lookup. Pages must treat null as "not logged in". */
export async function currentUser(): Promise<User | null> {
  const jar = await cookies();
  const session = await verifySession(jar.get(SESSION_COOKIE)?.value);
  if (!session) return null;
  return getDb().getUser(session.userId);
}
