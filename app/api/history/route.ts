import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const visitor_id = searchParams.get("visitor_id");
const supabaseAdmin = getSupabaseAdmin();
  if (!visitor_id) {
    return NextResponse.json([], { status: 200 });
  }



  const { data } = await supabaseAdmin
    .from("template_instance")
    .select("id, template_id, created_at")
    .eq("visitor_id", visitor_id)
    .eq("paid", true)
    .order("created_at", { ascending: false });

  return NextResponse.json(data ?? []);
}
