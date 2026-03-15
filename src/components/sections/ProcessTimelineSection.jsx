import React from 'react';

const defaultItems = [
  {
    number: '01',
    title: 'Get in touch',
    description: 'Reach out by phone, email, or through the website.',
  },
  {
    number: '02',
    title: 'Share your details',
    description: "Send us your documents and we'll review everything.",
  },
  {
    number: '03',
    title: 'Preparation & lodgement',
    description: 'We prepare your return or accounts and lodge with the ATO.',
  },
  {
    number: '04',
    title: 'Ongoing support',
    description: 'Year-round advice whenever you need it.',
  },
];

export default function ProcessTimelineSection({ items = defaultItems, title = 'How it works' }) {
  return (
    <section className="section-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-[#1e1b4b] sm:text-3xl">
          {title}
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ number, title: itemTitle, description }) => (
            <div key={number} className="rounded-xl border border-gray-100 bg-white p-6">
              <div className="mb-3 text-3xl font-bold text-[#b91c1c]/20">{number}</div>
              <h3 className="mb-2 text-base font-semibold text-[#1e1b4b]">{itemTitle}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
