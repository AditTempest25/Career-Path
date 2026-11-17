import { NextResponse } from "next/server";

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

/**
 * Ambil IP klien dari header proxy/Vercel atau fallback ke "local".
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "local";
  }
  return request.headers.get("x-real-ip")?.trim() || "local";
}

/**
 * Pembatas laju request (Sliding Window Rate Limiter) berbasis memori server.
 * Mencegah serangan brute-force pada endpoint login, register, dan OTP.
 */
export function checkRateLimit(
  request: Request,
  bucket: string,
  limit = 10,
  windowMs = 60_000
):
  | { allowed: true; remaining: number; response?: undefined }
  | { allowed: false; remaining: 0; retryAfterSeconds: number; response: NextResponse } {
  const ip = getClientIp(request);
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const windowStart = now - windowMs;

  // Bersihkan entri lama secara berkala jika map membesar
  if (store.size > 1000) {
    for (const [k, v] of store.entries()) {
      const valid = v.timestamps.filter((t) => t > windowStart);
      if (valid.length === 0) store.delete(k);
      else v.timestamps = valid;
    }
  }

  const entry = store.get(key) ?? { timestamps: [] };
  entry.timestamps = entry.timestamps.filter((t) => t > windowStart);

  if (entry.timestamps.length >= limit) {
    const oldest = entry.timestamps[0] ?? now;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + windowMs - now) / 1000)
    );

    const response = NextResponse.json(
      {
        ok: false,
        error: `Terlalu banyak percobaan. Silakan tunggu ${retryAfterSeconds} detik sebelum mencoba lagi.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSeconds),
        },
      }
    );

    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds,
      response,
    };
  }

  entry.timestamps.push(now);
  store.set(key, entry);

  return {
    allowed: true,
    remaining: Math.max(0, limit - entry.timestamps.length),
  };
}
