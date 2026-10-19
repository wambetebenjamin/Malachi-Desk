import { verifyRecaptcha } from "@/lib/recaptcha";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { token?: string } | null;
  const result = await verifyRecaptcha(body?.token);
  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}
