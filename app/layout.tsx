import { Footer } from "@/components/Blocks/Footer";
import { Navbar } from "@/components/navbar";
import { FloatingChat } from "@/components/chat/FloatingChat";
import { CookieConsent } from "@/components/site/CookieConsent";
import { LoadingScreen } from "@/components/site/LoadingScreen";
import { Providers } from "@/components/site/Providers";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { VoiceTour } from "@/components/site/VoiceTour";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";

// Template font variables preserved verbatim: --font-sans, --font-geist-sans, --font-geist-mono.
// Geist is loaded locally via the geist package so builds never depend on Google Fonts.
// --font-sans keeps the template Inter stack name with a local system fallback (set on <html> below).
const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "Malachi Desk: Your customers get answers. Instantly.",
  description:
    "Malachi Desk gives your business a smart help desk that works around the clock. An AI chatbot for businesses in Kenya and East Africa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans")} style={{ ["--font-sans" as string]: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <LoadingScreen />
          <SmoothScroll />
          <Navbar />
          {children}
          <Footer />
          <FloatingChat />
          <VoiceTour />
          <WhatsAppButton />
          <CookieConsent />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
