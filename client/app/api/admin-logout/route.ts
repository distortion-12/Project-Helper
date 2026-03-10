import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { success: true },
    {
      headers: {
        // Clear auth cookie using the same attributes used during login.
        "Set-Cookie": "admin_auth=; Path=/; SameSite=None; Secure; Max-Age=0",
      },
    }
  );
}
