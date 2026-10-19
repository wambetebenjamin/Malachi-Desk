"use client";

import { ChatWidget } from "@/components/chat/ChatWidget";
import type { FaqEntry } from "@/lib/faq";
import { useDashboardStore, type DashboardTab } from "@/lib/dashboard-store";
import {
  RESOLUTION_PIE,
  TOP_CATEGORIES,
  VOLUME_30_DAYS,
  type Conversation,
} from "@/lib/mock";
import { signOut } from "next-auth/react";
import QRCode from "qrcode";
import { useCallback, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Stats = {
  today: number;
  week: number;
  month: number;
  resolutionRate: number;
  escalatedToday: number;
  avgResponseSeconds: number;
  topUnanswered: { question: string; count: number }[];
};

const TABS: { id: DashboardTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "conversations", label: "Conversations" },
  { id: "knowledge", label: "Knowledge Base" },
  { id: "customiser", label: "Widget Customiser" },
  { id: "embed", label: "Embed Code" },
  { id: "analytics", label: "Analytics" },
  { id: "tickets", label: "Ticket Inbox" },
];

const TICKETS = [
  { id: "ticket-501", visitor: "Wanjiru (Nairobi)", question: "Can you hold a room for a late check in on Friday?", time: "2026-10-19 10:24" },
  { id: "ticket-502", visitor: "Otis (Mombasa)", question: "My payment went through twice. How do I get a refund?", time: "2026-10-19 09:41" },
  { id: "ticket-503", visitor: "Mugisha (Kampala)", question: "Do you offer delivery outside the city centre?", time: "2026-10-18 16:08" },
];

