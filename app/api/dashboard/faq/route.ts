import { auth } from "@/auth";
import { addStoredFaq, deleteStoredFaq, getStoredFaqs, updateStoredFaq } from "@/lib/store";
import { NextResponse } from "next/server";
import { z } from "zod";

const faqSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(3).max(300),
  answer: z.string().min(3).max(2000),
  keywords: z.array(z.string().max(60)).max(12).optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  const faqs = await getStoredFaqs();
  return NextResponse.json({ faqs });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  const parsed = faqSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please provide a valid question and answer." }, { status: 400 });
  }
  const { question, answer } = parsed.data;
  const keywords =
    parsed.data.keywords && parsed.data.keywords.length
      ? parsed.data.keywords
      : question.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter((w) => w.length > 2).slice(0, 6);

  if (parsed.data.id) {
    const faqs = await updateStoredFaq({ id: parsed.data.id, question, answer, keywords });
    return NextResponse.json({ faqs });
  }
  const id = `faq-${Date.now().toString(36)}`;
  const faqs = await addStoredFaq({ id, question, answer, keywords });
  return NextResponse.json({ faqs }, { status: 201 });
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Entry id is required." }, { status: 400 });
  const faqs = await deleteStoredFaq(id);
  return NextResponse.json({ faqs });
}
