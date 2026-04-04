import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

import BrandMark from '@/components/common/BrandMark';
import C4FooterCredit from '@/components/c4-footer-credit/C4FooterCredit';
import { getPagePath } from '@/config/routes';
import { businessDetails, footerServiceLinks, primaryNavItems } from '@/config/site';

export default function SiteFooter() {
  return (
    <footer className="relative bg-[#1e1b4b] text-white">
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="0.8" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-dots)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.9fr_1fr_1.1fr] lg:gap-8">
          <div className="max-w-[21rem]">
            <div className="mb-5 inline-flex rounded-xl bg-[#f8f5ef] px-3 py-2.5 shadow-[0_12px_28px_rgba(15,23,42,0.14)] ring-1 ring-black/5">
              <BrandMark context="footer" />
            </div>
            <p className="text-sm leading-relaxed text-white/55">
              Straightforward tax and accounting support for everyday Perth workers, sole traders
              and small businesses. Fixed fees. Fast turnaround.
            </p>
            <p className="mt-3 text-xs text-white/35">{businessDetails.registrationLabel}</p>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">
              Quick links
            </h4>
            <ul className="space-y-1.5">
              {primaryNavItems.map(({ label, pageKey }) => (
                <li key={pageKey}>
                  <Link
                    to={getPagePath(pageKey)}
                    className="inline-flex rounded-md px-0 py-1 text-sm text-white/60 transition-all hover:translate-x-1 hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">
              Services
            </h4>
            <ul className="space-y-1.5">
              {footerServiceLinks.map((serviceLabel) => (
                <li key={serviceLabel}>
                  <Link
                    to={getPagePath('Services')}
                    className="inline-flex rounded-md px-0 py-1 text-sm text-white/60 transition-all hover:translate-x-1 hover:text-white"
                  >
                    {serviceLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={businessDetails.address.mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-white/55 transition-colors hover:text-white"
                >
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-white/[0.08]">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  {businessDetails.address.full}
                </a>
              </li>
              <li>
                <a
                  href={businessDetails.emailHref}
                  className="flex items-center gap-3 text-sm text-white/55 transition-colors hover:text-white"
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-white/[0.08]">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  {businessDetails.email}
                </a>
              </li>
              <li>
                <a
                  href={businessDetails.phones.primary.href}
                  className="flex items-center gap-3 text-sm text-white/55 transition-colors hover:text-white"
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-white/[0.08]">
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  {businessDetails.phones.primary.display}
                </a>
              </li>
              <li>
                <a
                  href={businessDetails.phones.secondary.href}
                  className="flex items-center gap-3 text-sm text-white/55 transition-colors hover:text-white"
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-white/[0.08]">
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  {businessDetails.phones.secondary.display}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-xs leading-relaxed text-white/40">
            Groverz Tax &amp; Accounting Solutions acknowledges the Traditional Custodians of the
            land on which we operate, the Whadjuk people of the Noongar nation. We pay our respects
            to Elders past and present and extend that respect to all Aboriginal and Torres Strait
            Islander peoples.
          </p>
          <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-4 sm:flex-row">
            <p className="text-xs text-white/35">
              Copyright {new Date().getFullYear()} {businessDetails.name}
            </p>
            <div className="flex items-center gap-2 text-white/35">
              <span className="text-[10px] tracking-wide">Designed by</span>
              <C4FooterCredit
                href="https://c4studios.com"
                label="Designed by C4 Studios"
                size={36}
                showText={false}
                openInNewTab={true}
              />
            </div>
            <p className="text-xs text-white/35">{businessDetails.footerMeta}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
