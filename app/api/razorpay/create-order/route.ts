import Razorpay from "razorpay";

type paymentData = {
  instanceID: string;
  amount: number;
};
export async function POST(req: Request) {
  try {
    const { instanceID, amount } = (await req.json()) as paymentData;

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: instanceID,
    });
    return Response.json(order);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
