import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

import BrandMark from '@/components/common/BrandMark';
import { getPagePath } from '@/config/routes';
import { businessDetails, footerServiceLinks, primaryNavItems } from '@/config/site';

export default function SiteFooter() {
  return (
    <footer className="bg-[#1e1b4b] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandMark className="mb-4 inline-block" />
            <p className="text-sm leading-relaxed text-white/60">
              Professional tax and accounting services for individuals and businesses across Perth.
            </p>
            <p className="mt-3 text-xs text-white/40">{businessDetails.registrationLabel}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {primaryNavItems.map(({ label, pageKey }) => (
                <li key={pageKey}>
                  <Link
                    to={getPagePath(pageKey)}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
              Services
            </h4>
            <ul className="space-y-2.5">
              {footerServiceLinks.map((serviceLabel) => (
                <li key={serviceLabel}>
                  <Link
                    to={getPagePath('Services')}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {serviceLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={businessDetails.address.mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  {businessDetails.address.full}
                </a>
              </li>
              <li>
                <a
                  href={businessDetails.emailHref}
                  className="flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  {businessDetails.email}
                </a>
              </li>
              <li>
                <a
                  href={businessDetails.phones.primary.href}
                  className="flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  {businessDetails.phones.primary.display}
                </a>
              </li>
              <li>
                <a
                  href={businessDetails.phones.secondary.href}
                  className="flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  {businessDetails.phones.secondary.display}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-white/40">
            Copyright {new Date().getFullYear()} {businessDetails.name}
          </p>
          <p className="text-xs text-white/40">{businessDetails.footerMeta}</p>
        </div>
      </div>
    </footer>
  );
}
