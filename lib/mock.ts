export const DASHBOARD_STATS = {
  today: 47,
  week: 312,
  month: 1248,
  resolutionRate: 86,
  escalatedToday: 6,
  avgResponseSeconds: 2,
  topUnanswered: [
    { question: "Do you deliver to Eldoret on Sundays?", count: 14 },
    { question: "Can I pay school fees in instalments?", count: 11 },
    { question: "What documents do I need for a SACCO loan?", count: 9 },
    { question: "Is parking available at the clinic?", count: 7 },
    { question: "Do you offer group discounts for bookings?", count: 5 },
  ],
};

export type Conversation = {
  id: string;
  visitor: string;
  preview: string;
  time: string;
  status: "resolved" | "escalated";
  channel: string;
};

const VISITORS = [
  "Wanjiru (Nairobi)", "Otis (Mombasa)", "Achieng (Kisumu)", "Kamau (Nakuru)",
  "Fatuma (Dar es Salaam)", "Mugisha (Kampala)", "Nyambura (Thika)", "Baraka (Arusha)",
  "Chebet (Eldoret)", "Maina (Meru)", "Zawadi (Malindi)", "Kiptoo (Kericho)",
];
const PREVIEWS = [
  "Asked about Growth plan pricing",
  "Asked for delivery timelines",
  "Asked about Swahili support",
  "Asked how to book an appointment",
  "Asked about loan requirements",
  "Asked about school fee structure",
  "Asked to speak to a person",
  "Asked about opening hours",
];

export const ALL_CONVERSATIONS: Conversation[] = Array.from({ length: 24 }, (_, i) => ({
  id: `conv-${1000 + i}`,
  visitor: VISITORS[i % VISITORS.length],
  preview: PREVIEWS[i % PREVIEWS.length],
  time: `2026-10-${String(19 - (i % 9)).padStart(2, "0")} ${String(9 + (i % 9)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`,
  status: i % 5 === 3 ? "escalated" : "resolved",
  channel: i % 4 === 2 ? "WhatsApp" : "Website widget",
}));

export const VOLUME_30_DAYS = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  conversations: 28 + Math.round(14 * Math.sin(i / 4) + (i % 7) * 2 + (i > 20 ? 10 : 0)),
  resolved: 22 + Math.round(11 * Math.sin(i / 4) + (i % 5) * 2 + (i > 20 ? 8 : 0)),
}));

export const TOP_CATEGORIES = [
  { category: "Pricing", count: 342 },
  { category: "Bookings", count: 268 },
  { category: "Delivery", count: 197 },
  { category: "Account help", count: 154 },
  { category: "Fees and payments", count: 121 },
  { category: "Opening hours", count: 89 },
];

export const RESOLUTION_PIE = [
  { name: "Resolved by chatbot", value: 86 },
  { name: "Escalated to human", value: 14 },
];

export const TICKETS = [
  {
    id: "ticket-501",
    visitor: "Wanjiru (Nairobi)",
    question: "Can you hold a room for a late check in on Friday?",
    time: "2026-10-19 10:24",
    email: "guest@example.com",
  },
  {
    id: "ticket-502",
    visitor: "Otis (Mombasa)",
    question: "My payment went through twice. How do I get a refund?",
    time: "2026-10-19 09:41",
    email: "customer@example.com",
  },
  {
    id: "ticket-503",
    visitor: "Mugisha (Kampala)",
    question: "Do you offer delivery outside the city centre?",
    time: "2026-10-18 16:08",
    email: "buyer@example.com",
  },
];
