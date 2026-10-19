import type { FaqEntry } from "./faq";
import { FAQS } from "./faq";

export type WidgetConfig = {
  botName: string;
  primaryColor: string;
  welcomeMessage: string;
  avatarInitial: string;
};

export const DEFAULT_WIDGET_CONFIG: WidgetConfig = {
  botName: "Malachi Desk",
  primaryColor: "#171717",
  welcomeMessage:
    "Hello, and welcome to Malachi Desk. Ask me about pricing, languages, embedding, or starting a free trial.",
  avatarInitial: "M",
};

type GlobalStore = {
  faqs?: FaqEntry[];
  widgetConfig?: WidgetConfig;
};

const g = globalThis as unknown as { __malachiStore?: GlobalStore };
if (!g.__malachiStore) g.__malachiStore = {};
const memory = g.__malachiStore;

function kvEnabled() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function kvGet<T>(key: string): Promise<T | null> {
  if (!kvEnabled()) return null;
  try {
    const { kv } = await import("@vercel/kv");
    return (await kv.get<T>(key)) ?? null;
  } catch {
    return null;
  }
}

async function kvSet(key: string, value: unknown): Promise<void> {
  if (!kvEnabled()) return;
  try {
    const { kv } = await import("@vercel/kv");
    await kv.set(key, value);
  } catch {
    // In-memory fallback already holds the value.
  }
}

export async function getStoredFaqs(): Promise<FaqEntry[]> {
  const fromKv = await kvGet<FaqEntry[]>("malachi:faqs");
  if (fromKv && fromKv.length) return fromKv;
  if (!memory.faqs) memory.faqs = [...FAQS];
  return memory.faqs;
}

export async function addStoredFaq(entry: FaqEntry): Promise<FaqEntry[]> {
  const current = await getStoredFaqs();
  const next = [entry, ...current.filter((f) => f.id !== entry.id)];
  memory.faqs = next;
  await kvSet("malachi:faqs", next);
  return next;
}

export async function updateStoredFaq(entry: FaqEntry): Promise<FaqEntry[]> {
  const current = await getStoredFaqs();
  const next = current.map((f) => (f.id === entry.id ? entry : f));
  memory.faqs = next;
  await kvSet("malachi:faqs", next);
  return next;
}

export async function deleteStoredFaq(id: string): Promise<FaqEntry[]> {
  const current = await getStoredFaqs();
  const next = current.filter((f) => f.id !== id);
  memory.faqs = next;
  await kvSet("malachi:faqs", next);
  return next;
}

export async function getWidgetConfig(): Promise<WidgetConfig> {
  const fromKv = await kvGet<WidgetConfig>("malachi:widget-config");
  if (fromKv) return { ...DEFAULT_WIDGET_CONFIG, ...fromKv };
  if (!memory.widgetConfig) memory.widgetConfig = { ...DEFAULT_WIDGET_CONFIG };
  return memory.widgetConfig;
}

export async function setWidgetConfig(config: WidgetConfig): Promise<WidgetConfig> {
  memory.widgetConfig = config;
  await kvSet("malachi:widget-config", config);
  return config;
}
