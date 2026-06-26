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
       <body style="margin:0;padding:40px 20px;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <table
            role="presentation"
            width="600"
            cellspacing="0"
            cellpadding="0"
            style="background:#ffffff;border-radius:16px;padding:40px;border:1px solid #e5e7eb;box-shadow:0 10px 30px rgba(0,0,0,0.05);"
          >
            <tr>
              <td align="center">
                <div style="font-size:48px;">🎉</div>

                <h1 style="margin:16px 0 8px;font-size:30px;color:#111827;">Your Template is Ready!</h1>

                <p style="margin:0;color:#6b7280;font-size:16px;line-height:26px;">
                  Thank you for purchasing from <strong>Affinote</strong>.
                  <br />
                  Click the button below to access your template instantly.
                </p>

                <div style="margin:35px 0;">
                  <a
                    href="${link}"
                    style="
background:#4169E1;
color:#ffffff;
padding:15px 34px;
text-decoration:none;
font-size:16px;
font-weight:bold;
border-radius:10px;
display:inline-block;"
                  >
                    View Your Page
                  </a>
                </div>

                <hr style="border:none;border-top:1px solid #e5e7eb;margin:30px 0;" />

                <p style="font-size:14px;color:#6b7280;margin-bottom:10px;text-align:center;">
                  If the button above doesn't work, copy the link below:
                </p>

                <div style="text-align:center;">
                  <table
                    role="presentation"
                    cellpadding="0"
                    cellspacing="0"
                    style="display:inline-table;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:8px;max-width:100%;"
                  >
                    <tr>
                      <td
                        style="padding:14px;font-family:monospace;font-size:12px;color:#111827;word-break:break-all;text-align:center;"
                      >
                        ${link}
                      </td>
                    </tr>
                  </table>
                </div>

                <div style="margin-top:40px;">
                  <h2 style="margin-bottom:10px;color:#111827;">❤️ Share it with Someone Special</h2>

                  <p style="color:#6b7280;line-height:24px;">
                    If you love your page, we'd really appreciate it if you shared it with your friends or someone
                    special.
                  </p>
                </div>

                <div
                  style="
margin-top:30px;
padding:20px;
background:#f9fafb;
border-radius:12px;
border:1px solid #e5e7eb;
"
                >
                  <h3 style="margin-top:0;color:#111827;">⭐ We'd Love Your Feedback</h3>

                  <p style="margin-bottom:0;color:#6b7280;line-height:24px;">
                    Your feedback helps us improve Affinote and create even better templates. If you have a minute, we'd
                    love to hear what you think.
                  </p>
                </div>

                <p style="margin-top:40px;color:#9ca3af;font-size:13px;">Made with love by the Affinote team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    </body>

    `
  });
  if (error) {
    console.error("Email send error:", error)
  }
}