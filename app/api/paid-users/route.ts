import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { NextResponse } from "next/server"

export async function GET() {


  const { count } = await supabaseAdmin
    .from("template_instance")
    .select("*", { count: "exact", head: true })
    .eq("paid", true)

  return NextResponse.json({ count: count ?? 150 })
}
