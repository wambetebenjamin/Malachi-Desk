"use client";

import { VOICE_TOUR_SCRIPT } from "@/lib/site";
import { RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function VoiceTour() {
  const [speaking, setSpeaking] = useState(false);
  const [ended, setEnded] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  function stop() {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }

  function play() {
    if (!("speechSynthesis" in window)) return;
    if (speaking) {
      stop();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(VOICE_TOUR_SCRIPT);
    utterance.rate = 0.92;
    utterance.pitch = 1.05;
    utterance.lang = "en-KE";
    const voices = window.speechSynthesis.getVoices();
    const kenyan = voices.find((v) => v.lang === "en-KE") || voices.find((v) => v.lang?.startsWith("en"));
    if (kenyan) utterance.voice = kenyan;
    utterance.onend = () => {
      setSpeaking(false);
      setEnded(true);
    };
    utterance.onerror = () => setSpeaking(false);
    utteranceRef.current = utterance;
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="fixed bottom-6 left-6 z-[9998] flex items-center gap-2">
      <button
        type="button"
        onClick={play}
        aria-label={speaking ? "Stop the voice tour" : "Hear what this site is about"}
        aria-pressed={speaking}
        title="Hear what this site is about"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-white shadow-xl shadow-neutral-900/25 transition hover:scale-105"
      >
        {speaking && (
          <span className="absolute inset-0 animate-ping rounded-full bg-neutral-900/30" aria-hidden="true" />
        )}
        <span className="relative">
          {speaking ? <VolumeX className="h-6 w-6" aria-hidden="true" /> : <Volume2 className="h-6 w-6" aria-hidden="true" />}
        </span>
      </button>
      {ended && !speaking && (
        <button
          type="button"
          onClick={play}
          className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 shadow-lg transition hover:border-neutral-900"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Replay tour
        </button>
      )}
    </div>
  );
}
