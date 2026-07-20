/** Mirrors supabase/migrations — the demo store and Supabase impl share these shapes. */

export type UserState = "waitlisted" | "active" | "hidden" | "banned";

export type User = {
  id: string;
  phoneHash: string;
  /** Display-only mask ("•••••• 3210"); the raw number is never stored. */
  phoneMasked: string;
  state: UserState;
  createdAt: string;
};

export interface Db {
  findUserByPhoneHash(phoneHash: string): Promise<User | null>;
  createUser(input: { phoneHash: string; phoneMasked: string }): Promise<User>;
  getUser(id: string): Promise<User | null>;
}
