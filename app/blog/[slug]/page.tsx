import { POSTS, getPost } from "@/lib/blog";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found: Malachi Desk" };
  return { title: `${post.title}: Malachi Desk Blog`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-white">
      <article className="mx-auto max-w-3xl px-6 pt-36 pb-8">
        <p className="text-xs font-semibold tracking-wide text-emerald-700 uppercase">
          {post.category} <span className="font-normal text-neutral-400 normal-case">| {post.date}</span>
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900">{post.title}</h1>
        <p className="mt-4 text-sm text-neutral-500">By {post.author}</p>
        <div className="relative mt-8 h-72 overflow-hidden rounded-3xl">
          <Image src={post.image} alt="" fill sizes="100vw" className="object-cover" priority />
        </div>
        <div className="mt-8 space-y-5 leading-relaxed text-neutral-700">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <div className="mt-10 rounded-2xl bg-neutral-900 px-6 py-8 text-center text-white">
          <p className="font-bold">Put these ideas to work on your own website.</p>
          <Link href="/auth/signup" className="mt-4 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-neutral-900">
            Start Free Trial
          </Link>
        </div>
      </article>

      <section className="mx-auto max-w-3xl px-6 pb-16" aria-labelledby="related-heading">
        <h2 id="related-heading" className="mb-5 text-2xl font-bold text-neutral-900">Related Posts</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {related.map((r) => (
            <Link key={r.slug} href={`/blog/${r.slug}`} className="rounded-2xl border border-neutral-200 p-5 transition-shadow hover:shadow-lg">
              <p className="text-xs font-semibold text-emerald-700 uppercase">{r.category}</p>
              <p className="mt-1 font-bold text-neutral-900">{r.title}</p>
              <p className="mt-1 text-sm text-neutral-500">{r.date}</p>
            </Link>
          ))}
        </div>
        <Link href="/blog" className="mt-8 inline-block text-sm font-semibold text-neutral-900 underline underline-offset-4">
          Back to Blog
        </Link>
      </section>
    </main>
  );
}
