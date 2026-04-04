import React from 'react';
import { Link } from 'react-router-dom';

import FloatingMathBackground from '@/components/common/FloatingMathBackground';
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
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>
      <FloatingMathBackground count={28} seed={71} />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/65 sm:mt-6">
              {subtitle}
            </p>
          )}

          {actionLabel && actionPageKey && (
            <Link to={getPagePath(actionPageKey)} className="mt-8 inline-block">
              <Button className="h-auto bg-[#b91c1c] px-6 py-3 text-base font-semibold text-white hover:bg-[#991b1b]">
                {actionLabel}
              </Button>
            </Link>
          )}
        </div>
      </div>

      <svg className="absolute bottom-0 left-0 w-full text-white" viewBox="0 0 1440 40" fill="none" preserveAspectRatio="none">
        <path d="M0 40h1440V20C1200 0 960 35 720 25 480 15 240 40 0 20v20z" fill="currentColor" />
      </svg>
    </section>
  );
}
