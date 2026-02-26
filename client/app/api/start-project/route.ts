import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabaseClient";

export async function POST(req: Request) {
  const { name, email, phone, budget, message } = await req.json();
  const { error } = await supabase
    .from("StartProject")
    .insert([{ name, email, phone, budget, message }]);
  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
