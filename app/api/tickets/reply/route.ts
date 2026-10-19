import { auth } from "@/auth";
import { sendMail } from "@/lib/mail";
import { TICKETS } from "@/lib/mock";
import { NextResponse } from "next/server";
import { z } from "zod";

const replySchema = z.object({
  ticketId: z.string().min(1),
  message: z.string().min(2).max(4000),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  const parsed = replySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please provide a ticket and a reply message." }, { status: 400 });
  }
  const ticket = TICKETS.find((t) => t.id === parsed.data.ticketId);
  const to = ticket?.email || "customer@example.com";
  const result = await sendMail({
    to,
    subject: `Re: Your support conversation (${parsed.data.ticketId})`,
    text: parsed.data.message,
  });
  return NextResponse.json({ ok: true, ticketId: parsed.data.ticketId, delivery: result.mock ? "mock" : "smtp" });
}
