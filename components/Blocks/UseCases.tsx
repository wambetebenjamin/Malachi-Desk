"use client";

import { motion } from "motion/react";
import { BedDouble, GraduationCap, HeartPulse, Landmark, ShoppingBag } from "lucide-react";

const CASES = [
  {
    icon: ShoppingBag,
    title: "E-commerce Stores",
    text: "Answer delivery, stock and payment questions instantly, and recover sales that would otherwise be lost overnight.",
    examples: "Delivery timelines, returns, M-Pesa help",
  },
  {
    icon: GraduationCap,
    title: "Schools and Universities",
    text: "Handle admissions, fees and term date enquiries for parents and students without flooding the front office.",
    examples: "Fees, admissions, term dates",
  },
  {
    icon: HeartPulse,
    title: "Hospitals and Clinics",
    text: "Help patients find services, opening hours and booking steps quickly, while urgent matters reach your team fast.",
    examples: "Bookings, services, visiting hours",
  },
  {
    icon: Landmark,
    title: "SACCOs and Banks",
    text: "Guide members through account, loan and membership questions securely, and escalate sensitive cases to staff.",
    examples: "Loans, accounts, membership",
  },
  {
    icon: BedDouble,
    title: "Hotels and Hospitality",
    text: "Answer check in, parking and transfer questions at any hour, and turn late night browsers into confirmed guests.",
    examples: "Check in, amenities, transfers",
  },
];

export function UseCases() {
  return (
    <section className="mx-auto max-w-7xl py-16" aria-labelledby="usecases-heading">
      <div className="mb-14 text-center">
        <h2 id="usecases-heading" className="mb-4 text-4xl font-bold text-neutral-800 md:text-5xl">
          Built for the Businesses East Africa Runs On
        </h2>
        <p className="mx-auto max-w-3xl text-lg text-neutral-600 md:text-xl">
          If your customers ask repeat questions, Malachi Desk can answer them.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CASES.map((c, i) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.13, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800">
              <c.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-neutral-900">{c.title}</h3>
            <p className="text-sm leading-relaxed text-neutral-600">{c.text}</p>
            <p className="mt-4 border-t border-neutral-100 pt-3 text-xs font-medium text-neutral-500">
              Common questions: {c.examples}
            </p>
          </motion.article>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center rounded-2xl bg-neutral-900 p-6 text-white"
        >
          <h3 className="mb-2 text-lg font-bold">Your business here</h3>
          <p className="text-sm leading-relaxed text-white/80">
            Any website can add Malachi Desk in minutes. Start free and see your first automated answers today.
          </p>
          <a href="/auth/signup" className="mt-5 inline-flex w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100">
            Start Free Trial
          </a>
        </motion.div>
      </div>
    </section>
  );
}
