import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTemplateEmail(email: string, instanceId: string) {
  const link = `https://affinote.site/v/${instanceId}`;
  if (!email || !instanceId) {
    return Response.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  const { error } = await resend.emails.send({
    from: "Affinote <contact@affinote.site>",
    to: email,
    subject: "Your Affinote page is ready 💌",
    html: `
      <h2>Thank You for the purchase!</h2>

      <a href="${link}" style="
        padding:12px 20px;
        background:#16a34a;
        color:white;
        text-decoration:none;
        border-radius:6px;
        display:inline-block;
      ">
        Open your page
      </a>

      <p>Or copy this link: ${link}</p>

      <h1>Share it with someone special ❤️</h1>
      <h2>Please leave a review or feedback !</h2>

    `
  });
  if (error) {
    console.error("Email send error:", error)
  }
}