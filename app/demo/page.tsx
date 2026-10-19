import { ChatWidget } from "@/components/chat/ChatWidget";
import { Button } from "@/components/ui/button";
import { BookOpen, Building2, Mic, MousePointerClick } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Live Demo: Malachi Desk",
  description: "Try the Malachi Desk chatbot live. Ask about pricing, languages, embedding and privacy.",
};

const TOPICS = [
  "Pricing and plans: Starter, Growth and Enterprise",
  "How embedding and setup work",
  "English and Swahili language support",
  "Escalation to a human agent and tickets",
  "Data privacy and the Kenya Data Protection Act",
  "Free trial, billing and cancellation",
];

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-36 pb-8">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-wide text-emerald-700 uppercase">Live demo</p>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Experience Malachi Desk as Your Customers Would
            </h1>
            <p className="mt-5 leading-relaxed text-neutral-600">
              The widget on this page is the real product component, answering from a local knowledge base about Malachi Desk. No external AI service is called. Every answer comes from our FAQ file, exactly as it would from your own business content.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white">
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-bold text-neutral-900">What this demo knows</h2>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-600">
                    {TOPICS.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white">
                  <MousePointerClick className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-bold text-neutral-900">How to ask</h2>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                    Type a question, tap a suggestion chip, or use the microphone button for voice input. Voice only starts when you tap it. Try: How much does it cost? If you ask something outside the knowledge base, the bot explains the fallback and offers WhatsApp, just as it would for your customers.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white">
                  <Building2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-bold text-neutral-900">What your version looks like</h2>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                    On your site, the same widget carries your business name, your colours and your answers. Your team manages everything from the dashboard, and only joins conversations that need a human.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button className="rounded-full px-6" render={<Link href="/auth/signup" />} nativeButton={false}>
                <span>Start Free Trial</span>
              </Button>
              <Button variant="outline" className="rounded-full px-6" render={<Link href="/dashboard" />} nativeButton={false}>
                <span>Open the Dashboard</span>
              </Button>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
              <Mic className="h-3.5 w-3.5" aria-hidden="true" />
              Voice input uses your browser speech recognition and only runs when you tap the microphone.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="sticky top-28">
              <ChatWidget variant="inline" />
              <p className="mt-3 text-center text-xs text-neutral-400">Live demo widget. Answers from the Malachi Desk knowledge base.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
