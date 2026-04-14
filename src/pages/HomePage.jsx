import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  Building2,
  Calculator,
  CheckCircle,
  Clock,
  DollarSign,
  Home as HomeIcon,
  ShieldCheck,
  Star,
  Users,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import FloatingMathBackground from '@/components/common/FloatingMathBackground';
import CallToActionSection from '@/components/sections/CallToActionSection';
import TaxRefundEstimatorSection from '@/components/sections/TaxRefundEstimatorSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import { getPagePath } from '@/config/routes';

const serviceCards = [
  {
    icon: Calculator,
    title: 'Personal Tax Returns',
    description:
      'Stop leaving money on the table. We dig into every deduction so your refund reflects what you actually earned and spent.',
  },
  {
    icon: Building2,
    title: 'Business Accounting',
    description:
      'Your books stay clean, your BAS gets lodged, and you get reporting that actually helps you make decisions — not just tick boxes.',
  },
  {
    icon: Users,
    title: 'Sole Traders & Tradies',
    description:
      "You're flat out on the tools or with clients. We handle your tax, BAS and structure so you can focus on the work that pays.",
  },
  {
    icon: ShieldCheck,
    title: 'Trust & Company Tax',
    description:
      'Distribution planning, annual returns and compliance for trusts and companies — handled properly so the ATO has nothing to chase.',
  },
  {
    icon: Clock,
    title: 'Tax Planning',
    description:
      "We work with you throughout the year to spot opportunities early, not scramble at EOFY. The savings compound.",
  },
  {
    icon: Award,
    title: 'SMSF Services',
    description:
      'Self-managed super comes with paperwork and rules. We keep your fund compliant and your reporting squared away.',
  },
  {
    icon: HomeIcon,
    title: 'Mortgage Broking',
    description:
      "Buying, refinancing, or investing? We match your financial picture to the right lending options — no hard sell.",
  },
];

const trustMarkers = [
  {
    icon: ShieldCheck,
    title: 'Registered Tax Agent',
    description: 'Backed by the Tax Practitioners Board — your work is in qualified hands.',
  },
  {
    icon: DollarSign,
    title: 'Fixed fees, always',
    description: 'You know the cost before we start. No hourly billing. No invoice surprises.',
  },
  {
    icon: Clock,
    title: 'Fast turnaround',
    description: 'Most individual returns processed and lodged within 3–5 business days.',
  },
  {
    icon: Users,
    title: 'One point of contact',
    description: "You deal directly with Ankit — not a revolving door of junior staff.",
  },
];

