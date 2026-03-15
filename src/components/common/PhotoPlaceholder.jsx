import React from 'react';

export default function PhotoPlaceholder({
  name = 'Ankit Grover',
  title = 'Registered Tax Agent',
  initials = 'AG',
  className = '',
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#1e1b4b]/10 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#0f172a] p-6 text-white shadow-sm ${className}`.trim()}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 top-0 h-48 w-48 translate-x-1/4 -translate-y-1/4 rounded-full bg-white" />
        <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/4 translate-y-1/4 rounded-full bg-white" />
      </div>

      <div className="relative flex min-h-[340px] flex-col justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            Founder Profile
          </p>
          <div className="mt-8 flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/10 text-3xl font-semibold">
            {initials}
          </div>
        </div>

        <div>
          <p className="text-2xl font-semibold tracking-tight">{name}</p>
          <p className="mt-2 text-sm text-white/70">{title}</p>
        </div>
      </div>
    </div>
  );
}
