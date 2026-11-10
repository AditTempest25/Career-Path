import { cookies, headers } from "next/headers";
import {
  generateSessionToken,
  hashSessionToken,
} from "@/lib/server/auth-crypto";
import {
  createSession,
  deleteSessionByTokenHash,
  findSessionWithUser,
  toPublicUser,
  type DbUser,
  type PublicUser,
} from "@/lib/server/db";
import type { UserData } from "@/lib/types";

export const SESSION_COOKIE_NAME = "pathforge_session";
const SESSION_TTL_DAYS = 30;
const SESSION_MAX_AGE_SECONDS = SESSION_TTL_DAYS * 24 * 60 * 60;

/**
 * Buat sesi baru di database server dan pasang HTTP-Only Cookie di browser.
 */
export async function issueSessionCookie(userId: string): Promise<string> {
  const rawToken = generateSessionToken();
  const tokenHash = hashSessionToken(rawToken);
  const hdrs = await headers();
  const userAgent = hdrs.get("user-agent") ?? undefined;

  await createSession(userId, tokenHash, userAgent, SESSION_TTL_DAYS);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, rawToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return rawToken;
}

/**
 * Baca HTTP-Only Cookie dari request saat ini dan verifikasi ke database server.
 */
export async function getAuthenticatedSession(): Promise<{
  user: PublicUser;
  rawUser: DbUser;
  data: UserData;
} | null> {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!rawToken) return null;

  const tokenHash = hashSessionToken(rawToken);
  const found = await findSessionWithUser(tokenHash);
  if (!found) return null;

  return {
    user: toPublicUser(found.user),
    rawUser: found.user,
    data: found.data,
  };
}

/**
 * Hapus sesi dari database server dan bersihkan HTTP-Only Cookie.
 */
export async function revokeSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (rawToken) {
    const tokenHash = hashSessionToken(rawToken);
    await deleteSessionByTokenHash(tokenHash);
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}
