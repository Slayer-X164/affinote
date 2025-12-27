import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
     console.log("📩 Contact API hit");
  try {
    const { name, email, message } = await req.json();
    console.log("📦 Payload:", name,email,message);

    if (!email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await resend.emails.send({
      from: "Affinote <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `💌 New message from ${name || "Affinote visitor"}`,
      html: `
        <div style="font-family: Arial, sans-serif">
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name || "-"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });
     console.log("✅ Resend result:", result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("🔥 Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
