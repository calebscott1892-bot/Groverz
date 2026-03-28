import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';

import BrandMark from '@/components/common/BrandMark';
import { Button } from '@/components/ui/button';
import { getPagePath } from '@/config/routes';
import { businessDetails, primaryNavItems } from '@/config/site';

export default function SiteHeader({ activePageKey }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1e1b4b] shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="hidden min-h-[88px] items-center gap-8 md:grid md:grid-cols-[minmax(220px,1fr)_auto_minmax(220px,1fr)]">
          <div className="justify-self-start">
            <Link to={getPagePath('Home')} className="block" aria-label="Go to homepage">
              <BrandMark className="h-14 lg:h-16" />
            </Link>
          </div>

          <nav className="flex items-center justify-center gap-1 lg:gap-2">
            {primaryNavItems.map(({ label, pageKey }) => (
              <Link
                key={pageKey}
                to={getPagePath(pageKey)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors lg:px-5 ${
                  activePageKey === pageKey
                    ? 'bg-white/10 text-white'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3 lg:gap-4">
            <a
              href={businessDetails.phones.primary.href}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-white/85 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Phone className="h-4 w-4" />
              {businessDetails.phones.primary.display}
            </a>
            <Link to={getPagePath('Contact')}>
              <Button className="h-auto bg-[#b91c1c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#991b1b]">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex min-h-[76px] items-center justify-between gap-4 md:hidden">
          <Link to={getPagePath('Home')} className="block flex-shrink-0" aria-label="Go to homepage">
            <BrandMark className="h-10" />
          </Link>

          <button
            type="button"
            className="rounded-md p-2 text-white transition-colors hover:bg-white/10"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsMobileMenuOpen((currentState) => !currentState)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#1e1b4b] pb-5 md:hidden">
          <nav className="flex flex-col gap-1 px-4 pt-2">
            {primaryNavItems.map(({ label, pageKey }) => (
              <Link
                key={pageKey}
                to={getPagePath(pageKey)}
                onClick={closeMobileMenu}
                className={`rounded-md px-4 py-3 text-sm font-medium ${
                  activePageKey === pageKey
                    ? 'bg-white/10 text-white'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-3 space-y-2 px-4">
            <a
              href={businessDetails.phones.primary.href}
              className="flex items-center gap-2 text-sm text-white/80"
            >
              <Phone className="h-4 w-4" />
              {businessDetails.phones.primary.display}
            </a>
            <Link to={getPagePath('Contact')} onClick={closeMobileMenu}>
              <Button className="mt-2 w-full bg-[#b91c1c] text-white hover:bg-[#991b1b]">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
