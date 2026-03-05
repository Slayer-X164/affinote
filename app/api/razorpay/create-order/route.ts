import { supabaseAdmin } from "@/lib/supabaseAdmin";

type paymentData = {
  instanceID: string;
  amount: number;
};

export async function POST(req: Request) {
  try {
    const { instanceID, amount } = (await req.json()) as paymentData;

    const key = process.env.RAZORPAY_KEY_ID!;
    const secret = process.env.RAZORPAY_KEY_SECRET!;

    const auth = btoa(`${key}:${secret}`);

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100,
        currency: "INR",
        receipt: instanceID,
      }),
    });

    const order = await res.json();

    await supabaseAdmin
      .from("template_instance")
      .update({ razorpay_order_id: order.id })
      .eq("id", instanceID);

    return Response.json(order);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}