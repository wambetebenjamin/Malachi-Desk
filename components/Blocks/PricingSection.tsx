"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { motion } from "motion/react"
import { Check } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const plans = [
    {
        name: 'Starter',
        description: 'Perfect for testing Malachi Desk on your business website',
        monthlyPrice: 0,
        yearlyPrice: 0,
        priceLabel: 'Free',
        features: [
            '100 conversations per month',
            '1 chatbot widget',
            'Knowledge base editor',
            'English and Swahili replies',
            'Community support'
        ],
        cta: 'Get Started Free',
        popular: false
    },
    {
        name: 'Growth',
        description: 'For growing businesses that need more power and insight',
        monthlyPrice: 4500,
        yearlyPrice: 3600,
        priceLabel: '',
        features: [
            '2,000 conversations per month',
            'Ticket escalation to a human agent',
            'Conversation history',
            'Custom widget colours and name',
            'Full analytics dashboard',
            'WhatsApp integration',
            'Priority email support'
        ],
        cta: 'Start Free Trial',
        popular: true,
        includesPrevious: 'All Starter features, plus'
    },
    {
        name: 'Enterprise',
        description: 'For large teams requiring scale, control and dedicated support',
        monthlyPrice: -1,
        yearlyPrice: -1,
        priceLabel: 'Custom',
        features: [
            'Unlimited conversations',
            'Multiple widgets and websites',
            'Advanced analytics and exports',
            'Custom integrations',
            'Dedicated support contact',
            'Onboarding assistance'
        ],
        cta: 'Talk to Us',
        popular: false,
        includesPrevious: 'All Growth features, plus'
    }
]

export function PricingSection() {
    const [isYearly, setIsYearly] = useState(false)

    return (
        <section id="pricing" className="py-24 sm:py-32 border bg-muted/40 rounded-xl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mx-auto max-w-2xl text-center mb-12">
                    <Badge variant="outline" className="mb-4">Pricing Plans</Badge>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Choose your plan
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Start free, then upgrade as your customer conversations grow. Prices in Kenyan Shillings.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center mb-2">
                        <ToggleGroup
                            value={[isYearly ? "yearly" : "monthly"]}
                            onValueChange={(value) => setIsYearly(value[0] === "yearly")}
                            className="bg-secondary text-secondary-foreground border-none rounded-full p-1 cursor-pointer shadow-none"
                        >
                            <ToggleGroupItem
                                value="monthly"
                                className="data-pressed:bg-background data-pressed:border-border border-transparent border px-6 !rounded-full data-pressed:text-foreground hover:bg-transparent cursor-pointer transition-colors"
                            >
                                Monthly
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="yearly"
                                className="data-pressed:bg-background data-pressed:border-border border-transparent border px-6 !rounded-full data-pressed:text-foreground hover:bg-transparent cursor-pointer transition-colors"
                            >
                                Annually
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        <span className="text-primary font-semibold">Save 20%</span> On Annual Billing
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-3 items-stretch">
                        {plans.map((plan, index) => {
                            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice
                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -8 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                                    className={`p-8 flex flex-col gap-6 m-2 rounded-xl border ${plan.popular
                                        ? 'bg-card shadow-xl ring-2 ring-neutral-900 backdrop-blur'
                                        : 'bg-card border-neutral-200 hover:border-neutral-900'
                                        }`}
                                >
                                    {/* Plan Header */}
                                    <div>
                                        <div className="flex items-center gap-2 text-lg font-medium tracking-tight mb-2">
                                            {plan.name}
                                            {plan.popular && <Badge>Most Popular</Badge>}
                                        </div>
                                        <div className="text-muted-foreground text-balance text-sm">{plan.description}</div>
                                    </div>
                                    <div>
                                        {price >= 0 ? (
                                            <p className="text-4xl font-bold tracking-tight">
                                                {price === 0 ? 'KES 0' : `KES ${price.toLocaleString('en-KE')}`}
                                                <span className="text-base font-medium text-muted-foreground"> / month</span>
                                            </p>
                                        ) : (
                                            <p className="text-4xl font-bold tracking-tight">Custom</p>
                                        )}
                                        {plan.includesPrevious && (
                                            <p className="mt-2 text-sm font-medium text-muted-foreground">{plan.includesPrevious}</p>
                                        )}
                                    </div>
                                    <ul className="flex-1 space-y-3">
                                        {plan.features.map((f) => (
                                            <li key={f} className="flex items-start gap-2.5 text-sm">
                                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        className="w-full rounded-full"
                                        variant={plan.popular ? 'default' : 'outline'}
                                        render={<Link href={plan.name === 'Enterprise' ? '/contact' : '/auth/signup'} />}
                                        nativeButton={false}
                                    >
                                        <span>{plan.cta}</span>
                                    </Button>
                                </motion.div>
                            )
                        })}
                    </div>
                    <p className="mt-8 text-center text-sm text-muted-foreground">
                        Need the full comparison? Visit the{' '}
                        <Link href="/pricing" className="font-semibold text-neutral-900 underline underline-offset-2">Pricing page</Link>.
                    </p>
                </div>
            </div>
        </section>
    )
}
