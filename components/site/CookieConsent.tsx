"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Consent = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  savedAt: string;
};

const KEY = "malachi_desk_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customising, setCustomising] = useState(false);
  const [functional, setFunctional] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function save(value: Omit<Consent, "savedAt">) {
    const consent: Consent = { ...value, savedAt: new Date().toISOString() };
    try {
      localStorage.setItem(KEY, JSON.stringify(consent));
    } catch {
      // banner still closes for this session
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] border-t border-neutral-200 bg-white/95 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur" role="region" aria-label="Cookie consent">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center">
        <div className="flex-1">
          <p className="text-sm font-semibold text-neutral-900">We value your privacy</p>
          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-neutral-600">
            We use cookies to run this site, remember your preferences, understand usage, and, with your permission, measure marketing. This follows the Kenya Data Protection Act 2019. Read our{" "}
            <Link href="/legal/cookie-policy" className="font-medium text-neutral-900 underline underline-offset-2">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link href="/legal/privacy-policy" className="font-medium text-neutral-900 underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
          {customising && (
            <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <label className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 px-3 py-2">
                Necessary
                <input type="checkbox" checked disabled aria-label="Necessary cookies, always on" />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 px-3 py-2">
                Functional
                <input type="checkbox" checked={functional} onChange={(e) => setFunctional(e.target.checked)} />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 px-3 py-2">
                Analytics
                <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 px-3 py-2">
                Marketing
                <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
              </label>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {customising ? (
            <button
              type="button"
              onClick={() => save({ necessary: true, functional, analytics, marketing })}
              className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700"
            >
              Save preferences
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCustomising(true)}
              className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-800 transition hover:border-neutral-900"
            >
              Customise
            </button>
          )}
          <button
            type="button"
            onClick={() => save({ necessary: true, functional: false, analytics: false, marketing: false })}
            className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-800 transition hover:border-neutral-900"
          >
            Reject optional
          </button>
          <button
            type="button"
            onClick={() => save({ necessary: true, functional: true, analytics: true, marketing: true })}
            className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
