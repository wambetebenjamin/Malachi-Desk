"use client"

import { Card } from '@/components/ui/card';
import { BedDouble, GraduationCap, HeartPulse, Landmark, ShoppingBag, Building2, UtensilsCrossed, Plane } from 'lucide-react';

// Fictional business types showing Malachi Desk works with any website.
const businessTypes = [
  { name: 'Hotels', Icon: BedDouble },
  { name: 'Schools', Icon: GraduationCap },
  { name: 'Hospitals and Clinics', Icon: HeartPulse },
  { name: 'SACCOs and Banks', Icon: Landmark },
  { name: 'E-commerce Shops', Icon: ShoppingBag },
  { name: 'Universities', Icon: Building2 },
  { name: 'Restaurants', Icon: UtensilsCrossed },
  { name: 'Travel and Tours', Icon: Plane },
] as const

export function LogoCarousel() {
  return (
    <section className="pb-12 sm:pb-16 lg:pb-20 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-medium text-muted-foreground mb-8">
            Works with any website. Trusted across hospitality, education, health, finance and retail.
          </p>

          {/* Logo Carousel with Fade Effect */}
          <div className="relative">
            {/* Left Fade */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />

            {/* Right Fade */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

            {/* Logo Container */}
            <div className="overflow-hidden">
              <div className="flex animate-logo-scroll space-x-8 sm:space-x-12">
                {/* First set of badges */}
                {businessTypes.map((business) => (
                  <Card
                    key={`first-${business.name}`}
                    className="shrink-0 flex items-center justify-center h-16 w-52 opacity-70 hover:opacity-100 transition-opacity duration-300 border border-neutral-200 shadow-none bg-transparent"
                  >
                    <div className="flex items-center gap-3 px-4">
                      <business.Icon className="h-6 w-6 text-neutral-700" aria-hidden="true" />
                      <span className="text-foreground text-base font-semibold whitespace-nowrap">
                        {business.name}
                      </span>
                    </div>
                  </Card>
                ))}
                {/* Second set for seamless loop, identical to first */}
                {businessTypes.map((business) => (
                  <Card
                    key={`second-${business.name}`}
                    className="shrink-0 flex items-center justify-center h-16 w-52 opacity-70 hover:opacity-100 transition-opacity duration-300 border border-neutral-200 shadow-none bg-transparent"
                  >
                    <div className="flex items-center gap-3 px-4">
                      <business.Icon className="h-6 w-6 text-neutral-700" aria-hidden="true" />
                      <span className="text-foreground text-base font-semibold whitespace-nowrap">
                        {business.name}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
