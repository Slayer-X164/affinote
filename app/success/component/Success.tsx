
import { useSearchParams, useRouter } from "next/navigation";
import {  useState } from "react";

const Success = () => {
     const params = useSearchParams();
      const router = useRouter();

      const instance = params.get("instance");

      const shareLink = `${process.env.NEXT_PUBLIC_BASE_URL}/v/${instance}`;
      const [copied, setCopied] = useState(false);

      const copyToClipboard = async () => {
        await navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 Payment Successful!
      </h1>

      <p className="text-lg text-gray-700 mb-8 text-center">
        Your personalized page has been created.
        You can now share it with anyone!
      </p>

      {/* Shareable Link Box */}
      <div className="bg-gray-100 p-4 rounded-xl w-full max-w-xl border">
        <p className="text-sm text-gray-500 mb-2">Your Shareable Link:</p>

        <div className="flex items-center gap-2">
          <input
            className="w-full p-2 border rounded-lg bg-white"
            readOnly
            value={shareLink}
          />

          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => router.push(`/v/${instance}`)}
          className="px-6 py-3 bg-black text-white rounded-lg"
        >
          Preview Page
        </button>

        <button
          onClick={() => router.push(`/`)}
          className="px-6 py-3 bg-gray-300 rounded-lg"
        >
          Go Home
        </button>
      </div>
    </div>
  )
}

export default Success