"use client";

import { useEffect, useState } from "react";

export default function InAppBrowserWarning() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor;

    const isInstagram = ua.includes("Instagram");
    const isFB = ua.includes("FBAN") || ua.includes("FBAV");

    if (isInstagram || isFB) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const openInBrowser = () => {
    const url = window.location.href;

    // Android → open Chrome
    if (/Android/i.test(navigator.userAgent)) {
      window.location.href = `intent://${url.replace(
        /^https?:\/\//,
        ""
      )}#Intent;scheme=https;package=com.android.chrome;end`;
      return;
    }

    // iPhone → open Safari
    window.location.href = url;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-[50vh] bg-black text-white p-4 text-center">
      <p className="text-sm mb-3">
        Instagram browser may not save your purchased link 😢
        Please open in Chrome/Safari for full experience.
      </p>
      <p className="text-xs mt-2 text-neutral-500 text-center"> Instagram opens links inside its own browser which can prevent
  your purchased page from saving correctly and some animations may not load.

  To make sure everything works perfectly and your link is stays forever,
  please open this page in Chrome or Safari.</p>

      <button
        onClick={openInBrowser}
        className="bg-blue-500 px-4 py-2 rounded-full mt-4 font-semibold"
      >
        Open in Browser
      </button>
      <p className="text-xs text-center mt-4">
  — Affinote 💙
</p>
    </div>
  );
}
