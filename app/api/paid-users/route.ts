import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )

  const { count } = await supabase
    .from("template_instance")
    .select("*", { count: "exact", head: true })
    .eq("paid", true)

  return NextResponse.json({ count: count ?? 150 })
}
