export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  author: string;
  body: string[];
  image: string;
};

export const POSTS: BlogPost[] = [
  {
    slug: "answer-customers-while-you-sleep",
    title: "How to Answer Customers While You Sleep",
    date: "12 September 2026",
    category: "Customer Support",
    excerpt:
      "Most customer questions arrive after closing time. Here is how East African businesses use an always on help desk to answer them instantly and win the sale the next morning.",
    author: "Amina Odhiambo",
    image:
      "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200",
    body: [
      "For many growing businesses, the busiest enquiry hours start after the shop closes. A customer browsing at 10 in the evening wants to know a price, a delivery option, or whether an item is in stock. If nobody answers, they buy from someone else.",
      "An AI help desk changes that pattern. It sits on your website, answers the repeat questions your team hears every day, and saves the rest as tickets for the morning. Customers get an instant, helpful reply, and your team starts the day with a tidy inbox instead of a backlog.",
      "Start small. Add your top twenty questions, check the unanswered questions report each week, and keep improving your knowledge base. Within a month, most businesses find that the majority of routine enquiries no longer need a person at all.",
    ],
  },
  {
    slug: "swahili-english-support-one-widget",
    title: "Serving Customers in Swahili and English with One Widget",
    date: "28 August 2026",
    category: "Product",
    excerpt:
      "Your customers switch languages naturally, and your help desk should too. A look at bilingual support and why it builds trust across Kenya and East Africa.",
    author: "Baraka Njoroge",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200",
    body: [
      "In Kenya, a single conversation often moves between English and Swahili. A help desk that only handles one language forces customers to work harder, and many simply leave.",
      "Malachi Desk replies in English and Swahili from one knowledge base. You write your answers once, and the chatbot responds in the language your customer used. That small detail signals respect, and it measurably improves completion rates for bookings, orders and applications.",
      "Bilingual support also helps your team. Escalated tickets arrive with full history, so agents can continue in the same language without asking the customer to start again.",
    ],
  },
  {
    slug: "from-repeat-questions-to-knowledge-base",
    title: "Turning Repeat Questions into a Knowledge Base That Pays for Itself",
    date: "9 August 2026",
    category: "Guides",
    excerpt:
      "Your team already knows the answers. This practical guide shows how to capture them in an afternoon and let automation handle the repetition.",
    author: "Amina Odhiambo",
    image:
      "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200",
    body: [
      "Every business has a list of questions it answers hundreds of times: prices, opening hours, delivery areas, admission requirements, loan eligibility. Writing those answers down once is the highest value afternoon your support team will ever spend.",
      "Begin with your sent emails and WhatsApp history. Group similar questions, write one clear answer for each, and add them to your Malachi Desk knowledge base. Keep sentences short, include the next step, and link to the relevant page where it helps.",
      "Then let the data guide you. The dashboard highlights unanswered questions, so your knowledge base improves exactly where customers need it most. Teams typically see resolution rates climb week after week without adding headcount.",
    ],
  },
  {
    slug: "whatsapp-website-support-together",
    title: "Why WhatsApp and Your Website Work Better Together",
    date: "22 July 2026",
    category: "Growth",
    excerpt:
      "Customers discover you on your website and follow up on WhatsApp. Connecting both channels keeps the conversation in one place and your team in control.",
    author: "Zawadi Kimani",
    image:
      "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1200",
    body: [
      "A website visit and a WhatsApp chat are often the same customer journey. Someone checks your services online, then wants a quick human confirmation on WhatsApp before paying.",
      "Malachi Desk connects the two. The website widget answers instantly and offers WhatsApp when a person is preferred, while your dashboard keeps the full history. No context is lost between channels.",
      "For hotels, schools, clinics, SACCOs and shops across East Africa, that continuity turns casual enquiries into confirmed bookings, applications and sales.",
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
