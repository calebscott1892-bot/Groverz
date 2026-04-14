import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';
import WhatsAppButton from '@/components/common/WhatsAppButton';

export default function SiteLayout({ children, activePageKey }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader activePageKey={activePageKey} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
