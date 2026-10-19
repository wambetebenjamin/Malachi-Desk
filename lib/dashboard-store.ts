import type { ChatWidgetConfig } from "@/components/chat/ChatWidget";
import { create } from "zustand";

export type DashboardTab =
  | "overview"
  | "conversations"
  | "knowledge"
  | "customiser"
  | "embed"
  | "analytics"
  | "tickets";

type DashboardState = {
  tab: DashboardTab;
  setTab: (tab: DashboardTab) => void;
  widgetConfig: ChatWidgetConfig;
  setWidgetConfig: (config: ChatWidgetConfig) => void;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  tab: "overview",
  setTab: (tab) => set({ tab }),
  widgetConfig: {
    botName: "Malachi Desk",
    primaryColor: "#171717",
    welcomeMessage:
      "Hello, and welcome to Malachi Desk. Ask me about pricing, languages, embedding, or starting a free trial.",
    avatarInitial: "M",
  },
  setWidgetConfig: (widgetConfig) => set({ widgetConfig }),
}));
