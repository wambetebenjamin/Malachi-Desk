import { HeadsetIcon, LinkIcon, PlusIcon, SettingsIcon, ShieldCheckIcon, SparklesIcon } from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export function FaqSection() {
    const items = [
        {
            icon: SparklesIcon,
            title: 'What is Malachi Desk?',
            content:
                'Malachi Desk is an AI powered help desk platform for businesses. You embed a smart chatbot on your own website, and it answers common customer questions automatically around the clock. Your team only steps in when a conversation truly needs a human.'
        },
        {
            icon: LinkIcon,
            title: 'How do I add the chatbot to my website?',
            content:
                'Copy the one line script tag from your dashboard and paste it before the closing body tag of your website. The widget appears at the bottom right of every page within minutes, and no developer is required for standard websites.'
        },
        {
            icon: SettingsIcon,
            title: 'How long does setup take?',
            content:
                'Most businesses are live in under 30 minutes. Connect your knowledge base, customise the widget name and colours, embed the code, and your chatbot starts handling queries right away.'
        },
        {
            icon: ShieldCheckIcon,
            title: 'What happens when the chatbot cannot answer?',
            content:
                'The chatbot creates a ticket and offers the customer a human handoff. The full conversation appears in your Ticket Inbox, where your team can reply directly, so the customer never repeats their question.'
        },
        {
            icon: HeadsetIcon,
            title: 'Which languages and plans are available?',
            content:
                'Malachi Desk replies in English and Swahili. Starter is free with 100 conversations per month, Growth costs KES 4,500 per month with 2,000 conversations, and Enterprise offers custom pricing with unlimited conversations.'
        }
    ]
    return (
        <div id="faq" className='py-24 sm:py-32'>
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-800">
                    Frequently Asked Questions
                </h2>
                <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
                    Everything you need to know about Malachi Desk and how it can support your customers.
                </p>
            </div>
            <Accordion className='max-w-4xl mx-auto' defaultValue={['item-1']}>
                {items.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index + 1}`}>
                        <AccordionTrigger className='py-4 **:data-[slot=accordion-trigger-icon]:hidden'>
                            <span className='flex items-center gap-4'>
                                <item.icon className='size-4 shrink-0' />
                                <span>{item.title}</span>
                            </span>
                            <PlusIcon className='text-muted-foreground pointer-events-none ml-auto size-4 shrink-0 transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-45' />
                        </AccordionTrigger>
                        <AccordionContent className='text-muted-foreground'>{item.content}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
