import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";
import bcrypt from "bcryptjs";

function isAdminAuthenticated(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  return cookieHeader
    .split(";")
    .some((cookie) => cookie.trim().startsWith("admin_auth="));
}

export async function POST(req: Request) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { username, currentPassword, newPassword } = await req.json();

  if (!username || !currentPassword || !newPassword) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  if (newPassword.length < 8) {
    return NextResponse.json(
      { error: "New password must be at least 8 characters" },
      { status: 400 }
    );
  }

  if (currentPassword === newPassword) {
    return NextResponse.json(
      { error: "New password must be different from current password" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("Admins")
    .select("password_hash")
    .eq("username", username)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, data.password_hash);
  if (!isCurrentPasswordValid) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 10);

  const { error: updateError } = await supabase
    .from("Admins")
    .update({ password_hash: newPasswordHash })
    .eq("username", username);

  if (updateError) {
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
