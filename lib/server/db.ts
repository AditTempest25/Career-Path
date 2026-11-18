import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { UserData } from "@/lib/types";
import {
  buildDemoData,
  createEmptyData,
  DEMO_EMAIL,
  DEMO_PASSWORD,
  DEMO_USER_ID,
  DEMO_USER_NAME,
  normalizeUserData,
} from "@/lib/seed-data";
import { generateOtpCode, hashPassword } from "@/lib/server/auth-crypto";
import { toProfileSlug } from "@/lib/slug";

export interface DbUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface DbSession {
  id: string;
  userId: string;
  tokenHash: string;
  userAgent?: string;
  createdAt: string;
  expiresAt: string;
  lastActiveAt: string;
}

export interface DbPasswordResetOtp {
  id: string;
  userId: string;
  email: string;
  code: string;
  expiresAt: string;
  used: boolean;
  createdAt: string;
}

interface DatabaseSchema {
  version: number;
  users: DbUser[];
  sessions: DbSession[];
  userData: Record<string, UserData>;
  passwordResetOtps: DbPasswordResetOtp[];
}

function getDataDir() {
  if (process.env.PATHFORGE_DATA_DIR) {
    return process.env.PATHFORGE_DATA_DIR;
  }
  return process.env.VERCEL
    ? path.join(os.tmpdir(), "pathforge-data")
    : path.join(process.cwd(), "data");
}

function getDbFile() {
  return path.join(getDataDir(), "pathforge-db.json");
}

let writeQueue: Promise<unknown> = Promise.resolve();

function createInitialDb(): DatabaseSchema {
  const now = new Date().toISOString();
  const demoUser: DbUser = {
    id: DEMO_USER_ID,
    name: DEMO_USER_NAME,
    email: DEMO_EMAIL,
    passwordHash: hashPassword(DEMO_PASSWORD),
    createdAt: now,
    updatedAt: now,
  };

  return {
    version: 1,
    users: [demoUser],
    sessions: [],
    userData: {
      [DEMO_USER_ID]: buildDemoData(),
    },
    passwordResetOtps: [],
  };
}

async function readDbFile(): Promise<DatabaseSchema> {
  const dbFile = getDbFile();
  try {
    const raw = await fs.readFile(dbFile, "utf-8");
    const parsed = JSON.parse(raw) as Partial<DatabaseSchema>;
    return {
      version: parsed.version ?? 1,
      users: Array.isArray(parsed.users) ? parsed.users : [],
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
      userData: parsed.userData ?? {},
      passwordResetOtps: Array.isArray(parsed.passwordResetOtps)
        ? parsed.passwordResetOtps
        : [],
    };
  } catch (err) {
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code === "ENOENT") {
      const initial = createInitialDb();
      await writeDbFile(initial);
      return initial;
    }
    throw err;
  }
}

async function writeDbFile(db: DatabaseSchema): Promise<void> {
  const dataDir = getDataDir();
  const dbFile = getDbFile();
  // PF-013: Jangan pernah menelan kegagalan tulis di lokal maupun di Vercel.
  // Setiap kegagalan fs.mkdir / fs.writeFile wajib dilempar ke pemanggil.
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(dbFile, JSON.stringify(db, null, 2), "utf-8");
}

/**
 * Jalankan operasi baca/tulis database secara terurut (serialized)
 * agar aman dari race condition.
 */
async function withDb<T>(
  fn: (
    db: DatabaseSchema
  ) => Promise<{ db?: DatabaseSchema; result: T }> | { db?: DatabaseSchema; result: T }
): Promise<T> {
  const run = async () => {
    const current = await readDbFile();
    const { db: nextDb, result } = await fn(current);
    if (nextDb) {
      await writeDbFile(nextDb);
    }
    return result;
  };

  const nextPromise = writeQueue.then(run, run);
  writeQueue = nextPromise.then(
    () => undefined,
    () => undefined
  );
  return nextPromise;
}

export function toPublicUser(user: DbUser): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export async function findUserByEmail(email: string): Promise<DbUser | null> {
  const normalized = email.trim().toLowerCase();
  return withDb((db) => {
    const found = db.users.find((u) => u.email.toLowerCase() === normalized) ?? null;
    return { result: found };
  });
}

export async function findUserById(userId: string): Promise<DbUser | null> {
  return withDb((db) => {
    const found = db.users.find((u) => u.id === userId) ?? null;
    return { result: found };
  });
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
}): Promise<{ ok: true; user: DbUser; data: UserData } | { ok: false; error: string }> {
  const normalizedEmail = input.email.trim().toLowerCase();
  const trimmedName = input.name.trim();

  return withDb<{ ok: true; user: DbUser; data: UserData } | { ok: false; error: string }>((db) => {
    const exists = db.users.some((u) => u.email.toLowerCase() === normalizedEmail);
    if (exists) {
      return {
        result: {
          ok: false,
          error: "Email sudah terdaftar. Silakan masuk ke akun kamu.",
        },
      };
    }

    const now = new Date().toISOString();
    const newUser: DbUser = {
      id: `usr_${randomUUID().slice(0, 12)}`,
      name: trimmedName,
      email: normalizedEmail,
      passwordHash: input.passwordHash,
      createdAt: now,
      updatedAt: now,
    };

    const initialData = createEmptyData();
    db.users.push(newUser);
    db.userData[newUser.id] = initialData;

    return {
      db,
      result: {
        ok: true,
        user: newUser,
        data: initialData,
      },
    };
  });
}

