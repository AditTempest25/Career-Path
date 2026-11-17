import { NextResponse } from "next/server";
import type { ZodError } from "zod";
import { getAuthenticatedSession } from "@/lib/server/session";

type Session = NonNullable<Awaited<ReturnType<typeof getAuthenticatedSession>>>;

/**
 * Pastikan request punya sesi login yang valid.
 * Mengembalikan `session` atau `response` 401 yang siap dikirim.
 */
export async function requireSession(): Promise<
  { session: Session; response?: undefined } | { session?: undefined; response: NextResponse }
> {
  const session = await getAuthenticatedSession();
  if (!session) {
    return {
      response: NextResponse.json(
        { ok: false, error: "Sesi telah berakhir. Silakan masuk kembali." },
        { status: 401 }
      ),
    };
  }
  return { session };
}

export function validationError(error: ZodError, fallback = "Data yang dikirim tidak valid.") {
  return NextResponse.json(
    { ok: false, error: error.errors[0]?.message || fallback },
    { status: 400 }
  );
}

export function errorResponse(message: string, status: number) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

/** Baca body JSON dengan aman; mengembalikan `null` jika body bukan JSON. */
export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

/** Tolak payload yang terlalu besar berdasarkan header Content-Length. */
export function isPayloadTooLarge(request: Request, maxBytes: number) {
  const length = Number(request.headers.get("content-length") ?? 0);
  return Number.isFinite(length) && length > maxBytes;
}
