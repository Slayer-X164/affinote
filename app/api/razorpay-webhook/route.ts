import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(req: Request) {
  const body = await req.json()

  if (body.event === "payment.captured") {
    const payment = body.payload.payment.entity
    const orderId = payment.order_id

    // update Supabase
    await supabaseAdmin
      .from("template_instance")
      .update({ isPaid: true })
      .eq("order_id", orderId)
  }

  return new Response("ok")
}