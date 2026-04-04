import React from 'react';

import { businessDetails } from '@/config/site';

export default function BrandMark({ className = '', context = 'header' }) {
  const sizeClass =
    context === 'footer'
      ? 'w-[220px] sm:w-[270px] lg:w-[300px]'
      : context === 'header'
        ? 'w-[180px] sm:w-[220px] lg:w-[250px]'
        : 'w-[170px] sm:w-[210px]';

  return (
    <img
      src="/logo.png"
      alt={businessDetails.name}
      className={`block ${sizeClass} h-auto max-w-none ${className}`.trim()}
    />
  );
}
