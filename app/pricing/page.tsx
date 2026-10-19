import { PricingSection } from "@/components/Blocks/PricingSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Check, Minus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing: Malachi Desk",
  description: "Starter is free, Growth is KES 4,500 per month, and Enterprise is custom. Compare every feature.",
};

type Row = { feature: string; starter: string | boolean; growth: string | boolean; enterprise: string | boolean };

const ROWS: Row[] = [
  { feature: "Conversations per month", starter: "100", growth: "2,000", enterprise: "Unlimited" },
  { feature: "Chatbot widgets", starter: "1", growth: "1", enterprise: "Multiple" },
  { feature: "Knowledge base editor", starter: true, growth: true, enterprise: true },
  { feature: "English and Swahili replies", starter: true, growth: true, enterprise: true },
  { feature: "Ticket escalation to a human", starter: false, growth: true, enterprise: true },
  { feature: "Conversation history", starter: "30 days", growth: "12 months", enterprise: "Unlimited" },
  { feature: "Custom widget colours and name", starter: false, growth: true, enterprise: true },
  { feature: "Analytics dashboard", starter: "Basic", growth: "Full", enterprise: "Advanced with exports" },
  { feature: "WhatsApp integration", starter: false, growth: true, enterprise: true },
  { feature: "Support", starter: "Community", growth: "Priority email", enterprise: "Dedicated contact" },
];

const FAQS = [
  {
    q: "How does billing work?",
    a: "Growth is billed monthly at KES 4,500, or KES 3,600 per month on annual billing. We send an invoice each cycle and support common business payment methods in Kenya. Enterprise billing is agreed with our team based on volume and needs.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Yes. Cancel from your dashboard billing settings whenever you like. Your chatbot keeps working until the end of the current billing period, and there are no cancellation fees.",
  },
  {
    q: "How does the free trial work?",
    a: "The Starter plan is free forever with 100 conversations per month, and no credit card is required. Use it to test Malachi Desk on your live website, then upgrade when you outgrow it.",
  },
  {
    q: "Who owns my data?",
    a: "Your business owns its conversation data and knowledge base content. You can export your data from the dashboard, and we delete it on request if you close your account, in line with our Privacy Policy and the Kenya Data Protection Act 2019.",
  },
  {
    q: "What happens if I exceed my conversation limit?",
    a: "We notify you in the dashboard as you approach your limit. Upgrading to Growth raises the limit to 2,000 conversations, and Enterprise conversations are unlimited.",
  },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="mx-auto h-5 w-5 text-emerald-600" aria-label="Included" />;
  if (value === false) return <Minus className="mx-auto h-5 w-5 text-neutral-300" aria-label="Not included" />;
  return <span>{value}</span>;
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">Pricing</h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-600">
            Start free. Upgrade when your customers do.
          </p>
        </div>

        <PricingSection />

        <section className="mx-auto max-w-5xl py-16" aria-labelledby="compare-heading">
          <h2 id="compare-heading" className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Full Comparison
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-neutral-200">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="bg-neutral-50 text-left">
                  <th scope="col" className="px-5 py-4 font-semibold text-neutral-900">Feature</th>
                  <th scope="col" className="px-5 py-4 text-center font-semibold text-neutral-900">Starter (Free)</th>
                  <th scope="col" className="px-5 py-4 text-center font-semibold text-neutral-900">Growth (KES 4,500/mo)</th>
                  <th scope="col" className="px-5 py-4 text-center font-semibold text-neutral-900">Enterprise (Custom)</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.feature} className={i % 2 ? "bg-neutral-50/60" : "bg-white"}>
                    <th scope="row" className="px-5 py-3.5 text-left font-medium text-neutral-800">{row.feature}</th>
                    <td className="px-5 py-3.5 text-center text-neutral-600"><Cell value={row.starter} /></td>
                    <td className="px-5 py-3.5 text-center text-neutral-600"><Cell value={row.growth} /></td>
                    <td className="px-5 py-3.5 text-center text-neutral-600"><Cell value={row.enterprise} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto max-w-4xl py-8" aria-labelledby="pricing-faq-heading">
          <h2 id="pricing-faq-heading" className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Pricing Questions
          </h2>
          <Accordion defaultValue={["item-1"]}>
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i + 1}`}>
                <AccordionTrigger className="py-4 text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="mx-auto max-w-7xl py-16">
          <div className="rounded-3xl bg-neutral-900 px-6 py-12 text-center text-white">
            <h2 className="text-2xl font-bold sm:text-3xl">Start free today</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/75">100 conversations a month, no credit card required.</p>
            <Button className="mt-7 rounded-full bg-white px-7 text-neutral-900 hover:bg-neutral-100" render={<Link href="/auth/signup" />} nativeButton={false}>
              <span>Start Free Trial</span>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
