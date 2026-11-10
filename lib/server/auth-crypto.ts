import { randomBytes, scryptSync, timingSafeEqual, createHash } from "node:crypto";

const SALT_BYTES = 16;
const KEY_LENGTH = 64;

/**
 * Hash password menggunakan algoritma scrypt + random salt (Node.js native crypto).
 * Format output: `${saltHex}:${derivedKeyHex}`
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(SALT_BYTES).toString("hex");
  const derivedKey = scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `${salt}:${derivedKey}`;
}

/**
 * Verifikasi password terhadap hash yang tersimpan dengan timingSafeEqual
 * untuk mencegah timing attack.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash || !storedHash.includes(":")) {
    return false;
  }
  const [salt, keyHex] = storedHash.split(":");
  if (!salt || !keyHex) return false;

  try {
    const keyBuffer = Buffer.from(keyHex, "hex");
    const derivedBuffer = scryptSync(password, salt, KEY_LENGTH);
    if (keyBuffer.length !== derivedBuffer.length) return false;
    return timingSafeEqual(keyBuffer, derivedBuffer);
  } catch {
    return false;
  }
}

/**
 * Buat raw session token acak 32-byte (64 karakter hex).
 */
export function generateSessionToken(): string {
  return randomBytes(32).toString("hex");
}

/**
 * Hash session token dengan SHA-256 sebelum disimpan di database.
 */
export function hashSessionToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Buat 6 digit kode OTP numerik untuk fitur Reset Kata Sandi.
 */
export function generateOtpCode(): string {
  const num = randomBytes(4).readUInt32BE(0) % 900000;
  return String(100000 + num);
}
