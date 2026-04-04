import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Phone } from 'lucide-react';

import { getPagePath } from '@/config/routes';

export default function NotFoundPage() {
  const location = useLocation();
  const pageName = location.pathname.substring(1).replace(/[^a-zA-Z0-9-_/]/g, '').slice(0, 60);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf8f4] p-6">
      <div className="w-full max-w-lg text-center">
        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-[#1e1b4b]/[0.06]">
          <span className="text-4xl font-bold text-[#1e1b4b]/30">?</span>
        </div>

        <h1 className="text-6xl font-bold text-[#1e1b4b]/15 sm:text-7xl">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-[#1e1b4b]">Page not found</h2>

        {pageName && (
          <p className="mt-3 leading-relaxed text-gray-500">
            We couldn&apos;t find a page called &ldquo;{pageName}&rdquo; on this site.
          </p>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to={getPagePath('Home')}
            className="inline-flex items-center gap-2 rounded-lg bg-[#1e1b4b] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#312e81]"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            to={getPagePath('Contact')}
            className="inline-flex items-center gap-2 rounded-lg border border-[#1e1b4b]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#1e1b4b] transition-colors hover:bg-[#1e1b4b]/5"
          >
            <Phone className="h-4 w-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
