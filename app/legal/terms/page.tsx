import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service: Malachi Desk",
  description: "The terms that govern use of the Malachi Desk AI help desk platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 pt-36 pb-16 leading-relaxed text-neutral-700">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Terms of Service</h1>
        <p className="mt-3 text-sm text-neutral-500">Last updated: 19 October 2026. Malachi Desk, Nairobi, Kenya.</p>

        <h2 className="mt-10 text-xl font-bold text-neutral-900">1. The service</h2>
        <p className="mt-2">Malachi Desk provides an embeddable AI help desk widget, a knowledge base editor, analytics, and ticket escalation tools. By creating an account or embedding the widget, you agree to these terms.</p>

        <h2 className="mt-8 text-xl font-bold text-neutral-900">2. Accounts</h2>
        <p className="mt-2">You are responsible for your account credentials and for activity under your account. Provide accurate information, keep your password secure, and tell us promptly about unauthorised use.</p>

        <h2 className="mt-8 text-xl font-bold text-neutral-900">3. Plans and billing</h2>
        <p className="mt-2">Starter is free with 100 conversations per month. Growth costs KES 4,500 per month, or KES 3,600 per month on annual billing, with 2,000 conversations per month. Enterprise pricing is custom with unlimited conversations. Paid plans renew each cycle until cancelled. You may cancel at any time from your dashboard, effective at the end of the current billing period, with no cancellation fees.</p>

        <h2 className="mt-8 text-xl font-bold text-neutral-900">4. Your content and data</h2>
        <p className="mt-2">You own your knowledge base content and conversation data. You grant us the licence needed to host, process and display that content to operate the service. You are responsible for ensuring your knowledge base answers are accurate and lawful for your customers.</p>

        <h2 className="mt-8 text-xl font-bold text-neutral-900">5. Acceptable use</h2>
        <p className="mt-2">Do not use Malachi Desk to send spam, break the law, infringe rights, or mislead customers about the nature of automated replies. We may suspend accounts that abuse the service or endanger its security.</p>

        <h2 className="mt-8 text-xl font-bold text-neutral-900">6. Availability and liability</h2>
        <p className="mt-2">We work to keep Malachi Desk available around the clock, but the service is provided as is without a guarantee of uninterrupted operation. To the extent allowed by Kenyan law, our liability for the service is limited to the amount you paid in the three months before a claim.</p>

        <h2 className="mt-8 text-xl font-bold text-neutral-900">7. Changes and contact</h2>
        <p className="mt-2">We may update these terms and will note the new date on this page. Continued use after an update means you accept the revised terms. Questions: WhatsApp +254 112 272 061.</p>
      </div>
    </main>
  );
}
