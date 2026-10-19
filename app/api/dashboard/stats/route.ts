import { auth } from "@/auth";
import { DASHBOARD_STATS } from "@/lib/mock";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  return NextResponse.json(DASHBOARD_STATS);
}
