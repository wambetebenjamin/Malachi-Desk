import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy: Malachi Desk",
  description: "The cookies Malachi Desk uses, why, and how to control them.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 pt-36 pb-16 leading-relaxed text-neutral-700">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Cookie Policy</h1>
        <p className="mt-3 text-sm text-neutral-500">Last updated: 19 October 2026. Malachi Desk, Nairobi, Kenya.</p>

        <h2 className="mt-10 text-xl font-bold text-neutral-900">1. What cookies are</h2>
        <p className="mt-2">Cookies are small files stored by your browser. We also use local storage for preferences such as your cookie consent choice, saved under the key malachi_desk_consent.</p>

        <h2 className="mt-8 text-xl font-bold text-neutral-900">2. Categories we use</h2>
        <p className="mt-2"><strong>Necessary:</strong> required for sign in, security and core features. Always on. <strong>Functional:</strong> remember preferences such as widget settings. <strong>Analytics:</strong> help us understand which pages help customers most, only with consent. <strong>Marketing:</strong> measure campaign effectiveness, only with consent.</p>

        <h2 className="mt-8 text-xl font-bold text-neutral-900">3. Your choices</h2>
        <p className="mt-2">Use the cookie banner on this site to accept all cookies, reject optional cookies, or customise each category. You can also clear cookies and local storage in your browser settings at any time, and the banner will ask again on your next visit.</p>

        <h2 className="mt-8 text-xl font-bold text-neutral-900">4. Legal basis</h2>
        <p className="mt-2">Optional cookies run only with your consent, in line with the Kenya Data Protection Act 2019 and GDPR aligned practice. Necessary cookies run because the site cannot function or stay secure without them.</p>

        <h2 className="mt-8 text-xl font-bold text-neutral-900">5. Contact</h2>
        <p className="mt-2">Questions about cookies: WhatsApp +254 112 272 061.</p>
      </div>
    </main>
  );
}
