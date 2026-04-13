import React from 'react';

export default function PhotoPlaceholder({
  name = 'Ankit Grover',
  title = 'Registered Tax Agent',
  initials = 'AG',
  eyebrow = 'Principal / Founder',
  location = 'East Cannington, WA',
  facts = [],
  className = '',
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-[#1e1b4b]/10 bg-[#f8f5ef] p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ${className}`.trim()}
    >
      <div className="rounded-[24px] border border-[#1e1b4b]/10 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1e1b4b]/55">
              {eyebrow}
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-[#1e1b4b]">{name}</p>
            <p className="mt-1 text-sm font-medium text-[#b91c1c]">{title}</p>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#1e1b4b]/10 bg-[#1e1b4b] text-xl font-semibold tracking-[0.08em] text-white shadow-sm">
            {initials}
          </div>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#0f172a] p-6 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full border border-white" />
            <div className="absolute -bottom-10 -left-8 h-28 w-28 rounded-full border border-white" />
          </div>
          <div className="relative flex min-h-[160px] items-end rounded-[20px] border border-white/10 bg-white/5 p-6 sm:min-h-[220px]">
            <div className="absolute right-6 top-5 text-7xl font-semibold tracking-tight text-white/10">
              {initials}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
                Local Practice
              </p>
              <p className="mt-3 max-w-[14rem] text-xl font-semibold leading-tight">{name}</p>
              <p className="mt-2 text-sm text-white/70">{location}</p>
            </div>
          </div>
        </div>

        {facts.length > 0 && (
          <dl className="mt-6 grid gap-4 border-t border-[#1e1b4b]/10 pt-5 sm:grid-cols-3">
            {facts.map(({ label, value }) => (
              <div key={label} className="space-y-1">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1e1b4b]/45">
                  {label}
                </dt>
                <dd className="text-sm font-medium leading-relaxed text-[#1e1b4b]">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
