"use client";

import { getRecaptchaToken } from "@/components/site/Recaptcha";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});
type FormValues = z.infer<typeof schema>;

function SignInForm() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/dashboard";
  const [error, setError] = useState("");
  const [needsFallback, setNeedsFallback] = useState(false);
  const [fallbackChecked, setFallbackChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setError("");
    setBusy(true);
    try {
      const token = await getRecaptchaToken("signin");
      if (token) {
        const res = await fetch("/api/recaptcha/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = (await res.json()) as { success: boolean; score: number };
        if (!data.success || data.score < 0.5) {
          // reCAPTCHA v2 fallback below the 0.5 threshold.
          setNeedsFallback(true);
          if (!fallbackChecked) {
            setError("Additional verification is needed. Please tick the box below and sign in again.");
            setBusy(false);
            return;
          }
        }
      }
      const result = await signIn("credentials", { ...values, redirect: false });
      if (result?.error) {
        setError("Invalid email or password. Try the demo account below, or create a free account.");
        setBusy(false);
        return;
      }
      window.location.href = callbackUrl;
    } catch {
      setError("Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-6 pt-28 pb-16">
      <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-neutral-900">Sign in to Malachi Desk</h1>
            <p className="text-sm text-neutral-500">Welcome back to your help desk.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl })}
          className="w-full rounded-full border border-neutral-300 py-3 text-sm font-semibold text-neutral-800 transition hover:border-neutral-900"
        >
          Continue with Google
        </button>
        <p className="my-4 text-center text-xs text-neutral-400">or sign in with email</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-800">Email</label>
            <input id="email" type="email" autoComplete="email" {...register("email")} className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900" placeholder="you@business.co.ke" />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-neutral-800">Password</label>
            <input id="password" type="password" autoComplete="current-password" {...register("password")} className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900" placeholder="Your password" />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>

          {needsFallback && (
            <label className="flex items-center gap-3 rounded-xl border border-neutral-300 px-4 py-3 text-sm text-neutral-700">
              <input type="checkbox" checked={fallbackChecked} onChange={(e) => setFallbackChecked(e.target.checked)} />
              I am not a robot (verification fallback)
            </label>
          )}

          {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

          <button type="submit" disabled={busy} className="w-full rounded-full bg-neutral-900 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:opacity-50">
            {busy ? "Signing in." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 rounded-xl bg-neutral-50 px-4 py-3 text-sm text-neutral-600">
          <p className="font-semibold text-neutral-800">Demo account</p>
          <p>Email: demo@malachidesk.co.ke</p>
          <p>Password: demo1234</p>
        </div>

        <p className="mt-6 text-center text-sm text-neutral-500">
          New to Malachi Desk?{" "}
          <Link href="/auth/signup" className="font-semibold text-neutral-900 underline underline-offset-2">Start free</Link>
        </p>
        <p className="mt-3 text-center text-xs text-neutral-400">Protected by reCAPTCHA v3, with a v2 fallback when needed.</p>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center pt-28">Loading.</main>}>
      <SignInForm />
    </Suspense>
  );
}
