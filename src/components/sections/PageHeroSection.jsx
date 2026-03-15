import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { getPagePath } from '@/config/routes';

export default function PageHeroSection({
  title,
  subtitle,
  actionLabel = null,
  actionPageKey = null,
}) {
  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/2 rounded-full bg-white" />
        <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/4 translate-y-1/2 rounded-full bg-white" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/70 sm:mt-5">
              {subtitle}
            </p>
          )}

          {actionLabel && actionPageKey && (
            <Link to={getPagePath(actionPageKey)} className="mt-6 inline-block">
              <Button className="h-auto bg-[#b91c1c] px-6 py-3 text-base font-semibold text-white hover:bg-[#991b1b]">
                {actionLabel}
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="h-1 bg-[#b91c1c]" />
    </section>
  );
}
