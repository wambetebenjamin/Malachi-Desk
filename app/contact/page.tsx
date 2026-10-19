"use client";

import { WHATSAPP_LINK } from "@/lib/site";
import { getRecaptchaToken } from "@/components/site/Recaptcha";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Enter your name."),
  email: z.string().email("Enter a valid email address."),
  subject: z.string().min(2, "Enter a subject."),
  message: z.string().min(10, "Tell us a little more (10 characters or more)."),
});
type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "busy" | "sent" | "error">("idle");
  const [fallbackNeeded, setFallbackNeeded] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus("busy");
    try {
      const recaptchaToken = await getRecaptchaToken("contact");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, recaptchaToken }),
      });
      const data = (await res.json().catch(() => ({}))) as { needsFallback?: boolean };
      if (!res.ok) {
        if (data.needsFallback) setFallbackNeeded(true);
        setStatus("error");
        return;
      }
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 pt-36 pb-16">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Contact Us</h1>
        <p className="mt-4 leading-relaxed text-neutral-600">
          Questions about plans, setup or a custom deployment? Send a message, or reach us instantly on WhatsApp.
        </p>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-95">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp: +254 112 272 061
        </a>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-neutral-800">Name</label>
              <input id="name" {...register("name")} className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900" placeholder="Your name" />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-800">Email</label>
              <input id="email" type="email" {...register("email")} className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900" placeholder="you@business.co.ke" />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-neutral-800">Subject</label>
            <input id="subject" {...register("subject")} className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900" placeholder="How can we help?" />
            {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>}
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-neutral-800">Message</label>
            <textarea id="message" rows={5} {...register("message")} className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900" placeholder="Tell us about your business and what you need." />
            {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
          </div>

          {fallbackNeeded && (
            <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Verification needs another check. Please message us on WhatsApp at +254 112 272 061 and we will help right away.
            </p>
          )}
          {status === "sent" && (
            <p role="status" className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              Thank you. Your message has been sent, and we will reply shortly.
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              We could not send your message. Please try again, or use WhatsApp above. See also our <Link href="/legal/privacy-policy" className="underline">Privacy Policy</Link>.
            </p>
          )}

          <button type="submit" disabled={status === "busy"} className="rounded-full bg-neutral-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:opacity-50">
            {status === "busy" ? "Sending." : "Send Message"}
          </button>
          <p className="text-xs text-neutral-400">Protected by reCAPTCHA v3, with a fallback if verification scores low.</p>
        </form>
      </div>
    </main>
  );
}
