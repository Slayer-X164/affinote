import { Resend } from "resend";
import { NextResponse } from "next/server";
import { contactLimiter } from "@/lib/ratelimit";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {

  try {
    // rate limit
    const ip = req.headers.get("x-forwarded-for") ?? "unknown"
    console.log("ip:", ip);

    const { success: rateLimitSucces } = await contactLimiter.limit(ip)

    if (!rateLimitSucces) {
      return Response.json({
        error: "Too many requests! , try again in a minute"
      }, {
        status: 429
      })
    }

    const { name, email, message } = await req.json();


    if (!email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await resend.emails.send({
      from: "Affinote <contact@affinote.site>",
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `To Team Affinote - Message from ${name || "Affinote visitor"}`,
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


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("🔥 Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
