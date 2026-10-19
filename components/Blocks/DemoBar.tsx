"use client";

import { ChatWidget } from "@/components/chat/ChatWidget";
import { motion } from "motion/react";
import { Check } from "lucide-react";

const POINTS = [
  "Answers from a real knowledge base, not guesswork",
  "English and Swahili, day and night",
  "Hands over to your team when a human is needed",
];

export function DemoBar() {
  return (
    <section id="live-demo" className="mx-auto max-w-7xl scroll-mt-28 py-16" aria-labelledby="demo-heading">
      <div className="grid items-center gap-10 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-sm font-semibold tracking-wide text-emerald-700 uppercase">Live demo</p>
          <h2 id="demo-heading" className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
            Try the Product Right Here
          </h2>
          <p className="mb-6 leading-relaxed text-neutral-600">
            This is a working Malachi Desk widget answering questions about Malachi Desk itself. Ask about pricing, languages, embedding, privacy, or starting a free trial. On your website, it would answer from your own knowledge base instead.
          </p>
          <ul className="space-y-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-neutral-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-neutral-500">
            Tip: tap a suggestion below the chat, or open the full Demo page for voice input.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <ChatWidget variant="inline" />
        </motion.div>
      </div>
    </section>
  );
}
