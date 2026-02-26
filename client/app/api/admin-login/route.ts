import { NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"; // Change this in production!

export async function POST(req: Request) {
  const { password } = await req.json();
  if (password === ADMIN_PASSWORD) {
    // Set a cookie for session (simple demo, use JWT or secure session in prod)
    return NextResponse.json({ success: true }, {
      headers: {
        "Set-Cookie": `admin_auth=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`
      }
    });
  }
  return NextResponse.json({ success: false }, { status: 401 });
}
