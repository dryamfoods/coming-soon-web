const SITE_URL = "https://dryamfoods-web.vercel.app";
const LOGO_URL = `${SITE_URL}/dryam-logo.png`;
const TEAM_EMAIL = "info@dryamfoods.com";

export function waitlistConfirmEmail() {
  const text = [
    "You're on the DRYAM FOODS list.",
    "",
    "Thanks for signing up. We'll write when we open — premium garlic, onion, fried products & pure vegetable powders from Surat, Gujarat.",
    "",
    "Bulk & export inquiries: " + TEAM_EMAIL,
    "Surat, Gujarat, India",
    "© 2026 DRYAM FOODS",
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <title>You're on the DRYAM FOODS list</title>
</head>
<body style="margin:0;padding:0;background:#0E0B08;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0E0B08;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;background:#16110C;border:1px solid #A2968440;border-radius:4px;">
          <tr>
            <td align="center" style="padding:40px 32px 24px;">
              <img src="${LOGO_URL}" width="88" height="88" alt="DRYAM FOODS" style="display:block;border:0;border-radius:50%;outline:1px solid #E8A83A;" />
              <p style="margin:20px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:22px;letter-spacing:0.12em;color:#F4EDE1;text-transform:uppercase;">
                DRYAM FOODS
              </p>
              <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.18em;color:#E8A83A;text-transform:uppercase;">
                Est. Surat, Gujarat — Global Export
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px;">
              <div style="height:1px;background:linear-gradient(90deg,transparent,#E8A83A,transparent);opacity:0.55;"></div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.25;color:#F4EDE1;text-align:center;">
              You&rsquo;re on the list.
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#C9BFAF;text-align:center;">
              Thanks for signing up. We&rsquo;ll write when the new
              <strong style="color:#F4EDE1;">DRYAM FOODS</strong> experience opens —
              premium garlic, onion, fried products &amp; pure vegetable powders.
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0E0B08;border:1px solid #A2968440;border-radius:4px;">
                <tr>
                  <td style="padding:16px 20px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.55;color:#A29684;">
                    <strong style="color:#E8A83A;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;">What we make</strong><br />
                    <span style="color:#C9BFAF;">Garlic &amp; onion · Fried products · Pure vegetable powders</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 32px 40px;">
              <a href="mailto:${TEAM_EMAIL}" style="display:inline-block;padding:12px 22px;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:0.08em;text-decoration:none;color:#0E0B08;background:#E8A83A;border-radius:2px;text-transform:uppercase;">
                Bulk &amp; export inquiries
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 32px 36px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#7A7164;">
              Surat, Gujarat, India<br />
              <a href="mailto:${TEAM_EMAIL}" style="color:#E8A83A;text-decoration:none;">${TEAM_EMAIL}</a><br />
              <span style="color:#5C554C;">&copy; 2026 DRYAM FOODS</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { html, text };
}