export async function ensureDemoUser(): Promise<{ user: DbUser; data: UserData }> {
  return withDb((db) => {
    let demo = db.users.find((u) => u.email.toLowerCase() === DEMO_EMAIL);
    let mutated = false;
    const now = new Date().toISOString();

    if (!demo) {
      demo = {
        id: DEMO_USER_ID,
        name: DEMO_USER_NAME,
        email: DEMO_EMAIL,
        passwordHash: hashPassword(DEMO_PASSWORD),
        createdAt: now,
        updatedAt: now,
      };
      db.users.push(demo);
      mutated = true;
    }

    let data = db.userData[demo.id];
    if (!data) {
      data = buildDemoData();
      db.userData[demo.id] = data;
      mutated = true;
    } else {
      data = normalizeUserData(data);
      db.userData[demo.id] = data;
    }

    return {
      db: mutated ? db : undefined,
      result: { user: demo, data },
    };
  });
}

/**
 * Buat akun demo terisolasi khusus untuk satu sesi pengunjung agar dua pengunjung
 * yang menekan tombol Demo secara bersamaan tidak saling menimpa progres (PF-012).
 */
export async function createIsolatedDemoUser(): Promise<{ user: DbUser; data: UserData }> {
  await ensureDemoUser();
  return withDb((db) => {
    const shortId = randomUUID().slice(0, 8);
    const now = new Date().toISOString();
    const isolatedUser: DbUser = {
      id: `demo_${shortId}`,
      name: DEMO_USER_NAME,
      email: `demo+${shortId}@pathforge.id`,
      passwordHash: hashPassword(DEMO_PASSWORD),
      createdAt: now,
      updatedAt: now,
    };
    const isolatedData = buildDemoData();
    isolatedData.settings.showOnLeaderboard = false;

    db.users.push(isolatedUser);
    db.userData[isolatedUser.id] = isolatedData;

    return {
      db,
      result: { user: isolatedUser, data: isolatedData },
    };
  });
}

export async function getUserData(userId: string): Promise<UserData> {
  return withDb((db) => {
    const existing = db.userData[userId];
    if (!existing) {
      const empty = createEmptyData();
      db.userData[userId] = empty;
      return { db, result: empty };
    }
    return { result: normalizeUserData(existing) };
  });
}

export async function saveUserData(userId: string, data: UserData): Promise<UserData> {
  return withDb((db) => {
    const normalized = normalizeUserData(data);
    db.userData[userId] = normalized;
    return { db, result: normalized };
  });
}

export async function createSession(
  userId: string,
  tokenHash: string,
  userAgent?: string,
  ttlDays = 30
): Promise<DbSession> {
  return withDb((db) => {
    const now = new Date();
    const expires = new Date(now.getTime() + ttlDays * 24 * 60 * 60 * 1000);

    db.sessions = db.sessions.filter((s) => new Date(s.expiresAt) > now);

    const session: DbSession = {
      id: `ses_${randomUUID().slice(0, 12)}`,
      userId,
      tokenHash,
      userAgent,
      createdAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      lastActiveAt: now.toISOString(),
    };

    db.sessions.push(session);
    return { db, result: session };
  });
}

export async function findSessionWithUser(
  tokenHash: string
): Promise<{ session: DbSession; user: DbUser; data: UserData } | null> {
  return withDb((db) => {
    const now = new Date();
    const session = db.sessions.find((s) => s.tokenHash === tokenHash);
    if (!session) return { result: null };

    if (new Date(session.expiresAt) <= now) {
      db.sessions = db.sessions.filter((s) => s.id !== session.id);
      return { db, result: null };
    }

    const user = db.users.find((u) => u.id === session.userId);
    if (!user) {
      db.sessions = db.sessions.filter((s) => s.id !== session.id);
      return { db, result: null };
    }

    const data = normalizeUserData(db.userData[user.id]);

    return {
      result: { session, user, data },
    };
  });
}

export async function deleteSessionByTokenHash(tokenHash: string): Promise<void> {
  await withDb((db) => {
    const before = db.sessions.length;
    db.sessions = db.sessions.filter((s) => s.tokenHash !== tokenHash);
    return {
      db: db.sessions.length !== before ? db : undefined,
      result: undefined,
    };
  });
}