export function DashboardApp({ userName, userEmail }: { userName: string; userEmail: string }) {
  const { tab, setTab, widgetConfig, setWidgetConfig } = useDashboardStore();
  const [stats, setStats] = useState<Stats | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [faqs, setFaqs] = useState<FaqEntry[]>([]);
  const [notice, setNotice] = useState("");

  // Knowledge base form
  const [editingId, setEditingId] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [a, setA] = useState("");

  // Embed + QR
  const [qr, setQr] = useState("");
  const [copied, setCopied] = useState(false);
  const widgetId =
    "md_" +
    (userEmail
      ? Array.from(userEmail).reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) % 99999999, 7).toString().padStart(8, "0")
      : "demo0001");
  const embedCode = `<script src="https://cdn.malachidesk.example.co.ke/widget.js" data-widget-id="${widgetId}" defer></script>`;
  const docsUrl = `${typeof window !== "undefined" ? window.location.origin : "https://malachidesk.example.co.ke"}/docs#embedding-the-widget`;

  // Tickets
  const [replyFor, setReplyFor] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyStatus, setReplyStatus] = useState("");

  const loadConversations = useCallback(async (p: number) => {
    const res = await fetch(`/api/dashboard/conversations?page=${p}&pageSize=8`);
    if (res.ok) {
      const data = await res.json();
      setConversations(data.items);
      setTotalPages(data.totalPages);
      setPage(data.page);
    }
  }, []);

  useEffect(() => {
    fetch("/api/dashboard/stats").then((r) => (r.ok ? r.json() : null)).then(setStats).catch(() => null);
    fetch("/api/dashboard/faq").then((r) => (r.ok ? r.json() : null)).then((d) => d && setFaqs(d.faqs)).catch(() => null);
    fetch("/api/dashboard/widget-config")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setWidgetConfig(d.config))
      .catch(() => null);
    loadConversations(1);
  }, [loadConversations, setWidgetConfig]);

  useEffect(() => {
    QRCode.toDataURL(docsUrl, { width: 180, margin: 1 }).then(setQr).catch(() => setQr(""));
  }, [docsUrl]);

  async function saveFaq(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/dashboard/faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, question: q, answer: a } : { question: q, answer: a }),
    });
    if (res.ok) {
      const data = await res.json();
      setFaqs(data.faqs);
      setQ("");
      setA("");
      setEditingId(null);
      setNotice(editingId ? "Entry updated. Your chatbot now uses the new answer." : "Entry added. Your chatbot can now answer this question.");
    } else {
      setNotice("We could not save that entry. Please check the text and try again.");
    }
  }

  async function deleteFaq(id: string) {
    const res = await fetch(`/api/dashboard/faq?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (res.ok) {
      const data = await res.json();
      setFaqs(data.faqs);
      setNotice("Entry deleted.");
    }
  }

  async function saveConfig(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/dashboard/widget-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(widgetConfig),
    });
    setNotice(res.ok ? "Widget settings saved. The preview shows your live look." : "We could not save those settings. Check the colour uses a hex value such as #171717.");
  }

  async function sendReply(ticketId: string) {
    const res = await fetch("/api/tickets/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticketId, message: replyText }),
    });
    if (res.ok) {
      const data = await res.json();
      setReplyStatus(data.delivery === "mock" ? "Reply recorded. Connect SMTP to deliver by email in production." : "Reply sent to the customer.");
      setReplyText("");
      setReplyFor(null);
    } else {
      setReplyStatus("We could not send that reply. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-16">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Business Dashboard</h1>
            <p className="mt-1 text-sm text-neutral-500">
              Signed in as {userName} ({userEmail}). Manage your Malachi Desk help desk.
            </p>
          </div>
          <button type="button" onClick={() => signOut({ callbackUrl: "/" })} className="rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 transition hover:border-neutral-900">
            Sign Out
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Dashboard sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={tab === t.id ? "rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white" : "rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-neutral-900"}
            >
              {t.label}
            </button>
          ))}
        </div>

        {notice && <p role="status" className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{notice}</p>}

        {tab === "overview" && (
          <section className="mt-8" aria-label="Overview">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Conversations today", value: stats ? String(stats.today) : "..." },
                { label: "This week", value: stats ? String(stats.week) : "..." },
                { label: "This month", value: stats ? String(stats.month) : "..." },
                { label: "Resolution rate", value: stats ? `${stats.resolutionRate}%` : "..." },
              ].map((c) => (
                <div key={c.label} className="rounded-2xl border border-neutral-200 bg-white p-5">
                  <p className="text-sm text-neutral-500">{c.label}</p>
                  <p className="mt-1 text-3xl font-bold text-neutral-900">{c.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="font-bold text-neutral-900">Top 5 Unanswered Questions</h2>
              <p className="mt-1 text-sm text-neutral-500">Add answers for these in the Knowledge Base to raise your resolution rate.</p>
              <ul className="mt-4 divide-y divide-neutral-100">
                {(stats?.topUnanswered || []).map((item) => (
                  <li key={item.question} className="flex items-center justify-between py-3 text-sm">
                    <span className="text-neutral-700">{item.question}</span>
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-700">{item.count} asks</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-neutral-400">Sample data for demonstration. Escalated today: {stats?.escalatedToday ?? "..."} | Average first response: {stats?.avgResponseSeconds ?? "..."} seconds.</p>
            </div>
          </section>
        )}

        {tab === "conversations" && (
          <section className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6" aria-label="Conversation log">
            <h2 className="font-bold text-neutral-900">Conversation Log</h2>
            <ul className="mt-4 divide-y divide-neutral-100">
              {conversations.map((c) => (
                <li key={c.id} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{c.visitor}</p>
                    <p className="text-sm text-neutral-500">{c.preview} | {c.channel}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-400">{c.time}</span>
                    <span className={c.status === "resolved" ? "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700" : "rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700"}>
                      {c.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between">
              <button type="button" disabled={page <= 1} onClick={() => loadConversations(page - 1)} className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold disabled:opacity-40">Previous</button>
              <p className="text-sm text-neutral-500">Page {page} of {totalPages}</p>
              <button type="button" disabled={page >= totalPages} onClick={() => loadConversations(page + 1)} className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold disabled:opacity-40">Next</button>
            </div>
          </section>
        )}

        {tab === "knowledge" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-5" aria-label="Knowledge base editor">
            <form onSubmit={saveFaq} className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 lg:col-span-2">
              <h2 className="font-bold text-neutral-900">{editingId ? "Edit Entry" : "Add Entry"}</h2>
              <label className="mt-4 block text-sm font-medium text-neutral-800" htmlFor="kb-q">Question</label>
              <input id="kb-q" value={q} onChange={(e) => setQ(e.target.value)} required minLength={3} className="mt-1.5 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900" placeholder="What are your opening hours?" />
              <label className="mt-4 block text-sm font-medium text-neutral-800" htmlFor="kb-a">Answer</label>
              <textarea id="kb-a" value={a} onChange={(e) => setA(e.target.value)} required minLength={3} rows={5} className="mt-1.5 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900" placeholder="We are open Monday to Saturday, 8am to 6pm." />
              <div className="mt-5 flex gap-2">
                <button type="submit" className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white">{editingId ? "Save Changes" : "Add Entry"}</button>
                {editingId && (
                  <button type="button" onClick={() => { setEditingId(null); setQ(""); setA(""); }} className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold">Cancel</button>
                )}
              </div>
              <p className="mt-3 text-xs text-neutral-400">Entries save to Vercel KV when configured, with an in memory fallback for local use.</p>
            </form>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 lg:col-span-3">
              <h2 className="font-bold text-neutral-900">Your Entries ({faqs.length})</h2>
              <ul className="mt-4 space-y-3">
                {faqs.map((f) => (
                  <li key={f.id} className="rounded-xl border border-neutral-200 p-4">
                    <p className="text-sm font-semibold text-neutral-900">{f.question}</p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">{f.answer}</p>
                    <div className="mt-3 flex gap-2">
                      <button type="button" onClick={() => { setEditingId(f.id); setQ(f.question); setA(f.answer); }} className="rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-semibold">Edit</button>
                      <button type="button" onClick={() => deleteFaq(f.id)} className="rounded-full border border-red-200 px-4 py-1.5 text-xs font-semibold text-red-600">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {tab === "customiser" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-2" aria-label="Widget customiser">
            <form onSubmit={saveConfig} className="h-fit rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="font-bold text-neutral-900">Widget Customiser</h2>
              <label className="mt-4 block text-sm font-medium text-neutral-800" htmlFor="w-name">Chatbot name</label>
              <input id="w-name" value={widgetConfig.botName} onChange={(e) => setWidgetConfig({ ...widgetConfig, botName: e.target.value })} className="mt-1.5 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900" />
              <label className="mt-4 block text-sm font-medium text-neutral-800" htmlFor="w-color">Primary colour</label>
              <div className="mt-1.5 flex items-center gap-3">
                <input id="w-color" type="color" value={widgetConfig.primaryColor} onChange={(e) => setWidgetConfig({ ...widgetConfig, primaryColor: e.target.value })} className="h-11 w-16 cursor-pointer rounded-lg border border-neutral-300" />
                <span className="text-sm text-neutral-600">{widgetConfig.primaryColor}</span>
              </div>
              <label className="mt-4 block text-sm font-medium text-neutral-800" htmlFor="w-welcome">Welcome message</label>
              <textarea id="w-welcome" value={widgetConfig.welcomeMessage} onChange={(e) => setWidgetConfig({ ...widgetConfig, welcomeMessage: e.target.value })} rows={3} className="mt-1.5 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900" />
              <label className="mt-4 block text-sm font-medium text-neutral-800" htmlFor="w-avatar">Avatar initial</label>
              <input id="w-avatar" value={widgetConfig.avatarInitial} maxLength={2} onChange={(e) => setWidgetConfig({ ...widgetConfig, avatarInitial: e.target.value })} className="mt-1.5 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900" />
              <button type="submit" className="mt-6 rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white">Save Settings</button>
            </form>
            <div className="flex flex-col items-center">
              <p className="mb-3 text-sm font-semibold text-neutral-700">Live preview</p>
              <ChatWidget key={widgetConfig.botName + widgetConfig.welcomeMessage} variant="inline" config={widgetConfig} />
            </div>
          </section>
        )}

        {tab === "embed" && (
          <section className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6" aria-label="Embed code generator">
            <h2 className="font-bold text-neutral-900">Embed Code</h2>
            <p className="mt-1 text-sm leading-relaxed text-neutral-500">Paste this one line before the closing body tag of your website. Your widget ID is unique to your account.</p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-neutral-900 p-4 text-sm text-neutral-100"><code>{embedCode}</code></pre>
            <button type="button" onClick={() => { navigator.clipboard?.writeText(embedCode); setCopied(true); }} className="mt-4 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white">
              {copied ? "Copied" : "Copy Embed Code"}
            </button>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div>
                <p className="text-sm font-semibold text-neutral-800">Scan for embed docs</p>
                <p className="mt-1 max-w-xs text-sm text-neutral-500">Point your phone camera at the code to open the embedding guide.</p>
              </div>
              {qr ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={qr} alt="QR code linking to the Malachi Desk embedding documentation" width={180} height={180} className="rounded-xl border border-neutral-200" />
              ) : (
                <p className="text-sm text-neutral-400">Generating QR code.</p>
              )}
            </div>
          </section>
        )}

        {tab === "analytics" && (
          <section className="mt-8 space-y-4" aria-label="Analytics">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="mb-4 font-bold text-neutral-900">Conversation Volume: Last 30 Days</h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={VOLUME_30_DAYS}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="day" fontSize={11} interval={4} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="conversations" stroke="#171717" strokeWidth={2} dot={false} isAnimationActive animationDuration={1200} name="Conversations" />
                    <Line type="monotone" dataKey="resolved" stroke="#059669" strokeWidth={2} dot={false} isAnimationActive animationDuration={1200} name="Resolved" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <h2 className="mb-4 font-bold text-neutral-900">Top Query Categories</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={TOP_CATEGORIES}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                      <XAxis dataKey="category" fontSize={11} interval={0} angle={-20} textAnchor="end" height={50} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#171717" radius={[6, 6, 0, 0]} isAnimationActive animationDuration={1200} name="Questions" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <h2 className="mb-4 font-bold text-neutral-900">Resolution vs Escalation</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={RESOLUTION_PIE} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} isAnimationActive animationDuration={1200} label>
                        <Cell fill="#171717" />
                        <Cell fill="#a3a3a3" />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-neutral-400">Sample data for demonstration.</p>
          </section>
        )}

        {tab === "tickets" && (
          <section className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6" aria-label="Ticket inbox">
            <h2 className="font-bold text-neutral-900">Ticket Inbox</h2>
            <p className="mt-1 text-sm text-neutral-500">Conversations the chatbot escalated to your team. Reply here and the customer is emailed.</p>
            {replyStatus && <p role="status" className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{replyStatus}</p>}
            <ul className="mt-4 space-y-3">
              {TICKETS.map((t) => (
                <li key={t.id} className="rounded-xl border border-neutral-200 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-neutral-900">{t.visitor}</p>
                    <span className="text-xs text-neutral-400">{t.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-600">{t.question}</p>
                  {replyFor === t.id ? (
                    <div className="mt-3">
                      <label className="sr-only" htmlFor={`reply-${t.id}`}>Reply to {t.visitor}</label>
                      <textarea id={`reply-${t.id}`} value={replyText} onChange={(e) => setReplyText(e.target.value)} rows={3} className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900" placeholder="Type your reply to the customer." />
                      <div className="mt-2 flex gap-2">
                        <button type="button" disabled={replyText.trim().length < 2} onClick={() => sendReply(t.id)} className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white disabled:opacity-40">Send Reply</button>
                        <button type="button" onClick={() => setReplyFor(null)} className="rounded-full border border-neutral-300 px-5 py-2 text-sm font-semibold">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <button type="button" onClick={() => { setReplyFor(t.id); setReplyStatus(""); }} className="mt-3 rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-semibold">Reply</button>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
