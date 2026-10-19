import { auth } from "@/auth";
import { getWidgetConfig, setWidgetConfig } from "@/lib/store";
import { NextResponse } from "next/server";
import { z } from "zod";

const configSchema = z.object({
  botName: z.string().min(1).max(60),
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use a hex colour such as #171717."),
  welcomeMessage: z.string().min(3).max(400),
  avatarInitial: z.string().min(1).max(2),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  return NextResponse.json({ config: await getWidgetConfig() });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  const parsed = configSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid settings." }, { status: 400 });
  }
  const config = await setWidgetConfig(parsed.data);
  return NextResponse.json({ config });
}