export async function updateUserAccount(
  userId: string,
  patch: { name?: string; email?: string }
): Promise<{ ok: true; user: DbUser } | { ok: false; error: string }> {
  return withDb<{ ok: true; user: DbUser } | { ok: false; error: string }>((db) => {
    const user = db.users.find((u) => u.id === userId);
    if (!user) {
      return { result: { ok: false, error: "Akun tidak ditemukan." } };
    }

    const nextEmail = patch.email?.trim().toLowerCase();
    if (
      nextEmail &&
      nextEmail !== user.email.toLowerCase() &&
      db.users.some((u) => u.id !== userId && u.email.toLowerCase() === nextEmail)
    ) {
      return {
        result: {
          ok: false,
          error: "Email sudah digunakan oleh akun lain.",
        },
      };
    }

    if (patch.name?.trim()) user.name = patch.name.trim();
    if (nextEmail) user.email = nextEmail;
    user.updatedAt = new Date().toISOString();

    return {
      db,
      result: { ok: true, user },
    };
  });
}

export async function updateUserPassword(
  userId: string,
  newPasswordHash: string,
  keepTokenHash?: string
): Promise<boolean> {
  return withDb((db) => {
    const user = db.users.find((u) => u.id === userId);
    if (!user) return { result: false };
    user.passwordHash = newPasswordHash;
    user.updatedAt = new Date().toISOString();
    db.sessions = db.sessions.filter(
      (s) => s.userId !== userId || (keepTokenHash && s.tokenHash === keepTokenHash)
    );
    db.passwordResetOtps = db.passwordResetOtps.filter((o) => o.userId !== userId);
    return { db, result: true };
  });
}

export async function deleteUserAccount(userId: string): Promise<boolean> {
  return withDb((db) => {
    const targetUser = db.users.find((u) => u.id === userId);
    if (!targetUser) return { result: false };
    const targetEmail = targetUser.email.toLowerCase();
    db.users = db.users.filter((u) => u.id !== userId);
    db.sessions = db.sessions.filter((s) => s.userId !== userId);
    db.passwordResetOtps = db.passwordResetOtps.filter(
      (o) => o.userId !== userId && o.email.toLowerCase() !== targetEmail
    );
    delete db.userData[userId];
    return { db, result: true };
  });
}

export async function createPasswordResetOtp(
  email: string
): Promise<{ ok: true; code: string; expiresAt: string } | { ok: false; error: string }> {
  const normalized = email.trim().toLowerCase();
  return withDb<{ ok: true; code: string; expiresAt: string } | { ok: false; error: string }>((db) => {
    const user = db.users.find((u) => u.email.toLowerCase() === normalized);
    if (!user) {
      return {
        result: {
          ok: false,
          error: "Email tidak ditemukan dalam sistem kami.",
        },
      };
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 15 * 60 * 1000).toISOString();
    const code = generateOtpCode();

    db.passwordResetOtps.forEach((otp) => {
      if (otp.userId === user.id) otp.used = true;
    });

    db.passwordResetOtps.push({
      id: `otp_${randomUUID().slice(0, 10)}`,
      userId: user.id,
      email: user.email,
      code,
      expiresAt,
      used: false,
      createdAt: now.toISOString(),
    });

    return {
      db,
      result: { ok: true, code, expiresAt },
    };
  });
}

export async function verifyOtpAndResetPassword(
  email: string,
  code: string,
  newPasswordHash: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const normalized = email.trim().toLowerCase();
  const cleanCode = code.trim();

  return withDb<{ ok: true } | { ok: false; error: string }>((db) => {
    const now = new Date();
    const otp = db.passwordResetOtps.find(
      (o) =>
        o.email.toLowerCase() === normalized &&
        o.code === cleanCode &&
        !o.used &&
        new Date(o.expiresAt) > now
    );

    if (!otp) {
      return {
        result: {
          ok: false,
          error: "Kode OTP tidak valid atau sudah kedaluwarsa.",
        },
      };
    }

    const user = db.users.find((u) => u.id === otp.userId);
    if (!user) {
      return {
        result: { ok: false, error: "Akun pengguna tidak ditemukan." },
      };
    }

    otp.used = true;
    user.passwordHash = newPasswordHash;
    user.updatedAt = now.toISOString();
    db.sessions = db.sessions.filter((s) => s.userId !== user.id);

    return { db, result: { ok: true } };
  });
}

export async function mutateUserData<T>(
  userId: string,
  mutator: (current: UserData) => { next?: UserData; result: T }
): Promise<T> {
  return withDb((db) => {
    const current = normalizeUserData(db.userData[userId]);
    const { next, result } = mutator(current);
    if (!next) return { result };
    db.userData[userId] = normalizeUserData(next);
    return { db, result };
  });
}

export async function findUsersByProfileSlug(
  slug: string
): Promise<{ user: DbUser; data: UserData }[]> {
  const target = slug.trim().toLowerCase();
  return withDb((db) => {
    const matches = db.users
      .filter((u) => toProfileSlug(u.name) === target)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      .map((user) => ({ user, data: normalizeUserData(db.userData[user.id]) }));
    return { result: matches };
  });
}

export async function listAllUsersWithData(): Promise<
  { user: DbUser; data: UserData }[]
> {
  return withDb((db) => {
    const list = db.users.map((user) => ({
      user,
      data: normalizeUserData(db.userData[user.id]),
    }));
    return { result: list };
  });
}
