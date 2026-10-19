import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 pt-24">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-neutral-900 text-white">
          <MessageCircle className="h-10 w-10" aria-hidden="true" />
        </div>
        <p className="text-sm font-semibold tracking-wide text-neutral-400 uppercase">404</p>
        <h1 className="mt-2 text-4xl font-bold text-neutral-900">This page does not exist.</h1>
        <p className="mx-auto mt-4 max-w-md text-neutral-600">
          The page you are looking for may have moved. Let us take you back home.
        </p>
        <Button className="mt-8 rounded-full px-7" render={<Link href="/" />} nativeButton={false}>
          <span>Back to Home</span>
        </Button>
      </div>
    </main>
  );
}
