import { WHATSAPP_LINK } from '@/lib/site';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="border-t border-gray-200 mt-24">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white">
                                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                            </span>
                            Malachi Desk
                        </h3>
                        <p className="text-sm text-gray-600">
                            Your customers get answers. Instantly. An AI powered help desk for businesses in Kenya and East Africa.
                        </p>
                        <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
                        >
                            <MessageCircle className="h-4 w-4" aria-hidden="true" />
                            WhatsApp: +254 112 272 061
                        </a>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">
                            Product
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/demo" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Live Demo
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Documentation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">
                            Company
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    WhatsApp Us
                                </a>
                            </li>
                            <li>
                                <Link href="/auth/signup" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Start Free Trial
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">
                            Legal
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/legal/privacy-policy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/cookie-policy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                        <h4 className="text-sm font-semibold text-gray-900 mt-6 mb-3">Follow Us</h4>
                        <div className="flex flex-wrap gap-2 text-sm">
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:text-gray-900">X</a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:text-gray-900">LinkedIn</a>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:text-gray-900">Facebook</a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:text-gray-900">Instagram</a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-600 text-center">
                        © {new Date().getFullYear()} Malachi Desk. All rights reserved. Serving Kenya and East Africa, with global reach.
                    </p>
                </div>
            </div>
        </footer>
    );
};
