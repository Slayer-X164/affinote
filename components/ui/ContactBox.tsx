"use client";

import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import ButtonLoder from "./ButtonLoder";

export default function ContactBox() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true);

  const form = e.currentTarget;
  const formData = new FormData(form);

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    }),
  });

  setLoading(false);

  if (res.ok) {
    setSent(true);
    form.reset();
  }
}


  return (
    <div id="contact" className=" flex justify-center items-center w-full h-auto px-3">
      <div className="max-w-xl w-full mx-auto my-10 p-6  bg-blue-100 border-blue-400 rounded-2xl  relative">
      <span className="w-full -z-1 h-full  absolute left-2 top-2 "></span>
      {!sent && (
        <h2 className="text-2xl font-bold text-blue-900 text-center mb-4 font-sans">
          Got any Queries?
        </h2>
      )}

      {sent ? (
        <p className="text-blue-400 font-mono text-center font-bold text-2xl">
          Thanks! Your message <br /> has been sent & will Connect <br /> with you soon <FaHeart className="inline-block"/>
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            placeholder="Your name"
            className="bg-neutral-50 px-4 py-2 rounded-2xl shadow-2xl shadow-blue-800/40 outline-0"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Your email"
            className="bg-neutral-50 px-4 py-2 rounded-2xl shadow-2xl shadow-blue-800/40 outline-0"
          />
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Your message"
            className="bg-neutral-50 px-4 py-2 rounded-2xl shadow-2xl shadow-blue-800/30 outline-0"
          />
          <button
            disabled={loading}
            className="bg-blue-500 text-white py-2 mt-2 rounded-2xl font-semibold cursor-pointer flex items-center justify-center"
          >
            {loading ? <ButtonLoder/> : "Send"}
          </button>
        </form>
      )}
    </div>
    </div>
  );
}
