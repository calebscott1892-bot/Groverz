import React from 'react';

import { businessDetails } from '@/config/site';

const logoPath = '/assets/logo.png';

export default function BrandMark({ className = '', imageClassName = '' }) {
  return (
    <div className={className}>
      <img
        src={logoPath}
        alt={businessDetails.name}
        className={`h-full w-auto object-contain ${imageClassName}`.trim()}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
