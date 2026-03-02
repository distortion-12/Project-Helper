import { NextResponse } from "next/server";
import { supabase } from "../_supabaseServer";

export async function GET() {
  const { data, error } = await supabase
    .from("StartProjectRequests")
    .select("*")
    .order("createdat", { ascending: false });

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, requests: data || [] });
}
