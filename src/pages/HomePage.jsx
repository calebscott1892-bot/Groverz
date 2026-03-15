import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Award,
  Building2,
  Calculator,
  CheckCircle,
  Clock,
  Home as HomeIcon,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import CallToActionSection from '@/components/sections/CallToActionSection';
import TaxRefundEstimatorSection from '@/components/sections/TaxRefundEstimatorSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import { getPagePath } from '@/config/routes';

const serviceCards = [
  {
    icon: Calculator,
    title: 'Personal Tax Returns',
    description:
      'Maximise your refund with expert individual tax return preparation and lodgement.',
  },
  {
    icon: Building2,
    title: 'Business Services',
    description: 'Bookkeeping, BAS, financial reporting and advisory for growing businesses.',
  },
  {
    icon: Users,
    title: 'Sole Trader & Partnerships',
    description:
      'Tailored tax and accounting solutions for sole traders and partnership structures.',
  },
  {
    icon: ShieldCheck,
    title: 'Trust & Company Tax',
    description: 'Compliance and strategic tax planning for trusts and corporate entities.',
  },
  {
    icon: Clock,
    title: 'Tax Planning',
    description: 'Year-round tax planning strategies to minimise your obligations legally.',
  },
  {
    icon: Award,
    title: 'SMSF Services',
    description: 'Comprehensive Self Managed Super Fund administration and tax services.',
  },
  {
    icon: HomeIcon,
    title: 'Mortgage Broking',
    description: 'Home loan guidance for buying, refinancing, or investing in property.',
  },
];

const reasonsToChooseGroverz = [
  'Registered Tax Agent support backed by the Tax Practitioners Board',
  'Fixed-fee pricing with no hidden costs',
  'Fast turnaround times',
  'Personalised service, not a number',
  'Experienced across all entity types',
  'Based in East Cannington, WA',
];

const homepageStats = [
  { value: '500+', label: 'Returns Lodged' },
  { value: '$80', label: 'Tax Returns From' },
  { value: '5-star', label: 'Client Reviews' },
  { value: '100%', label: 'ATO Compliant' },
];

const appointmentChecklist = [
  'Tax File Number',
  'Postal Address & DOB',
  'Bank Details for Refund',
  'Photo ID (Licence/Passport)',
  'Spouse Details (if applicable)',
  'Private Health Insurance Statement',
  'ABN & PAYG Instalments',
  "Last Year's Tax Return",
];

export default function HomePage() {
  const [isPenaltyInfoOpen, setIsPenaltyInfoOpen] = useState(false);

  return (
    <div>
      <section className="hero-gradient relative flex min-h-[380px] items-center overflow-hidden sm:min-h-[440px]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/2 rounded-full bg-white" />
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/4 translate-y-1/2 rounded-full bg-white" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Maximise Your Tax Refunds Legally
          </h1>
          <p className="mt-4 text-xl font-semibold text-white/80 sm:text-2xl">Starting from $80</p>
          <p className="mt-2 max-w-md text-base text-white/60">
            Professional tax and accounting support for individuals and businesses across Perth.
          </p>
          <Link to={getPagePath('Contact')} className="mt-6 inline-block">
            <Button className="h-auto bg-[#b91c1c] px-8 py-3 text-base font-semibold text-white hover:bg-[#991b1b]">
              Get in Touch
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#b91c1c]" />
      </section>

      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {homepageStats.map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-[#1e1b4b] sm:text-3xl">{value}</p>
                <p className="mt-1 text-sm text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
              About Us
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1e1b4b] sm:text-4xl">
              Your Trusted Tax & Accounting Partner
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Groverz Tax & Accounting Solutions provides reliable tax and accounting support for
              individuals, sole traders and businesses across Perth. We focus on clear guidance,
              accurate lodgements and practical advice that helps you stay organised year-round.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              We believe your time is valuable, so our process is straightforward, efficient and
              focused on outcomes.
            </p>
            <Link to={getPagePath('About')} className="mt-6 inline-block">
              <Button
                variant="outline"
                className="h-auto border-[#1e1b4b] px-6 py-2.5 font-semibold text-[#1e1b4b] hover:bg-[#1e1b4b] hover:text-white"
              >
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:text-left">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-500" />
            <p className="text-sm text-gray-600">
              Lodge on time to{' '}
              <button
                type="button"
                onClick={() => setIsPenaltyInfoOpen(true)}
                className="cursor-pointer font-semibold text-[#b91c1c] underline decoration-[#b91c1c]/40 underline-offset-2 transition-colors hover:decoration-[#b91c1c]"
              >
                avoid late penalties from the ATO
              </button>
              . We help ensure you never miss a deadline.
            </p>
          </div>
        </div>
      </section>

      {isPenaltyInfoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsPenaltyInfoOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsPenaltyInfoOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-[#1e1b4b]">Did You Know?</h3>
            </div>

            <h4 className="mb-3 text-base font-semibold text-[#1e1b4b]">
              Penalties for Failure to Lodge on Time
            </h4>

            <div className="space-y-3 text-sm leading-relaxed text-gray-600">
              <p>
                A failure to lodge (FTL) on-time penalty is levied when you fail to lodge a return
                or statement within the stipulated period.
              </p>
              <div className="space-y-2 rounded-lg bg-gray-50 p-4">
                <p>
                  <span className="font-semibold text-[#1e1b4b]">Small entities:</span> One penalty
                  unit ($210) for each 28-day period overdue, up to a maximum of five units
                  ($1,050).
                </p>
                <p>
                  <span className="font-semibold text-[#1e1b4b]">Medium entities:</span> Penalty
                  doubles when turnover is between $1 million and $20 million.
                </p>
                <p>
                  <span className="font-semibold text-[#1e1b4b]">Large entities:</span> Penalty is
                  five times over, especially when assessable income exceeds $20 million.
                </p>
              </div>
              <p className="text-xs italic text-gray-400">
                Extensions may be granted if written notice is provided to the Commissioner before
                the deadline.
              </p>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-4">
              <Link to={getPagePath('Contact')}>
                <Button className="h-auto w-full bg-[#b91c1c] py-2.5 font-semibold text-white hover:bg-[#991b1b]">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
              Our Services
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1e1b4b] sm:text-4xl">
              Tax, Accounting & Finance Solutions
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              From individual tax returns to complex business structures - we&apos;ve got you
              covered.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group rounded-xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:border-[#b91c1c]/20 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#b91c1c]/10 transition-colors group-hover:bg-[#b91c1c]/20">
                  <Icon className="h-6 w-6 text-[#b91c1c]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#1e1b4b]">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to={getPagePath('Services')}>
              <Button
                variant="outline"
                className="h-auto border-[#1e1b4b] px-7 py-2.5 font-semibold text-[#1e1b4b] hover:bg-[#1e1b4b] hover:text-white"
              >
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
                Why Choose Us
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-[#1e1b4b] sm:text-4xl">
                The Groverz Difference
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                We combine professional expertise with a personal touch, ensuring every client
                receives the attention and care they deserve.
              </p>
              <ul className="mt-6 space-y-3">
                {reasonsToChooseGroverz.map((reason) => (
                  <li key={reason} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#b91c1c]" />
                    <span className="text-gray-700">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="mb-4 text-xl font-bold text-[#1e1b4b]">
                What to bring to your appointment
              </h3>
              <p className="mb-5 text-sm text-gray-500">Have these ready when we meet:</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {appointmentChecklist.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#b91c1c]" />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TaxRefundEstimatorSection />
      <TestimonialsSection background="cream" />
      <CallToActionSection />
    </div>
  );
}
