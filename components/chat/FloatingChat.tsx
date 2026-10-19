"use client";

import { ChatWidget } from "@/components/chat/ChatWidget";
import { usePathname } from "next/navigation";

export function FloatingChat() {
  const pathname = usePathname();
  // The demo page and dashboard embed their own inline widgets.
  if (pathname?.startsWith("/demo") || pathname?.startsWith("/dashboard")) return null;
  return <ChatWidget variant="floating" />;
}
