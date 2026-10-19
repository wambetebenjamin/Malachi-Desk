import nodemailer from "nodemailer";

export async function sendMail(opts: { to: string; subject: string; text: string }) {
  const host = process.env.SMTP_HOST;
  if (!host) {
    // Local and preview environments without SMTP still succeed as a logged mock send.
    console.log("[mail:mock]", opts.subject, "to", opts.to);
    return { sent: true, mock: true as const };
  }
  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
  });
  return { sent: true, mock: false as const };
}
