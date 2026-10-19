import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation: Malachi Desk",
  description: "Quick start, embedding, customisation, API reference and webhook events for Malachi Desk.",
};

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-neutral-900 p-4 text-sm leading-relaxed text-neutral-100">
      <code>{children}</code>
    </pre>
  );
}

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 pt-36 pb-16">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">Developer Documentation</h1>
        <p className="mt-5 leading-relaxed text-neutral-600">
          Everything you need to embed and customise Malachi Desk. Most businesses never need code beyond one script tag.
        </p>

        <nav className="mt-8 flex flex-wrap gap-2" aria-label="Documentation sections">
          {["Quick Start", "Embedding the Widget", "Customisation Options", "API Reference (mock)", "Webhook Events (mock)", "FAQ"].map((s) => (
            <a key={s} href={`#${s.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="rounded-full border border-neutral-300 px-4 py-1.5 text-sm font-medium text-neutral-700 transition hover:border-neutral-900">
              {s}
            </a>
          ))}
        </nav>

        <section id="quick-start" className="mt-14 scroll-mt-28">
          <h2 className="mb-3 text-2xl font-bold text-neutral-900">Quick Start</h2>
          <ol className="list-decimal space-y-2 pl-6 leading-relaxed text-neutral-700">
            <li>Create your free account on the sign up page.</li>
            <li>Add question and answer entries in the Knowledge Base editor.</li>
            <li>Customise the widget name, colour and welcome message.</li>
            <li>Copy your embed code and paste it into your website.</li>
            <li>Watch conversations arrive in your dashboard.</li>
          </ol>
        </section>

        <section id="embedding-the-widget" className="mt-12 scroll-mt-28">
          <h2 className="mb-3 text-2xl font-bold text-neutral-900">Embedding the Widget</h2>
          <p className="mb-4 leading-relaxed text-neutral-700">
            Paste this one line before the closing body tag of your website. Replace YOUR_WIDGET_ID with the ID from your dashboard Embed Code section.
          </p>
          <Code>{`<script src="https://cdn.malachidesk.example.co.ke/widget.js" data-widget-id="YOUR_WIDGET_ID" defer></script>`}</Code>
          <p className="mt-4 leading-relaxed text-neutral-700">
            The widget loads asynchronously, appears at the bottom right, and never slows down your page. It works on WordPress, Shopify, Wix and custom websites.
          </p>
        </section>

        <section id="customisation-options" className="mt-12 scroll-mt-28">
          <h2 className="mb-3 text-2xl font-bold text-neutral-900">Customisation Options</h2>
          <p className="mb-4 leading-relaxed text-neutral-700">Set these in the Widget Customiser, or pass them as data attributes:</p>
          <Code>{`<script
  src="https://cdn.malachidesk.example.co.ke/widget.js"
  data-widget-id="YOUR_WIDGET_ID"
  data-bot-name="Malachi Desk"
  data-color="#171717"
  data-welcome="Hello, how can we help?"
  defer
></script>`}</Code>
          <ul className="mt-4 list-disc space-y-1 pl-6 text-neutral-700">
            <li><strong>botName:</strong> the name shown in the widget header.</li>
            <li><strong>primaryColor:</strong> hex colour for the header and buttons.</li>
            <li><strong>welcomeMessage:</strong> the first message customers see.</li>
            <li><strong>avatarInitial:</strong> one or two letters shown as the avatar.</li>
          </ul>
        </section>

        <section id="api-reference-mock-" className="mt-12 scroll-mt-28">
          <h2 className="mb-3 text-2xl font-bold text-neutral-900">API Reference (mock)</h2>
          <p className="mb-4 leading-relaxed text-neutral-700">
            The endpoints below are illustrative for planning integrations. The live demo endpoint on this site is POST /api/chat/message.
          </p>
          <Code>{`POST /api/chat/message
Content-Type: application/json

{ "message": "How much does it cost?" }

Response:
{ "answer": "...", "matched": true, "matchedId": "pricing", "source": "faq" }`}</Code>
          <div className="mt-4 space-y-3">
            <Code>{`GET  /v1/conversations?page=1        (mock) List conversations
GET  /v1/conversations/{id}          (mock) Get one conversation
POST /v1/knowledge-base              (mock) Add an FAQ entry
GET  /v1/analytics/summary           (mock) Resolution and volume summary`}</Code>
          </div>
        </section>

        <section id="webhook-events-mock-" className="mt-12 scroll-mt-28">
          <h2 className="mb-3 text-2xl font-bold text-neutral-900">Webhook Events (mock)</h2>
          <p className="mb-4 leading-relaxed text-neutral-700">Example events a deployed integration can subscribe to:</p>
          <Code>{`conversation.started      A visitor opens the widget
conversation.resolved     The chatbot answers successfully
conversation.escalated    A ticket is created for your team
ticket.replied            Your team replies to a ticket`}</Code>
          <Code>{`{
  "event": "conversation.escalated",
  "conversationId": "conv-1042",
  "question": "Can I pay in instalments?",
  "createdAt": "2026-10-19T10:24:00Z"
}`}</Code>
        </section>

        <section id="faq" className="mt-12 scroll-mt-28">
          <h2 className="mb-3 text-2xl font-bold text-neutral-900">FAQ</h2>
          <div className="space-y-4 leading-relaxed text-neutral-700">
            <p><strong>Do I need a developer?</strong> No. Embedding is one copied line, and everything else happens in the dashboard.</p>
            <p><strong>Will the widget slow down my site?</strong> No. It loads after your page and only when needed.</p>
            <p><strong>Can I use my own domain for the widget?</strong> Enterprise plans can discuss custom hosting with our team.</p>
            <p><strong>Where can I get help?</strong> Message us on WhatsApp at +254 112 272 061, or visit the <Link href="/contact" className="font-medium text-neutral-900 underline underline-offset-2">Contact page</Link>.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
