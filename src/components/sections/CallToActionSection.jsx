import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

import C4FooterCredit from '@/components/c4-footer-credit/C4FooterCredit';
import { Button } from '@/components/ui/button';
import { getPagePath } from '@/config/routes';
import { businessDetails } from '@/config/site';

export default function CallToActionSection({
  title = 'Ready to get started?',
  description = 'Get in touch for a no-obligation conversation about your tax and accounting needs.',
  primaryLabel = 'Contact Us',
  secondaryLabel = 'Call Us',
}) {
  return (
    <section className="section-navy relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>
      </div>
      <div className="absolute -right-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#b91c1c]/[0.06]" />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/55">
          {description}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to={getPagePath('Contact')}>
            <Button className="h-auto bg-[#b91c1c] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-red-900/20 hover:bg-[#991b1b]">
              {primaryLabel}
            </Button>
          </Link>

          <a href={businessDetails.phones.primary.href}>
            <Button
              variant="outline"
              className="h-auto gap-2 border-white/25 bg-transparent px-6 py-3 text-sm font-medium text-white hover:bg-white/10 hover:text-white"
            >
              <Phone className="h-4 w-4" />
              {secondaryLabel}
            </Button>
          </a>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/35">
            Site by C4 Studios
          </span>
          <C4FooterCredit
            href="https://c4studios.com"
            label="Designed by C4 Studios"
            size={36}
            showText={false}
            openInNewTab={true}
            colorScheme="dark"
          />
        </div>
      </div>
    </section>
  );
}
