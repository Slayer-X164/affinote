import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const visitor_id = searchParams.get("visitor_id");

  if (!visitor_id) {
    return NextResponse.json([], { status: 200 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await supabase
    .from("template_instance")
    .select("id, template_id, created_at")
    .eq("visitor_id", visitor_id)
    .eq("paid", true)
    .order("created_at", { ascending: false });

  return NextResponse.json(data ?? []);
}
