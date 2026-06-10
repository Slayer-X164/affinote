"use client";

import ButtonLoder from "@/components/ui/ButtonLoder";
import Navbar from "@/components/ui/Navbar";
import { useSearchParams, useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const instanceID = searchParams.get("instance");
  const template_id = searchParams.get("template_id")
  const [loading, setLoading] = useState(false);
  const [razorpayScriptLoader, setRSLoader] = useState<boolean>(false);

  const [price, setPrice] = useState<number | null>(null);
  useEffect(() => {
    const getPriceFromDb = async () => {
      const res = await fetch("/api/get-price", {
        method: "POST",
        body: JSON.stringify({
          template_id
        })
      })

      const data = await res.json()
      setPrice(data.price)
    }
    getPriceFromDb()
  }, [template_id])


  if (price !== null && price <= 0) {
    router.replace("/");
    return null;
  }
  const startPayment = async () => {
    setLoading(true);

    try {
      // 1 Create Razorpay order from backend
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        body: JSON.stringify({
          instanceID,
          amount: price,
        }),
      });

      const order = await orderRes.json();

      // 2 Razorpay Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        name: "Affinote",
        description: `purchased template ${template_id}`,

        handler: async function (response: any) {
          // 3 Verify payment on backend
          await fetch("/api/razorpay/verify-order", {
            method: "POST",
            body: JSON.stringify({
              instanceID,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              phone: response.phone,
            }),
          });

          // 4 Redirecting to final shareable page
          router.push(`/success?instance=${instanceID}`);
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "something went wrong!"
      )
    }

  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Razorpay Loaded ✅");
          setRSLoader(true);
        }}
        onError={() => toast("Payment error... Refresh page")}
      />

      <div className="min-h-screen flex flex-col items-center justify-start  px-3">
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        <h1 className="text-3xl font-bold mb-4 pt-20">Complete your Payment</h1>

        <p className="text-gray-600">Proceed to get your shareable link</p>

        <button
          disabled={!razorpayScriptLoader || loading || price == null}
          onClick={startPayment}
          className={`px-6 py-3 mt-6 rounded-lg text-white cursor-pointer transition-all duration-300
     ${!razorpayScriptLoader || loading
              ? "bg-neutral-300 cursor-not-allowed"
              : "bg-green-700 hover:bg-green-600"
            }`}
        >
          {!razorpayScriptLoader ? (
            "Loading Razorpay…"
          ) : loading ? (
            <ButtonLoder />
          ) : (
            `Pay ₹${price == null ? "" : price}`
          )}
        </button>
        {!razorpayScriptLoader && (
          <h3 className="mt-6 text-sm px-4 py-1.5 border-2 border-dashed border-amber-500 text-center text-amber-500 font-semibold rounded-2xl">
            NOTE: if its taking to long to laod, <br /> refresh page
          </h3>
        )}
        {loading && <p className="mt-4">Payment Processing...</p>}
      </div>
    </>
  );
}
