"use client"

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'motion/react'
import { Quote } from 'lucide-react'

const reviews = [
    {
        name: "Wanjiru", 
        role: "Owner, Zawadi Fashions (online store, Nairobi)",
        body: "Most of our questions came in at night, and we answered them the next morning when the customer had already bought elsewhere. Malachi Desk answers instantly now, and our team only handles the conversations that truly need a person.",
        initials: "NM",
    },
    {
        name: "David Okello",
        role: "Administrator, Lakeview Academy (Kisumu)",
        body: "Parents ask about fees, term dates and admissions every day. We added the answers once, and the chatbot handles them in English and Swahili. Our front office phone is finally quiet enough for real work.",
        initials: "JO",
    },
    {
        name: "Rehema Said",
        role: "Manager, Palm Court Hotel (Mombasa)",
        body: "Guests ask about check in times, parking and airport transfers around the clock. Malachi Desk handles those instantly and passes bookings questions to us with full history. It feels like an extra receptionist who never sleeps.",
        initials: "FA",
    },
]

export function TestimonialSection() {
    return (
        <div id="testimonials" className="max-w-7xl mx-auto py-16 px-4">
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-800">
                    Loved by Businesses Across East Africa
                </h2>
                <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
                    Real owners, real results: faster answers, calmer teams, happier customers.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews.map((review, index) => (
                    <motion.div
                        key={review.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Card className="h-full border border-neutral-200 transition-shadow duration-300 hover:shadow-lg">
                            <CardContent className="flex h-full flex-col p-6">
                                <Quote className="mb-4 h-6 w-6 text-neutral-300" aria-hidden="true" />
                                <p className="flex-1 text-sm leading-relaxed text-neutral-700">{review.body}</p>
                                <div className="mt-6 flex items-center gap-3">
                                    <Avatar className="h-11 w-11">
                                        <AvatarFallback className="bg-neutral-900 text-sm font-semibold text-white">{review.initials}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-bold text-neutral-800">{review.name}</p>
                                        <p className="text-xs text-neutral-500">{review.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
