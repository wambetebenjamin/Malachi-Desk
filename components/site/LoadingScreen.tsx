"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const [reduced, setReduced] = useState(false);
  const started = useRef(0);

  const finish = useCallback(() => setDone(true), []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("malachi_loaded") === "1") {
        setDone(true);
        return;
      }
    } catch {
      // storage unavailable: still show the loader briefly
    }
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    started.current = Date.now();
    const skipTimer = window.setTimeout(() => setCanSkip(true), 1000);
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - started.current;
      const pct = Math.min(100, Math.round((elapsed / 2200) * 100));
      setProgress(pct);
      if (pct >= 100) {
        window.clearInterval(tick);
        try {
          sessionStorage.setItem("malachi_loaded", "1");
        } catch {
          // ignore
        }
        window.setTimeout(() => setDone(true), 350);
      }
    }, 50);
    const hardStop = window.setTimeout(() => setDone(true), 3000);
    return () => {
      window.clearTimeout(skipTimer);
      window.clearTimeout(hardStop);
      window.clearInterval(tick);
    };
  }, []);

  if (done) return null;

  const draw = reduced ? 1 : Math.min(1, progress / 70);
  const check = reduced ? 1 : Math.max(0, Math.min(1, (progress - 70) / 30));

  return (
    <div
      role="status"
      aria-label={`Loading Malachi Desk, ${progress} percent`}
      onClick={() => canSkip && finish()}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white"
    >
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
        <path
          d="M48 12c17.7 0 32 12.5 32 28 0 15.5-14.3 28-32 28-3.2 0-6.3-.4-9.2-1.2L24 78l2.2-12.3C20.8 59.4 16 50.2 16 40c0-15.5 14.3-28 32-28Z"
          stroke="#171717"
          strokeWidth="3"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
        />
        <path
          d="M34 41l10 10 18-20"
          stroke="#059669"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - check}
        />
      </svg>
      <p className="mt-5 text-sm font-semibold tracking-wide text-neutral-900">Malachi Desk</p>
      <p className="mt-1 text-sm tabular-nums text-neutral-500">{progress}%</p>
      {canSkip && <p className="mt-3 text-xs text-neutral-400">Tap anywhere to skip</p>}
    </div>
  );
}
