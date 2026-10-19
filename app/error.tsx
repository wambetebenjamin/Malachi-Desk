"use client";

import { WHATSAPP_LINK } from "@/lib/site";
import { MessageCircle } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 pt-24">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-neutral-900 text-white">
          <MessageCircle className="h-10 w-10" aria-hidden="true" />
        </div>
        <p className="text-sm font-semibold tracking-wide text-neutral-400 uppercase">500</p>
        <h1 className="mt-2 text-4xl font-bold text-neutral-900">Something went wrong on our side.</h1>
        <p className="mx-auto mt-4 max-w-md text-neutral-600">
          Please try again. If the problem continues, message us on WhatsApp at +254 112 272 061 and we will help right away.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-neutral-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
          >
            Try Again
          </button>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#25D366] px-7 py-3 text-sm font-semibold text-white transition hover:brightness-95"
          >
            WhatsApp +254 112 272 061
          </a>
        </div>
      </div>
    </main>
  );
}
