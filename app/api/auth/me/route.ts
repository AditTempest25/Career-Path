import { NextResponse } from "next/server";
import { getAuthenticatedSession } from "@/lib/server/session";

export async function GET() {
  try {
    const session = await getAuthenticatedSession();
    if (!session) {
      return NextResponse.json({
        authenticated: false,
        user: null,
        data: null,
      });
    }

    return NextResponse.json({
      authenticated: true,
      user: session.user,
      data: session.data,
    });
  } catch (error) {
    console.error("[GET /api/auth/me]", error);
    return NextResponse.json(
      { authenticated: false, user: null, data: null },
      { status: 500 }
    );
  }
}
