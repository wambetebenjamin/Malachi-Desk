import { FALLBACK_ANSWER, matchFaq } from "@/lib/faq";
import { getStoredFaqs } from "@/lib/store";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { message?: string };
    const message = (body.message || "").trim();
    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }
    if (message.length > 1000) {
      return NextResponse.json({ error: "Message is too long." }, { status: 400 });
    }
    // Server side search of the local knowledge base. No external AI API is called.
    const entries = await getStoredFaqs();
    const match = matchFaq(message, entries);
    if (match) {
      return NextResponse.json({ answer: match.answer, matched: true, matchedId: match.id, source: "faq" });
    }
    return NextResponse.json({ answer: FALLBACK_ANSWER, matched: false, matchedId: null, source: "fallback" });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
