import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Individual — Joondalup',
    initials: 'SM',
    quote:
      "I'd been doing my own return on myTax for years and thought I was fine. Ankit found $2,800 in deductions I had no idea I could claim. Now I don't go anywhere else.",
    rating: 5,
  },
  {
    name: 'James T.',
    role: 'Sole Trader — Electrician',
    initials: 'JT',
    quote:
      'I needed someone who gets tradies. Groverz sorted my BAS, caught deductions on my ute and tools, and set me up with a better structure. Wish I\'d switched sooner.',
    rating: 5,
  },
  {
    name: 'Priya K.',
    role: 'Small Business Owner — Cannington',
    initials: 'PK',
    quote:
      "Ankit handles our bookkeeping, BAS and tax. What I value most is that he actually picks up the phone and knows our situation without having to look it up. That's rare.",
    rating: 5,
  },
];

export default function TestimonialsSection({
  background = 'cream',
  description = 'Real feedback from Perth locals — individuals, tradies and small business owners we work with.',
}) {
  return (
    <section className={background === 'cream' ? 'section-cream' : 'bg-white'}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
            Client feedback
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#1e1b4b] sm:text-4xl">
            What clients say
          </h2>
          <p className="mt-4 text-lg text-gray-500">{description}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ name, role, initials, quote, rating }) => (
            <div
              key={name}
              className="relative rounded-2xl border border-gray-100/80 bg-white p-7 shadow-sm transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-md"
            >
              <div className="absolute -top-1 right-6 text-6xl font-serif leading-none text-[#b91c1c]/[0.07]">
                &ldquo;
              </div>

              <div className="relative">
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: rating }).map((_, starIndex) => (
                    <Star
                      key={`${name}-${starIndex}`}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="mb-6 text-sm leading-relaxed text-gray-600">{quote}</p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e1b4b] text-xs font-semibold tracking-wide text-white">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1e1b4b]">{name}</p>
                    <p className="text-xs text-gray-500">{role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
