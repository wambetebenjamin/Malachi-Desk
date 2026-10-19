import { POSTS } from "@/lib/blog";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog: Malachi Desk",
  description: "Practical guides on customer support, automation and growth for East African businesses.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-36 pb-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">Blog</h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-600">
            Practical ideas for answering customers faster and growing with a calmer team.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {POSTS.map((post) => (
            <article key={post.slug} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg">
              <div className="relative h-52">
                <Image src={post.image} alt="" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold tracking-wide text-emerald-700 uppercase">
                  {post.category} <span className="font-normal text-neutral-400 normal-case">| {post.date}</span>
                </p>
                <h2 className="mt-2 text-xl font-bold text-neutral-900">{post.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-neutral-900 underline underline-offset-4">
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-neutral-400">Photos from Pexels. See image-credits.md for sources.</p>
      </div>
    </main>
  );
}
