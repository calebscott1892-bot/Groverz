import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Individual',
    quote:
      "Ankit made the whole tax return process so easy. He found deductions I didn't even know about and my refund was much better than expected. Highly recommend!",
    rating: 5,
  },
  {
    name: 'James T.',
    role: 'Sole Trader',
    quote:
      'As a tradie, I needed someone who understood my situation. Groverz sorted my BAS, tax return and even helped me set up a better structure. Great service.',
    rating: 5,
  },
  {
    name: 'Priya K.',
    role: 'Small Business Owner',
    quote:
      "Professional, responsive and always available when I have questions. They handle our bookkeeping and tax with zero fuss. It's a relief to have them on our side.",
    rating: 5,
  },
];

export default function TestimonialsSection({
  background = 'cream',
  description = "Feedback from individuals, sole traders and small business owners we've supported.",
}) {
  return (
    <section className={background === 'cream' ? 'section-cream' : 'bg-white'}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
            Client Feedback
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#1e1b4b] sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-gray-500">{description}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ name, role, quote, rating }) => (
            <div key={name} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: rating }).map((_, starIndex) => (
                  <Star
                    key={`${name}-${starIndex}`}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="mb-5 text-sm leading-relaxed text-gray-600">&quot;{quote}&quot;</p>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-semibold text-[#1e1b4b]">{name}</p>
                <p className="mt-0.5 text-xs text-gray-500">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
