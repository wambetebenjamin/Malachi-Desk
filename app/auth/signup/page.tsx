"use client";

import { getRecaptchaToken } from "@/components/site/Recaptcha";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Enter your name or business name."),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters."),
});
type FormValues = z.infer<typeof schema>;

export default function SignUpPage() {
  const [error, setError] = useState("");
  const [needsFallback, setNeedsFallback] = useState(false);
  const [fallbackChecked, setFallbackChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setError("");
    setBusy(true);
    try {
      const token = await getRecaptchaToken("signup");
      if (token) {
        const res = await fetch("/api/recaptcha/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = (await res.json()) as { success: boolean; score: number };
        if (!data.success || data.score < 0.5) {
          setNeedsFallback(true);
          if (!fallbackChecked) {
            setError("Additional verification is needed. Please tick the box below and try again.");
            setBusy(false);
            return;
          }
        }
      }
      const result = await signIn("credentials", { ...values, redirect: false });
      if (result?.error) {
        setError("We could not create your account. Please check your details and try again.");
        setBusy(false);
        return;
      }
      window.location.href = "/dashboard";
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
            <h1 className="text-xl font-bold text-neutral-900">Start your free trial</h1>
            <p className="text-sm text-neutral-500">Free Starter plan. No credit card required.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full rounded-full border border-neutral-300 py-3 text-sm font-semibold text-neutral-800 transition hover:border-neutral-900"
        >
          Continue with Google
        </button>
        <p className="my-4 text-center text-xs text-neutral-400">or sign up with email</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-neutral-800">Name or business</label>
            <input id="name" autoComplete="name" {...register("name")} className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900" placeholder="Zawadi Fashions, Nairobi" />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-800">Email</label>
            <input id="email" type="email" autoComplete="email" {...register("email")} className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900" placeholder="you@business.co.ke" />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-neutral-800">Password</label>
            <input id="password" type="password" autoComplete="new-password" {...register("password")} className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900" placeholder="At least 8 characters" />
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
            {busy ? "Creating your account." : "Create Free Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link href="/auth/signin" className="font-semibold text-neutral-900 underline underline-offset-2">Sign in</Link>
        </p>
        <p className="mt-3 text-center text-xs leading-relaxed text-neutral-400">
          By continuing you agree to our Terms of Service and Privacy Policy. Protected by reCAPTCHA v3, with a v2 fallback when needed.
        </p>
      </div>
    </main>
  );
}
