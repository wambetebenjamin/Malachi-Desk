"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import {
  BarChart3,
  Code2,
  History,
  Languages,
  MessageCircle,
  Palette,
  ShieldCheck,
  UserRound,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const TABS = ["Core Features", "Analytics", "Integrations", "Security"] as const;
type Tab = (typeof TABS)[number];

const CONTENT: Record<
  Tab,
  { intro: string; image: string; imageAlt: string; items: { icon: typeof Zap; title: string; text: string }[] }
> = {
  "Core Features": {
    intro: "The everyday tools that let one small team support hundreds of customers with confidence.",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "Customer support team working together in an office",
    items: [
      { icon: Zap, title: "Instant replies, 24/7", text: "Accurate answers in seconds at any hour, so no customer waits until morning for a simple answer." },
      { icon: Languages, title: "English and Swahili", text: "One knowledge base, two languages. Customers are answered in the language they write in." },
      { icon: UserRound, title: "Human escalation", text: "Unanswered questions become tickets with full history. Your team continues the conversation seamlessly." },
      { icon: History, title: "Conversation history", text: "Searchable records of every chat, so quality improves and nothing falls through the cracks." },
      { icon: Palette, title: "Your brand, your widget", text: "Name, colours, welcome message and avatar initial, all customisable with a live preview." },
    ],
  },
  Analytics: {
    intro: "Know what customers ask, what gets resolved, and where your knowledge base needs work.",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "Business owner reviewing work on a laptop",
    items: [
      { icon: BarChart3, title: "Conversation volume", text: "Daily, weekly and monthly totals with a 30 day trend chart, so busy periods never surprise you." },
      { icon: BarChart3, title: "Resolution rate", text: "See the share of questions answered automatically versus escalated to a human, at a glance." },
      { icon: BarChart3, title: "Top and unanswered queries", text: "Your most asked questions, plus the gaps to fill next in your knowledge base, ranked by demand." },
    ],
  },
  Integrations: {
    intro: "Malachi Desk fits the tools your business already uses, starting with your website and WhatsApp.",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "Team planning together around a table",
    items: [
      { icon: Code2, title: "One line website embed", text: "A single script tag works with WordPress, Shopify, Wix, custom sites and everything in between." },
      { icon: MessageCircle, title: "WhatsApp continuity", text: "Customers can move to WhatsApp without losing context, and your team keeps one history." },
      { icon: Code2, title: "Developer friendly", text: "Documented customisation options, mock API reference and webhook events for advanced teams." },
    ],
  },
  Security: {
    intro: "Customer conversations are sensitive. We treat them that way, by design.",
    image: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "Professionals discussing work in a modern office",
    items: [
      { icon: ShieldCheck, title: "Kenya Data Protection Act 2019", text: "Built to comply with Kenyan law, with GDPR aligned practices for businesses serving global customers." },
      { icon: ShieldCheck, title: "You own your data", text: "Your conversations and knowledge base belong to your business. Export or delete them on request." },
      { icon: ShieldCheck, title: "Protected access", text: "Dashboard access requires sign in, forms are protected by reCAPTCHA, and transport is encrypted with HTTPS." },
    ],
  },
};

export default function FeaturesPage() {
  const [tab, setTab] = useState<Tab>("Core Features");
  const content = CONTENT[tab];

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-36 pb-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">Features</h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-600">
            Everything Malachi Desk does for your customers and your team, in detail.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Feature categories">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={
                tab === t
                  ? "rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white"
                  : "rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-700 transition hover:border-neutral-900"
              }
            >
              {t}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mx-auto mt-8 max-w-2xl text-center text-neutral-600">{content.intro}</p>
            <div className="relative mt-8 h-72 overflow-hidden rounded-3xl sm:h-96">
              <Image src={content.image} alt={content.imageAlt} fill sizes="100vw" className="object-cover" />
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {content.items.map((item) => (
                <article key={item.title} className="rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-lg">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900 text-white">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 className="mb-2 font-bold text-neutral-900">{item.title}</h2>
                  <p className="text-sm leading-relaxed text-neutral-600">{item.text}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 rounded-3xl bg-neutral-900 px-6 py-12 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">See these features working live</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">Try the demo widget, then start free on your own site.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button className="rounded-full bg-white px-6 text-neutral-900 hover:bg-neutral-100" render={<Link href="/demo" />} nativeButton={false}>
              <span>Live Demo</span>
            </Button>
            <Button variant="outline" className="rounded-full border-white/40 bg-transparent px-6 text-white hover:bg-white/10" render={<Link href="/auth/signup" />} nativeButton={false}>
              <span>Start Free Trial</span>
            </Button>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-neutral-400">Photos from Pexels. See image-credits.md for sources.</p>
      </div>
    </main>
  );
}
