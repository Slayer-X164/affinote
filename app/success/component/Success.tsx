"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { RiErrorWarningFill } from "react-icons/ri";

const Success = () => {
  const [mounted, setMounted] = useState(false);
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const params = useSearchParams();
  const router = useRouter();
  const { width, height } = useWindowSize();

  const instance = params.get("instance");

  const shareLink = `${process.env.NEXT_PUBLIC_BASE_URL}/v/${instance}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  // poll payment status ?? refactor in future
  useEffect(() => {
    if (!instance) return;

    const checkPayment = async () => {
      try {
        const res = await fetch(`/api/payment-status?instance=${instance}`);
        const data = await res.json();

        if (data.paid) {
          setPaid(true);
          setLoading(false);
          return true;
        }
        return false;
      } catch (err) {
        console.error("Error checking payment:", err);
        return false;
      }
    };

    // initial check
    checkPayment();

    const interval = setInterval(async () => {
      const isPaid = await checkPayment();
      if (isPaid) clearInterval(interval);
    }, 3000);

    return () => clearInterval(interval);
  }, [instance]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5">

      {mounted && paid && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={180}
          recycle={false}
        />
      )}


      <h1 className="text-2xl md:text-4xl font-bold flex flex-col gap-3 mb-10 text-center">
        {loading ? (
          <span className="text-yellow-500">
            Processing your payment...
          </span>
        ) : (
          <>
            <span className="text-green-500">Payment Successful!</span>

            <span className="text-xs md:text-sm text-blue-900 rounded-full border border-blue-900 px-3 py-1 bg-blue-600/20 font-light flex items-center gap-2 justify-center">
              <RiErrorWarningFill className="md:text-sm text-lg" />
              Link is also sent to your email. Check inbox or spam.
            </span>
          </>
        )}
      </h1>


      {loading && (
        <p className="text-gray-600 mt-2 text-center">
          This may take a few seconds for UPI payments...
        </p>
      )}


      {paid && (
        <div className="bg-blue-100 p-4 rounded-xl w-full max-w-xl">
          <p className="text-sm text-gray-600 mb-2">
            Your Shareable Link:
          </p>

          <div className="flex items-center gap-2">
            <input
              className="w-full p-2 rounded-xl bg-white shadow-2xl shadow-blue-800/40"
              readOnly
              value={shareLink}
            />

            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-green-600 cursor-pointer text-white rounded-xl"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}


      <div className="flex gap-4 mt-8">
        <button
          onClick={() => router.push(`/`)}
          className="px-6 py-3 bg-blue-50 border-2 border-dashed border-blue-500 text-blue-500 rounded-2xl cursor-pointer font-semibold"
        >
          Go Home
        </button>

        <button
          disabled={!paid}
          onClick={() => router.push(`/v/${instance}`)}
          className={`px-6 py-3 font-semibold rounded-2xl ${
            paid
              ? "bg-blue-500 text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          View Page
        </button>
      </div>
    </div>
  );
};

export default Success;