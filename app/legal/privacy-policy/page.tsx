import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy: Malachi Desk",
  description: "How Malachi Desk collects, uses and protects personal data under the Kenya Data Protection Act 2019 and GDPR aligned practices.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 pt-36 pb-16 leading-relaxed text-neutral-700">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Privacy Policy</h1>
        <p className="mt-3 text-sm text-neutral-500">Last updated: 19 October 2026. Malachi Desk, Nairobi, Kenya.</p>

        <h2 className="mt-10 text-xl font-bold text-neutral-900">1. Who we are</h2>
        <p className="mt-2">Malachi Desk is an AI powered help desk platform that businesses embed on their websites to answer customer questions automatically. In this policy, we means Malachi Desk, and you means a business customer, a website visitor, or an end user chatting with a Malachi Desk widget.</p>

        <h2 className="mt-8 text-xl font-bold text-neutral-900">2. What we collect</h2>
        <p className="mt-2">Account data: name, email address and business details you provide at sign up. Conversation data: questions and answers exchanged through widgets, timestamps, and whether a conversation was resolved or escalated. Knowledge base content: the FAQ entries a business adds. Technical data: device, browser and usage information needed to run and secure the service. We do not sell personal data.</p>

        <h2 className="mt-8 text-xl font-bold text-neutral-900">3. Why we use it</h2>
        <p className="mt-2">We use personal data to provide the help desk service, answer end user questions from the business knowledge base, escalate conversations to human agents, show analytics to the business, prevent abuse, and comply with the law. Our lawful bases include contract performance, legitimate interests in running a secure service, consent where required, and legal obligation.</p>

        <h2 className="mt-8 text-xl font-bold text-neutral-900">4. Kenya Data Protection Act 2019 and GDPR</h2>
        <p className="mt-2">We process personal data in line with the Kenya Data Protection Act 2019, overseen by the Office of the Data Protection Commissioner, and we align our practices with the EU General Data Protection Regulation for customers who need it. Where a business uses Malachi Desk on its website, that business is typically the data controller for its customers conversations, and Malachi Desk acts as data processor on its instructions.</p>

        <h2 className="mt-8 text-xl font-bold text-neutral-900">5. Your rights</h2>
        <p className="mt-2">You may request access to your personal data, correction of inaccurate data, deletion, restriction, portability, or objection to processing, subject to legal limits. Business customers can export conversation data from the dashboard and request full deletion on account closure. Contact us on WhatsApp at +254 112 272 061 to exercise any right, and we will respond within the timelines required by law.</p>

        <h2 className="mt-8 text-xl font-bold text-neutral-900">6. Sharing and storage</h2>
        <p className="mt-2">We share data only with service providers that help us run Malachi Desk, such as hosting, email delivery and storage providers, under contract and only as instructed. Data is encrypted in transit with HTTPS. We keep conversation data only as long as the business account needs it or the law requires.</p>

        <h2 className="mt-8 text-xl font-bold text-neutral-900">7. Cookies</h2>
        <p className="mt-2">We use necessary cookies to run the site, and optional functional, analytics and marketing cookies only with your consent. See our Cookie Policy for details and controls.</p>

        <h2 className="mt-8 text-xl font-bold text-neutral-900">8. Contact</h2>
        <p className="mt-2">Questions about this policy: message us on WhatsApp at +254 112 272 061. We will acknowledge your message promptly and work to resolve any concern.</p>
      </div>
    </main>
  );
}
