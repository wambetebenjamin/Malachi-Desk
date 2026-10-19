export async function verifyRecaptcha(token: string | undefined): Promise<{ success: boolean; score: number }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    // No secret configured (local development): accept so forms remain testable.
    return { success: true, score: 1 };
  }
  if (!token) return { success: false, score: 0 };
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as { success?: boolean; score?: number };
    return { success: Boolean(data.success), score: data.score ?? 0 };
  } catch {
    return { success: false, score: 0 };
  }
}
