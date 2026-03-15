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
    <header className="sticky top-0 z-50 bg-[#1e1b4b]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link to={getPagePath('Home')} className="flex-shrink-0">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {primaryNavItems.map(({ label, pageKey }) => (
            <Link
              key={pageKey}
              to={getPagePath(pageKey)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                activePageKey === pageKey
                  ? 'bg-white/10 text-white'
                  : 'text-white/80 hover:bg-white/5 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={businessDetails.phones.primary.href}
            className="flex items-center gap-1.5 text-xs text-white/80 transition-colors hover:text-white"
          >
            <Phone className="h-3.5 w-3.5" />
            {businessDetails.phones.primary.display}
          </a>
          <Link to={getPagePath('Contact')}>
            <Button className="bg-[#b91c1c] px-5 text-sm font-semibold text-white hover:bg-[#991b1b]">
              Get in Touch
            </Button>
          </Link>
        </div>

        <button
          type="button"
          className="p-2 text-white md:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setIsMobileMenuOpen((currentState) => !currentState)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#1e1b4b] pb-4 md:hidden">
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
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
