"use client";

import { WHATSAPP_LINK } from "@/lib/site";
import { FALLBACK_ANSWER, FAQS, matchFaq, type FaqEntry } from "@/lib/faq";
import { AnimatePresence, motion } from "motion/react";
import {
  Mic,
  RotateCcw,
  Send,
  X,
  MessageCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type ChatWidgetConfig = {
  botName: string;
  primaryColor: string;
  welcomeMessage: string;
  avatarInitial: string;
};

const DEFAULT_CONFIG: ChatWidgetConfig = {
  botName: "Malachi Desk",
  primaryColor: "#171717",
  welcomeMessage:
    "Hello, and welcome to Malachi Desk. Ask me about pricing, languages, embedding, or starting a free trial.",
  avatarInitial: "M",
};

type Message = {
  id: number;
  role: "bot" | "user";
  text: string;
  time: string;
  showWhatsapp?: boolean;
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

function now() {
  return new Date().toLocaleTimeString("en-KE", { hour: "numeric", minute: "2-digit" });
}

const SUGGESTIONS = ["How much does it cost?", "Which languages are supported?", "How do I embed it?", "Is there a free trial?"];

export function ChatWidget({
  variant = "floating",
  config = DEFAULT_CONFIG,
  faqs = FAQS,
}: {
  variant?: "floating" | "inline";
  config?: ChatWidgetConfig;
  faqs?: FaqEntry[];
}) {
  const [open, setOpen] = useState(variant === "inline");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const isOpen = variant === "inline" ? true : open;

  function push(role: "bot" | "user", text: string, showWhatsapp = false) {
    idRef.current += 1;
    const msg: Message = { id: idRef.current, role, text, time: now(), showWhatsapp };
    setMessages((prev) => [...prev, msg]);
    return msg;
  }

  // Welcome message on first open.
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const t = setTimeout(() => {
        setMessages((prev) =>
          prev.length === 0
            ? [{ id: 0, role: "bot", text: config.welcomeMessage, time: now() }]
            : prev
        );
      }, 350);
      return () => clearTimeout(t);
    }
  }, [isOpen, config.welcomeMessage, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, isOpen]);

  function answer(question: string) {
    setTyping(true);
    const match = matchFaq(question, faqs);
    window.setTimeout(() => {
      setTyping(false);
      if (match) push("bot", match.answer);
      else push("bot", FALLBACK_ANSWER, true);
    }, 1200);
  }

  function submit(text?: string) {
    const value = (text ?? input).trim();
    if (!value || typing) return;
    setInput("");
    push("user", value);
    answer(value);
  }

  function clearConversation() {
    setMessages([]);
    setTyping(false);
    idRef.current = 0;
    window.setTimeout(() => {
      setMessages([{ id: 0, role: "bot", text: config.welcomeMessage, time: now() }]);
    }, 60);
  }

  function toggleVoice() {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) {
      push("bot", "Voice input is not supported in this browser. Please type your question instead, and I will answer right away.");
      return;
    }
    const rec = new Ctor();
    rec.lang = "en-KE";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      if (transcript) submit(transcript);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
    setListening(true);
    rec.start();
  }

  const panel = (
    <div
      className="flex h-[480px] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-900/15"
      role="dialog"
      aria-label={`${config.botName} chat`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 text-white" style={{ backgroundColor: config.primaryColor }}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-base font-bold" aria-hidden="true">
          {config.avatarInitial}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{config.botName}</p>
          <p className="flex items-center gap-1.5 text-xs text-white/80">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Online. Replies instantly.
          </p>
        </div>
        <button
          type="button"
          onClick={clearConversation}
          className="rounded-full p-2 text-white/85 transition hover:bg-white/15 hover:text-white"
          aria-label="Clear conversation"
          title="Clear conversation"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        {variant === "floating" && (
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full p-2 text-white/85 transition hover:bg-white/15 hover:text-white"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-neutral-50 px-3 py-4" aria-live="polite">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <div
                className={
                  m.role === "user"
                    ? "max-w-[85%] rounded-2xl rounded-br-md px-3.5 py-2.5 text-sm leading-relaxed text-white"
                    : "max-w-[85%] rounded-2xl rounded-bl-md border border-neutral-200 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-neutral-800"
                }
                style={m.role === "user" ? { backgroundColor: config.primaryColor } : undefined}
              >
                <p>{m.text}</p>
                {m.showWhatsapp && (
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white transition hover:brightness-95"
                  >
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    Chat on WhatsApp
                  </a>
                )}
                <p className={m.role === "user" ? "mt-1 text-right text-[10px] text-white/70" : "mt-1 text-[10px] text-neutral-400"}>
                  {m.time}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <div className="flex justify-start" aria-label="Bot is typing">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-neutral-200 bg-white px-3.5 py-3">
              <span className="typing-dot" />
              <span className="typing-dot" style={{ animationDelay: "0.18s" }} />
              <span className="typing-dot" style={{ animationDelay: "0.36s" }} />
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div className="flex gap-1.5 overflow-x-auto border-t border-neutral-100 bg-white px-3 py-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => submit(s)}
            className="shrink-0 rounded-full border border-neutral-200 px-2.5 py-1 text-[11px] font-medium text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        className="flex items-center gap-2 border-t border-neutral-200 bg-white px-3 py-3"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <button
          type="button"
          onClick={toggleVoice}
          aria-label={listening ? "Stop voice input" : "Start voice input"}
          aria-pressed={listening}
          title="Voice input"
          className={
            listening
              ? "shrink-0 rounded-full bg-red-500 p-2.5 text-white transition"
              : "shrink-0 rounded-full border border-neutral-200 p-2.5 text-neutral-500 transition hover:border-neutral-900 hover:text-neutral-900"
          }
        >
          <Mic className="h-4 w-4" />
        </button>
        <label className="sr-only" htmlFor={variant === "inline" ? "chat-input-inline" : "chat-input-floating"}>
          Type your message
        </label>
        <input
          id={variant === "inline" ? "chat-input-inline" : "chat-input-floating"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={listening ? "Listening. Speak now." : "Type your question."}
          className="min-w-0 flex-1 rounded-full border border-neutral-200 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-900"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="shrink-0 rounded-full p-2.5 text-white transition hover:opacity-90 disabled:opacity-40"
          style={{ backgroundColor: config.primaryColor }}
          disabled={!input.trim() || typing}
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
      <p className="bg-white px-4 pb-2.5 text-center text-[10px] text-neutral-400">Powered by Malachi Desk</p>
    </div>
  );

  if (variant === "inline") return panel;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed right-4 bottom-[104px] z-[9990] sm:right-6 sm:bottom-[168px]"
          >
            {panel}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close Malachi Desk chat" : "Open Malachi Desk chat"}
        className="fixed right-6 bottom-[92px] z-[9991] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl shadow-neutral-900/25"
        style={{ backgroundColor: config.primaryColor }}
      >
        {open ? <X className="h-6 w-6" aria-hidden="true" /> : <MessageCircle className="h-6 w-6" aria-hidden="true" />}
      </motion.button>
    </>
  );
}
