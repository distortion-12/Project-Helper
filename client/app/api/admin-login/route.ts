

import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";
import bcrypt from "bcryptjs";

function logDebug(...args) {
  try {
    // eslint-disable-next-line no-console
    console.log("[ADMIN-LOGIN DEBUG]", ...args);
  } catch {}
}

export async function POST(req: Request) {
  const { username, password } = await req.json();
  logDebug("Login attempt", { username });
  // Fetch admin by username
  const { data, error } = await supabase
    .from("Admins")
    .select("password_hash")
    .eq("username", username)
    .single();
  logDebug("Supabase result", { data, error });
  if (error || !data) {
    logDebug("No user found or error", { error });
    return NextResponse.json({ success: false }, { status: 401 });
  }
  const valid = await bcrypt.compare(password, data.password_hash);
  logDebug("Password valid?", valid);
  if (valid) {
    logDebug("Login success");
    return NextResponse.json({ success: true }, {
      headers: {
        // Set cookie for cross-origin: SameSite=None; Secure
        "Set-Cookie": `admin_auth=1; Path=/; SameSite=None; Secure; Max-Age=86400`
      }
    });
  }
  logDebug("Invalid password");
  return NextResponse.json({ success: false }, { status: 401 });
}
