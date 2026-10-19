"use client";

import { motion } from "motion/react";
import { Code2, Database, Eye, SlidersHorizontal } from "lucide-react";

const STEPS = [
  {
    icon: Database,
    title: "1. Connect Your Knowledge Base",
    text: "Add your FAQs, prices, policies and service details in the editor. No technical skills needed.",
  },
  {
    icon: SlidersHorizontal,
    title: "2. Customise the Chatbot",
    text: "Set the name, colours, welcome message and avatar so the widget feels like part of your brand.",
  },
  {
    icon: Code2,
    title: "3. Embed on Your Site",
    text: "Paste one line of code before the closing body tag. The widget goes live in minutes.",
  },
  {
    icon: Eye,
    title: "4. Watch It Handle Queries",
    text: "Follow conversations, resolution rates and unanswered questions from your dashboard.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl py-16" aria-labelledby="how-heading">
      <div className="mb-14 text-center">
        <h2 id="how-heading" className="mb-4 text-4xl font-bold text-neutral-800 md:text-5xl">
          How It Works
        </h2>
        <p className="mx-auto max-w-3xl text-lg text-neutral-600 md:text-xl">
          From signup to a live help desk in four simple steps.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-white">
              <step.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mb-2 text-base font-bold text-neutral-900">{step.title}</h3>
            <p className="text-sm leading-relaxed text-neutral-600">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
