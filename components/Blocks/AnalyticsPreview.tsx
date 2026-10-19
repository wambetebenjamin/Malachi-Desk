"use client";

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

const VOLUME = [
  { day: "Mon", conversations: 32, resolved: 27 },
  { day: "Tue", conversations: 41, resolved: 35 },
  { day: "Wed", conversations: 38, resolved: 33 },
  { day: "Thu", conversations: 52, resolved: 45 },
  { day: "Fri", conversations: 47, resolved: 40 },
  { day: "Sat", conversations: 29, resolved: 25 },
  { day: "Sun", conversations: 24, resolved: 21 },
];

const TOP_QUERIES = [
  { query: "Pricing", count: 86 },
  { query: "Delivery", count: 64 },
  { query: "Bookings", count: 52 },
  { query: "Hours", count: 31 },
];

const RESOLUTION = [
  { name: "Resolved by chatbot", value: 86 },
  { name: "Escalated to human", value: 14 },
];
const PIE_COLORS = ["#171717", "#a3a3a3"];

export function AnalyticsPreview() {
  return (
    <section className="mx-auto max-w-7xl py-16" aria-labelledby="analytics-heading">
      <div className="mb-12 text-center">
        <h2 id="analytics-heading" className="mb-4 text-4xl font-bold text-neutral-800 md:text-5xl">
          See Exactly What Your Customers Ask
        </h2>
        <p className="mx-auto max-w-3xl text-lg text-neutral-600 md:text-xl">
          A live look at the Malachi Desk analytics dashboard. Sample data shown.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <p className="text-sm text-neutral-500">Conversations (7 days)</p>
          <p className="mt-1 text-3xl font-bold text-neutral-900">263</p>
          <p className="mt-1 text-xs font-medium text-emerald-600">Up 18% on last week</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <p className="text-sm text-neutral-500">Resolution rate</p>
          <p className="mt-1 text-3xl font-bold text-neutral-900">86%</p>
          <p className="mt-1 text-xs text-neutral-500">Answered without a human</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <p className="text-sm text-neutral-500">Top question</p>
          <p className="mt-1 text-xl font-bold text-neutral-900">How much does it cost?</p>
          <p className="mt-1 text-xs text-neutral-500">Asked 86 times this week</p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-5">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 lg:col-span-3">
          <h3 className="mb-4 text-sm font-semibold text-neutral-900">Conversation volume</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={VOLUME}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="conversations" stroke="#171717" strokeWidth={2} isAnimationActive animationDuration={1200} name="Conversations" />
                <Line type="monotone" dataKey="resolved" stroke="#059669" strokeWidth={2} isAnimationActive animationDuration={1200} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-neutral-900">Resolution vs escalation</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={RESOLUTION} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} isAnimationActive animationDuration={1200} label>
                  {RESOLUTION.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5">
        <h3 className="mb-4 text-sm font-semibold text-neutral-900">Top queries this week</h3>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={TOP_QUERIES} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis type="number" fontSize={12} />
              <YAxis type="category" dataKey="query" fontSize={12} width={80} />
              <Tooltip />
              <Bar dataKey="count" fill="#171717" radius={[0, 6, 6, 0]} isAnimationActive animationDuration={1200} name="Questions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
