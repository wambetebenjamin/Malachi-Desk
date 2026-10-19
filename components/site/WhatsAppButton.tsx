"use client";

import { WHATSAPP_LINK } from "@/lib/site";
import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: [0.6, 1.12, 1] }}
      transition={{ delay: 1, duration: 0.6, times: [0, 0.6, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="group fixed right-6 bottom-6 z-[9998] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-600/30"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
      <span className="pointer-events-none absolute right-[72px] hidden rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white opacity-0 transition group-hover:block group-hover:opacity-100">
        Chat with us on WhatsApp
      </span>
    </motion.a>
  );
}
