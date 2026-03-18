export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendTemplateEmail } from "@/lib/sendLinkViaEmail";

export async function POST(req: NextRequest) {
  const body = await req.text(); // raw body
  const signature = req.headers.get("x-razorpay-signature")!;

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);


  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;

    const orderId = payment.order_id;
    const paymentId = payment.id;

    const { data, error } = await supabaseAdmin
      .from("template_instance")
      .update({
        paid: true,
        payment_id: paymentId,
      })
      .eq("razorpay_order_id", orderId)
      .eq("paid", false)
      .select("id, email")
      .single();

    if (error) {
      console.log("Supabase update error via webhook:", error);
      return;
    }

    if (data) {
      await sendTemplateEmail(data.email, data.id);
      console.log("Email sent successfully");
    }
    console.log("PAYMENT SUCCESS:", orderId);

  }

  if (event.event === "payment.failed") {
    const payment = event.payload.payment.entity;

    console.log("PAYMENT FAILED:", payment.order_id);
  }

  return NextResponse.json({ status: "all okay" });
}