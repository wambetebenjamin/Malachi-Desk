import { AnalyticsPreview } from "@/components/Blocks/AnalyticsPreview";
import { DemoBar } from "@/components/Blocks/DemoBar";
import { FaqSection } from "@/components/Blocks/FaqSection";
import { FeaturesSection } from "@/components/Blocks/FeatureSection";
import Hero from "@/components/Blocks/Hero";
import { HowItWorks } from "@/components/Blocks/HowItWorks";
import { LogoCarousel } from "@/components/Blocks/LogoCarousel";
import { PricingSection } from "@/components/Blocks/PricingSection";
import { TestimonialSection } from "@/components/Blocks/TestimonialSection";
import { UseCases } from "@/components/Blocks/UseCases";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-40">
        <Hero />
        <LogoCarousel />
        <DemoBar />

        {/* Product in context: support teams at work (Pexels, see image-credits.md) */}
        <section className="mx-auto max-w-7xl py-8" aria-label="Customer support teams using Malachi Desk">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative h-56 overflow-hidden rounded-2xl">
              <Image
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Customer support team collaborating in an office"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="relative h-56 overflow-hidden rounded-2xl">
              <Image
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Business owner working on a laptop"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="relative h-56 overflow-hidden rounded-2xl">
              <Image
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Startup team meeting"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-neutral-400">
            Photos from Pexels. See image-credits.md for sources.
          </p>
        </section>

        <HowItWorks />
        <FeaturesSection />
        <UseCases />
        <PricingSection />
        <AnalyticsPreview />
        <TestimonialSection />
        <FaqSection />

        {/* Final CTA */}
        <section className="mx-auto max-w-7xl pb-4" aria-labelledby="cta-heading">
          <div className="rounded-3xl bg-neutral-900 px-6 py-14 text-center text-white sm:px-12">
            <h2 id="cta-heading" className="mx-auto max-w-2xl text-3xl font-bold md:text-4xl">
              Ready to automate your customer support?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/75">
              Join businesses across Kenya and East Africa answering customers instantly, around the clock. Start free today.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" className="rounded-full bg-white px-7 text-neutral-900 hover:bg-neutral-100" render={<Link href="/auth/signup" />} nativeButton={false}>
                <span>Start Free Trial</span>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/40 bg-transparent px-7 text-white hover:bg-white/10" render={<Link href="/demo" />} nativeButton={false}>
                <span>See the Live Demo</span>
              </Button>
            </div>
            <p className="mt-4 text-sm text-white/60">Free Starter plan. No credit card required.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
