import { auth } from "@/auth";
import { ALL_CONVERSATIONS } from "@/lib/mock";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page") || 1));
  const pageSize = Math.min(50, Math.max(1, Number(url.searchParams.get("pageSize") || 8)));
  const total = ALL_CONVERSATIONS.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const items = ALL_CONVERSATIONS.slice((safePage - 1) * pageSize, safePage * pageSize);
  return NextResponse.json({ items, page: safePage, pageSize, total, totalPages });
}
