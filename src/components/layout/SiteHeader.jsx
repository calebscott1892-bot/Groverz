import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';

import BrandMark from '@/components/common/BrandMark';
import { Button } from '@/components/ui/button';
import { getPagePath } from '@/config/routes';
import { businessDetails, primaryNavItems } from '@/config/site';

export default function SiteHeader({ activePageKey }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  /* ── Liquid-glass hover tracker ── */
  const navRef = useRef(null);
  const [hoveredRect, setHoveredRect] = useState(null);

  const handleNavEnter = useCallback((e) => {
    const nav = navRef.current;
    if (!nav) return;
    const navBox = nav.getBoundingClientRect();
    const linkBox = e.currentTarget.getBoundingClientRect();
    setHoveredRect({
      left: linkBox.left - navBox.left,
      width: linkBox.width,
      top: linkBox.top - navBox.top,
      height: linkBox.height,
    });
  }, []);

  const handleNavLeave = useCallback(() => {
    setHoveredRect(null);
  }, []);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1e1b4b]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:h-24 sm:px-6 lg:px-8">

        {/* ── Logo with scroll-unroll animation ── */}
        <Link
          to={getPagePath('Home')}
          className="flex-shrink-0"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <motion.div
            className="overflow-hidden rounded-xl bg-[#f8f5ef] px-3 shadow-[0_10px_24px_rgba(15,23,42,0.16)] ring-1 ring-black/5"
            animate={{
              paddingTop: isLogoHovered ? 12 : 8,
              paddingBottom: isLogoHovered ? 14 : 8,
              y: isLogoHovered ? -2 : 0,
              boxShadow: isLogoHovered
                ? '0 18px 36px rgba(15,23,42,0.22)'
                : '0 10px 24px rgba(15,23,42,0.16)',
            }}
            transition={{
              type: 'spring',
              stiffness: 340,
              damping: 18,
              mass: 0.8,
            }}
          >
            <motion.div
              animate={{
                y: isLogoHovered ? 3 : 0,
                scaleY: isLogoHovered ? 1.015 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 16,
                mass: 0.6,
              }}
              style={{ transformOrigin: 'top center' }}
            >
              <BrandMark context="header" />
            </motion.div>
          </motion.div>
        </Link>

        {/* ── Desktop nav with liquid glass hover ── */}
        <nav
          ref={navRef}
          className="relative hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 md:flex"
          onMouseLeave={handleNavLeave}
        >
          {/* Liquid glass blob */}
          <AnimatePresence>
            {hoveredRect && (
              <motion.span
                className="pointer-events-none absolute z-0 rounded-full"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)',
                  boxShadow:
                    'inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 1px rgba(255,255,255,0.05), 0 0 20px rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
                initial={{
                  left: hoveredRect.left,
                  top: hoveredRect.top,
                  width: hoveredRect.width,
                  height: hoveredRect.height,
                  opacity: 0,
                  scale: 0.92,
                }}
                animate={{
                  left: hoveredRect.left,
                  top: hoveredRect.top,
                  width: hoveredRect.width,
                  height: hoveredRect.height,
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 28,
                  mass: 0.7,
                }}
              />
            )}
          </AnimatePresence>

          {primaryNavItems.map(({ label, pageKey }) => (
            <Link
              key={pageKey}
              to={getPagePath(pageKey)}
              onMouseEnter={handleNavEnter}
              className={`relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                activePageKey === pageKey
                  ? 'bg-white text-[#1e1b4b] shadow-sm'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={businessDetails.phones.primary.href}
            className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/80 transition-colors hover:text-white lg:flex"
          >
            <Phone className="h-3.5 w-3.5" />
            {businessDetails.phones.primary.display}
          </a>
          <Link to={getPagePath('Contact')}>
            <Button className="h-10 rounded-full bg-[#b91c1c] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(127,29,29,0.2)] hover:bg-[#991b1b]">
              Book a Consultation
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
          <nav className="flex flex-col gap-1 px-4 pt-3">
            {primaryNavItems.map(({ label, pageKey }) => (
              <Link
                key={pageKey}
                to={getPagePath(pageKey)}
                onClick={closeMobileMenu}
                className={`rounded-xl px-4 py-3 text-sm font-medium ${
                  activePageKey === pageKey
                    ? 'bg-white text-[#1e1b4b]'
                    : 'bg-white/[0.03] text-white/90 hover:bg-white/8 hover:text-white'
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
                Book a Consultation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
