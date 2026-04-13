import React from 'react';

const defaultItems = [
  {
    number: '01',
    title: 'Reach out',
    description: 'Call, email, or fill in the form. We respond within a few hours during business hours.',
  },
  {
    number: '02',
    title: 'Send your docs',
    description: 'Email, drop off, or photograph them. We\'ll let you know if anything\'s missing.',
  },
  {
    number: '03',
    title: 'We do the work',
    description: 'Your return or accounts are prepared, reviewed with you, and lodged with the ATO.',
  },
  {
    number: '04',
    title: 'Stay in touch',
    description: 'Questions come up year-round. So do we. Tax planning, BAS, advice — whenever you need it.',
  },
];

export default function ProcessTimelineSection({
  items = defaultItems,
  title = 'How it works',
  description = null,
}) {
  return (
    <section className="section-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#1e1b4b] sm:text-3xl">{title}</h2>
          {description && (
            <p className="mt-4 text-lg leading-relaxed text-gray-500">{description}</p>
          )}
        </div>

        <div className="relative">
          <div className="absolute left-6 top-8 hidden h-[calc(100%-64px)] w-px bg-gradient-to-b from-[#b91c1c]/30 via-[#b91c1c]/15 to-transparent lg:left-1/2 lg:block lg:-translate-x-px" />

          <div className="grid gap-8 lg:gap-0">
            {items.map(({ number, title: itemTitle, description: itemDesc }, index) => (
              <div key={number} className="relative lg:grid lg:grid-cols-2 lg:gap-12">
                {index % 2 === 0 ? (
                  <>
                    <div className="hidden lg:block" />
                    <div className="relative pl-14 sm:pl-16 lg:pl-12">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#b91c1c]/20 bg-white text-sm font-bold text-[#b91c1c] shadow-sm sm:h-12 sm:w-12 lg:left-[-30px]">
                        {number}
                      </div>
                      <div className="rounded-2xl border border-gray-100/80 bg-white p-6 shadow-sm">
                        <h3 className="mb-2 text-lg font-semibold text-[#1e1b4b]">{itemTitle}</h3>
                        <p className="text-sm leading-relaxed text-gray-500">{itemDesc}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative pl-14 sm:pl-16 lg:pl-0 lg:pr-12 lg:text-right">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#b91c1c]/20 bg-white text-sm font-bold text-[#b91c1c] shadow-sm sm:h-12 sm:w-12 lg:left-auto lg:right-[-30px]">
                        {number}
                      </div>
                      <div className="rounded-2xl border border-gray-100/80 bg-white p-6 shadow-sm">
                        <h3 className="mb-2 text-lg font-semibold text-[#1e1b4b]">{itemTitle}</h3>
                        <p className="text-sm leading-relaxed text-gray-500">{itemDesc}</p>
                      </div>
                    </div>
                    <div className="hidden lg:block" />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
