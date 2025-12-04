"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Script from "next/script";
import { useState } from "react";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const instanceID = searchParams.get("instance");
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    setLoading(true);

    // 1. Create Razorpay order from backend
    const orderRes = await fetch("/api/razorpay/create-order", {
      method: "POST",
      body: JSON.stringify({
        instanceID,
        amount: 49, // price of template
      }),
    });

    const order = await orderRes.json();

    // 2. Razorpay Options
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      name: "BlushPages",
      description: "Template Purchase",

      handler: async function (response: any) {
        // 3. Verify payment on backend
        await fetch("/api/razorpay/verify-order", {
          method: "POST",
          body: JSON.stringify({
            instanceID,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        // 4. Redirect to final shareable page
        router.push(`/v/${instanceID}`);
      },
    };

    // 5. Open Razorpay Checkout
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Complete Payment</h1>

        <p className="text-gray-600">Instance: {instanceID}</p>

        <button
          onClick={startPayment}
          className="px-6 py-3 bg-pink-600 text-white rounded-lg mt-6"
        >
          Pay ₹49
        </button>

        {loading && <p className="mt-4">Loading Razorpay...</p>}
      </div>
    </>
  );
}
