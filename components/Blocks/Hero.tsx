"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import gsap from 'gsap'
import { Check, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const Hero = () => {
    const headlineRef = useRef<HTMLHeadingElement>(null)
    const subRef = useRef<HTMLParagraphElement>(null)
    const mockRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headlineRef.current,
                { opacity: 0, y: 36 },
                { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
            )
            gsap.fromTo(
                subRef.current,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.35 }
            )
            gsap.fromTo(
                mockRef.current,
                { opacity: 0, y: 44, rotate: 1.5 },
                { opacity: 1, y: 0, rotate: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
            )
            gsap.to(mockRef.current, {
                y: -10,
                duration: 2.6,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay: 1.6,
            })
        })
        return () => ctx.revert()
    }, [])

    return (
        <div>
            {/* Introducing Malachi Desk */}
            <div className="flex items-center justify-center">
                <Badge className="h-auto text-sm font-medium px-4 py-2 " variant={'outline'}>
                    Built for businesses in Kenya and East Africa
                </Badge>
            </div>

            {/* Hero Text */}
            <div className="text-center mt-8">
                <h1
                    ref={headlineRef}
                    className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
                >
                    Your customers get answers. Instantly.
                </h1>
                <p
                    ref={subRef}
                    className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto"
                >
                    Malachi Desk gives your business a smart help desk that works around the clock.
                </p>
            </div>

            {/* Hero Actions */}
            <div className="my-6 mb-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
                <Button size="lg" className="rounded-full px-7" render={<Link href="/auth/signup" />} nativeButton={false}>
                    <span>Start Free Trial</span>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-7" render={<Link href="#live-demo" />} nativeButton={false}>
                    <span>See It in Action</span>
                </Button>
            </div>
            <p className="text-center text-sm text-gray-500 mb-12">Free Starter plan. No credit card required. Live in minutes.</p>

            {/* Floating chatbot widget preview (visual mockup) */}
            <div ref={mockRef} className="relative mx-auto max-w-md" aria-hidden="true">
                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-900/10">
                    <div className="flex items-center gap-3 bg-neutral-900 px-4 py-3 text-white">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-base font-bold">M</div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold">Malachi Desk</p>
                            <p className="flex items-center gap-1.5 text-xs text-white/80">
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                Online. Replies instantly.
                            </p>
                        </div>
                        <MessageCircle className="h-5 w-5 text-white/70" />
                    </div>
                    <div className="space-y-3 bg-neutral-50 px-4 py-5">
                        <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-800">
                            Hello, and welcome. Ask me about pricing, delivery, or bookings.
                            <span className="mt-1 block text-[10px] text-neutral-400">09:41</span>
                        </div>
                        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-neutral-900 px-3.5 py-2.5 text-sm text-white">
                            How much is delivery to Nakuru?
                            <span className="mt-1 block text-right text-[10px] text-white/70">09:41</span>
                        </div>
                        <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-800">
                            Delivery to Nakuru takes 1 to 2 working days and costs KES 300. Orders above KES 5,000 are delivered free.
                            <span className="mt-1 flex items-center gap-1 text-[10px] text-emerald-600">
                                <Check className="h-3 w-3" /> Answered instantly, 09:41
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-t border-neutral-200 bg-white px-4 py-3">
                        <div className="flex-1 rounded-full border border-neutral-200 px-3.5 py-2 text-sm text-neutral-400">Type your question.</div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white">
                            <MessageCircle className="h-4 w-4" />
                        </div>
                    </div>
                    <p className="bg-white px-4 pb-3 text-center text-[10px] text-neutral-400">Powered by Malachi Desk</p>
                </div>
            </div>
        </div>
    )
}

export default Hero
