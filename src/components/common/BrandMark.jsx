import React from 'react';

import { businessDetails } from '@/config/site';

export default function BrandMark({ className = '' }) {
  return (
    <div className={`rounded-md bg-[#b91c1c] px-4 py-2 text-white ${className}`.trim()}>
      <span className="block text-sm font-bold leading-tight sm:text-base">
        {businessDetails.brandLines[0]}
        <br />
        {businessDetails.brandLines[1]}
      </span>
    </div>
  );
}
