"use client";

import { cn } from "@/lib/utils";
import {
    BarChart3,
    History,
    Languages,
    MessageCircle,
    Palette,
    ShieldCheck,
    UserRound,
    Zap,
} from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
    {
        title: "Instant Replies, 24/7",
        description:
            "Your customers get accurate answers in seconds, at any hour, including nights, weekends and public holidays.",
        icon: <Zap />,
    },
    {
        title: "English and Swahili Support",
        description:
            "Customers write in the language they prefer, and Malachi Desk replies in the same language from one knowledge base.",
        icon: <Languages />,
    },
    {
        title: "Ticket Escalation to a Human",
        description:
            "When a question needs a person, the chatbot creates a ticket with full history so your team can continue without repetition.",
        icon: <UserRound />,
    },
    {
        title: "Conversation History",
        description:
            "Every conversation is saved and searchable, so you can review quality, spot trends, and improve your answers over time.",
        icon: <History />,
    },
    {
        title: "Customisable Widget",
        description:
            "Change the chatbot name, primary colour, welcome message and avatar initial. Preview everything live before you publish.",
        icon: <Palette />,
    },
    {
        title: "Detailed Analytics Dashboard",
        description:
            "Track conversation volume, resolution rate, top queries and unanswered questions that need new knowledge base entries.",
        icon: <BarChart3 />,
    },
    {
        title: "WhatsApp Integration",
        description:
            "Customers can continue on WhatsApp when they prefer it, and your team keeps the full conversation in one place.",
        icon: <MessageCircle />,
    },
    {
        title: "Privacy You Can Trust",
        description:
            "Built for GDPR aligned practice and full compliance with the Kenya Data Protection Act 2019. Your data stays yours.",
        icon: <ShieldCheck />,
    },
];

export function FeaturesSection() {
    return (
        <div id="features" className="max-w-7xl mx-auto py-16">
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-800">
                    Everything You Need to Support Customers Automatically
                </h2>
                <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
                    One smart help desk that answers repeat questions for you and brings your team in only when it matters.
                </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10">
                {FEATURES.map((feature, index) => (
                    <Feature key={feature.title} {...feature} index={index} />
                ))}
            </div>
        </div>
    );
}

const Feature = ({
    title,
    description,
    icon,
    index,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) => {
    return (
        <motion.div
            className={cn(
                "flex flex-col lg:border-r py-10 relative group/feature",
                (index === 0 || index === 3 || index === 6) && "lg:border-l",
                index < 6 && "lg:border-b"
            )}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
                duration: 0.5,
                delay: (index % 3) * 0.15,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {index < 3 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-t from-neutral-100 to-transparent pointer-events-none" />
            )}
            {index >= 3 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-b from-neutral-100 to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10 text-neutral-600 group-hover/feature:text-primary group-hover/feature:scale-101 transition duration-200">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 group-hover/feature:bg-primary transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800">
                    {title}
                </span>
            </div>
            <p className="text-sm text-neutral-600 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </motion.div>
    );
};
