import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getPagePath } from '@/config/routes';
import { businessDetails } from '@/config/site';

export default function CallToActionSection({
  title = 'Ready to get started?',
  description = 'Get in touch for a no-obligation conversation about your tax and accounting needs.',
  primaryLabel = 'Get in Touch',
  secondaryLabel = 'Call Us',
}) {
  return (
    <section className="section-navy py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-white/60">
          {description}
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to={getPagePath('Contact')}>
            <Button className="h-auto bg-[#b91c1c] px-7 py-3 text-base font-semibold text-white hover:bg-[#991b1b]">
              {primaryLabel}
            </Button>
          </Link>

          <a href={businessDetails.phones.primary.href}>
            <Button
              variant="outline"
              className="h-auto gap-2 border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              {secondaryLabel}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
