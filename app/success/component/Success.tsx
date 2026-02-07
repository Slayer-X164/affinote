"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { RiErrorWarningFill } from "react-icons/ri";
const Success = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const params = useSearchParams();
  const router = useRouter();
  const { width, height } = useWindowSize();
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
      {mounted && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={180}
          recycle={false}
        />
      )}

      <h1 className="text-2xl md:text-4xl  font-bold flex items-center flex-col gap-3 text-green-500 mb-8 text-center">
        Payment Successful! <br /> <span className="text-sm md:text-lg text-blue-900 rounded-full border border-blue-900 px-3 py-1 bg-blue-600/20 font-light flex items-center gap-2 "><RiErrorWarningFill />
          Please save your link in Notepad or Bookmark it.</span>
      </h1>

      {/* <p className="text-lg text-gray-700 font-bold mb-8 text-center">

        You can now share it with anyone!
      </p> */}

      {/* Shareable Link Box */}
      <div className="bg-blue-100 p-4 rounded-xl w-full max-w-xl ">
        <p className="text-sm text-gray-600 mb-2">Your Shareable Link:</p>

        <div className="flex items-center gap-2">
          <input
            className="w-full p-2  rounded-xl bg-white shadow-2xl shadow-blue-800/40"
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

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => router.push(`/`)}
          className="px-6 py-3 bg-blue-50 border-2 border-dashed border-blue-500 text-blue-500 rounded-2xl cursor-pointer font-semibold"
        >
          Go Home
        </button>
        <button
          onClick={() => router.push(`/v/${instance}`)}
          className="px-6 py-3 bg-blue-500 cursor-pointer font-semibold text-white rounded-2xl"
        >
          View Page
        </button>
      </div>
    </div>
  );
};

export default Success;
