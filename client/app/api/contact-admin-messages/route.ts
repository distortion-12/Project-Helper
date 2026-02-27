
import { NextResponse } from "next/server";
import { supabase } from "../_supabaseServer";

export async function GET() {
  // Fetch messages from Supabase
  const { data, error } = await supabase
    .from("ContactMessage")
    .select("email, message, createdAt")
    .order("createdAt", { ascending: false });
  if (error) {
    return NextResponse.json({ messages: [], error: error.message }, { status: 500 });
  }
  return NextResponse.json({ messages: data });
}

export async function POST(req: Request) {
  const { email, message } = await req.json();
  const { error } = await supabase
    .from("ContactMessage")
    .insert([{ email, message }]);
  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
