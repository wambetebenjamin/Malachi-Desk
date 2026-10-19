import { sendMail } from "@/lib/mail";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
  recaptchaToken: z.string().optional(),
});

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please complete all fields with valid details." }, { status: 400 });
  }
  const check = await verifyRecaptcha(parsed.data.recaptchaToken);
  if (!check.success || check.score < 0.5) {
    return NextResponse.json(
      { error: "Verification failed. Please try again or message us on WhatsApp.", needsFallback: true },
      { status: 400 }
    );
  }
  const to = process.env.SMTP_FROM || process.env.SMTP_USER || "hello@malachidesk.example.co.ke";
  await sendMail({
    to,
    subject: `[Website contact] ${parsed.data.subject}`,
    text: `From: ${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`,
  });
  return NextResponse.json({ ok: true });
}