const homepageStats = [
  { value: 'Over 5000', label: 'Returns Lodged' },
  { value: '$99', label: 'Individual Returns From' },
  { value: '5★', label: 'Google Reviews' },
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
      <section className="hero-gradient relative flex min-h-[420px] items-center overflow-hidden sm:min-h-[480px]">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="home-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#home-grid)" />
          </svg>
        </div>
        <FloatingMathBackground count={36} seed={42} />

        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            Over 5000 returns lodged
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your tax return shouldn&apos;t be the thing keeping you up at night
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">
            We&apos;re a small, focused practice in East Cannington that handles tax, accounting and
            BAS for everyday Perth workers, sole traders and small businesses. Fixed fees. Fast
            turnaround. No runaround.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to={getPagePath('Contact')} className="w-full sm:w-auto">
              <Button className="h-auto w-full gap-2 bg-[#b91c1c] px-8 py-3.5 text-base font-semibold text-white hover:bg-[#991b1b] sm:w-auto">
                Book a Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <span className="text-sm text-white/50">
              Individual returns from <span className="font-semibold text-white/80">$99</span>
            </span>
          </div>
        </div>

        <svg className="absolute bottom-0 left-0 w-full text-white" viewBox="0 0 1440 40" fill="none" preserveAspectRatio="none">
          <path d="M0 40h1440V20C1200 0 960 35 720 25 480 15 240 40 0 20v20z" fill="currentColor" />
        </svg>
      </section>

      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {homepageStats.map(({ value, label }, index) => (
              <div key={label} className="relative text-center">
                {index > 0 && (
                  <div className="absolute left-0 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-gray-200 md:block" />
                )}
                <p className="text-3xl font-bold text-[#1e1b4b] sm:text-4xl">{value}</p>
                <p className="mt-1.5 text-sm font-medium text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:text-left">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-500" />
            <p className="text-sm text-gray-600">
              Late lodgements can trigger{' '}
              <button
                type="button"
                onClick={() => setIsPenaltyInfoOpen(true)}
                className="cursor-pointer font-semibold text-[#b91c1c] underline decoration-[#b91c1c]/40 underline-offset-2 transition-colors hover:decoration-[#b91c1c]"
              >
                ATO penalties up to $1,565 per statement
              </button>
              . We keep you on track so this never happens.
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
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl sm:p-8"
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
              <h3 className="text-lg font-bold text-[#1e1b4b]">Late lodgement penalties</h3>
            </div>

            <h4 className="mb-3 text-base font-semibold text-[#1e1b4b]">
              The ATO doesn&apos;t let late returns slide
            </h4>

            <div className="space-y-3 text-sm leading-relaxed text-gray-600">
              <p>
                If you miss your lodgement deadline, the ATO can issue a Failure to Lodge (FTL)
                penalty — and it adds up fast.
              </p>
              <div className="space-y-2 rounded-lg bg-gray-50 p-4">
                <p>
                  <span className="font-semibold text-[#1e1b4b]">Small entities:</span> One penalty
                  unit ($313) for each 28-day period overdue, up to five units ($1,565).
                </p>
                <p>
                  <span className="font-semibold text-[#1e1b4b]">Medium entities:</span> Penalty
                  doubles for turnover between $1M–$20M.
                </p>
                <p>
                  <span className="font-semibold text-[#1e1b4b]">Large entities:</span> Five times
                  the base rate for income over $20M.
                </p>
              </div>
              <p className="text-xs italic text-gray-400">
                Using a registered tax agent like Groverz can extend your deadline — but only if
                you&apos;re registered with us before the original due date.
              </p>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-4">
              <Link to={getPagePath('Contact')}>
                <Button className="h-auto w-full bg-[#b91c1c] py-2.5 font-semibold text-white hover:bg-[#991b1b]">
                  Get Lodged On Time
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <section className="section-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
              Who we are
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1e1b4b] sm:text-4xl">
              One accountant. One relationship. No revolving door.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Groverz is run by Ankit Grover — a registered tax agent, Curtin University graduate,
              and East Cannington local since 2008. When you work with us, you talk to the same
              person every time. No call centres, no junior staff doing your return while a
              &quot;senior partner&quot; takes the credit.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              We handle tax returns, bookkeeping, BAS and business structures for people who want
              their numbers done right — without the corporate song and dance.
            </p>
            <Link to={getPagePath('About')} className="mt-6 inline-block">
              <Button
                variant="outline"
                className="h-auto gap-2 border-[#1e1b4b] px-6 py-2.5 font-semibold text-[#1e1b4b] hover:bg-[#1e1b4b] hover:text-white"
              >
                Meet Ankit
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
              What we do
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1e1b4b] sm:text-4xl">
              Tax, accounting &amp; finance — without the jargon
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Whether it&apos;s a straightforward individual return or something more complex, the
              process is the same: clear scope, fixed fee, no surprises.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {serviceCards.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className="group relative h-full overflow-hidden rounded-2xl border border-gray-100/80 bg-white p-6 shadow-sm transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-md"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-[#b91c1c] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1e1b4b]/[0.06] transition-colors group-hover:bg-[#b91c1c]/10">
                  <Icon className="h-5 w-5 text-[#1e1b4b] transition-colors group-hover:text-[#b91c1c]" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-[#1e1b4b]">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to={getPagePath('Services')}>
              <Button
                variant="outline"
                className="h-auto gap-2 border-[#1e1b4b] px-7 py-2.5 font-semibold text-[#1e1b4b] hover:bg-[#1e1b4b] hover:text-white"
              >
                See What&apos;s Included in Each Service
                <ArrowRight className="h-4 w-4" />
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
                Why people switch to us
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-[#1e1b4b] sm:text-4xl">
                What you actually get working with Groverz
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                We&apos;re not the cheapest and we&apos;re not the biggest. But our clients stay
                because the work is accurate, the communication is clear, and they never have to
                chase us.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {trustMarkers.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex gap-4 rounded-xl border border-gray-100/80 bg-white p-5">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#b91c1c]/[0.08]">
                      <Icon className="h-5 w-5 text-[#b91c1c]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#1e1b4b]">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-500">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
                Before your appointment
              </p>
              <h3 className="mb-2 text-xl font-bold text-[#1e1b4b]">
                Bring these and we&apos;ll do the rest
              </h3>
              <p className="mb-5 text-sm text-gray-500">
                Having these ready means we get straight to work — no back-and-forth.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {appointmentChecklist.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#b91c1c]" />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                <p className="text-sm text-amber-800">
                  <span className="font-semibold">Don&apos;t have everything?</span> That&apos;s
                  fine — bring what you can. We&apos;ll sort the rest out together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TaxRefundEstimatorSection />
      <TestimonialsSection background="cream" />
      <CallToActionSection
        title="Let's get your tax sorted"
        description="Whether it's a simple return or something more involved, start with a quick conversation. No charge, no obligation, no pushy sales pitch."
        primaryLabel="Book a Free Consultation"
        secondaryLabel="Call Ankit Directly"
      />
    </div>
  );
}
