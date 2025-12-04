import { supabase } from "@/lib/supabase";
import crypto from "crypto";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      instanceId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    const data = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(data)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return Response.json({ success: false }, { status: 400 });
    }
    await supabase
      .from("template_instance")
      .update({ paid: true })
      .eq("id", instanceId);
    return Response.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      success: false,
    });
  }
}
