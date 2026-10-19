import faqData from "@/data/faq.json";

export type FaqEntry = {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
};

export const FAQS: FaqEntry[] = faqData.faqs as FaqEntry[];

const STOPWORDS = new Set([
  "what", "is", "the", "a", "an", "how", "do", "does", "can", "i", "you",
  "me", "my", "your", "it", "to", "for", "of", "in", "on", "and", "or",
  "please", "tell", "about", "much", "many",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s/]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

export function matchFaq(query: string, entries: FaqEntry[] = FAQS): FaqEntry | null {
  const q = query.toLowerCase().trim();
  if (!q) return null;
  const tokens = new Set(tokenize(q));

  let best: FaqEntry | null = null;
  let bestScore = 0;

  for (const entry of entries) {
    let score = 0;
    // Exact-ish phrase matches carry the most weight, unless the phrase is
    // only stopwords (for example "what is"), which would match everything.
    for (const kw of entry.keywords) {
      const kwTokens = tokenize(kw);
      if (kwTokens.length === 0) continue;
      if (q.includes(kw.toLowerCase())) score += 4 + kwTokens.length;
    }
    if (q.includes(entry.question.toLowerCase().replace("?", ""))) score += 8;
    // Token overlap with question and keywords.
    const haystack = new Set([
      ...tokenize(entry.question),
      ...entry.keywords.flatMap((k) => tokenize(k)),
    ]);
    for (const t of tokens) {
      if (haystack.has(t)) score += 2;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore >= 4 ? best : null;
}

export const FALLBACK_ANSWER =
  "Thanks for asking. I do not have a confident answer for that yet in this demo knowledge base. In a live deployment, I would create a ticket for the business team at this point. For Malachi Desk questions, you can also chat with our team on WhatsApp and we will help right away.";
