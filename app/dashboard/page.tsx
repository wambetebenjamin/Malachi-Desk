import { auth } from "@/auth";
import { DashboardApp } from "@/components/dashboard/DashboardApp";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard: Malachi Desk",
  description: "Manage conversations, knowledge base, widget settings, analytics and tickets.",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/dashboard");
  }
  return <DashboardApp userName={session.user.name || "Business Owner"} userEmail={session.user.email || ""} />;
}
