import { mkdir, readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import type { Db, User } from "./types";

/**
 * DEMO_MODE persistence: a JSON file under .demo-data/ (gitignored), so local
 * dev survives restarts with zero services. Serverless deploys running
 * DEMO_MODE get ephemeral storage — acceptable for demos, never for real users.
 */

const FILE = path.join(process.cwd(), ".demo-data", "store.json");

type Shape = { users: User[] };

async function load(): Promise<Shape> {
  try {
    return JSON.parse(await readFile(FILE, "utf8")) as Shape;
  } catch {
    return { users: [] };
  }
}

async function save(data: Shape): Promise<void> {
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(data, null, 2));
}

export const demoDb: Db = {
  async findUserByPhoneHash(phoneHash) {
    const { users } = await load();
    return users.find((u) => u.phoneHash === phoneHash) ?? null;
  },

  async createUser({ phoneHash, phoneMasked }) {
    const data = await load();
    const user: User = {
      id: randomUUID(),
      phoneHash,
      phoneMasked,
      state: "waitlisted",
      createdAt: new Date().toISOString(),
    };
    data.users.push(user);
    await save(data);
    return user;
  },

  async getUser(id) {
    const { users } = await load();
    return users.find((u) => u.id === id) ?? null;
  },
};
