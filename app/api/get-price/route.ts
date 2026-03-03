import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(req: Request) {
  const body = await req.json()
  const { template_id } = body

  if (!template_id) {
    return Response.json({ error: "template_id required" }, { status: 400 })
  }
  const { data, error } = await supabaseAdmin
  .from("templates")
  .select("price")
  .eq("template_id", template_id)
  .single()

  if(error){
    console.error("supabse error",error)
    return Response.json({error},{status:500})
  }
  return Response.json(data)
}