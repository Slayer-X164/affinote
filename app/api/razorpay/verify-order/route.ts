export const runtime = "nodejs";

import { sendTemplateEmail } from "@/lib/sendLinkViaEmail";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { createHmac } from "node:crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
const supabaseAdmin = getSupabaseAdmin();
    const {
      instanceID,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    const data = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET!
    )
      .update(data)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.log("Signature mismatch");
      throw new Error("missing email or instanceID");

    }

    const {data: updatedData, error } = await supabaseAdmin
      .from("template_instance")
      .update({ paid: true,payment_id: razorpay_payment_id})
      .eq("id", instanceID)
      .eq("paid",false)
      .select("id,email")
      .single();

    if (error) {
      console.log("Supabase update error:", error);
      return Response.json({ success: false }, { status: 500 });
    }

    console.log("Payment verified & Supabase updated!");

    return Response.json({ success: true });
  } catch (error) {
    console.log("Verify Error:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}
