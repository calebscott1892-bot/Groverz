import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  Calculator,
  FileText,
  Home,
  Scale,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import ServiceAccordionCard from '@/components/services/ServiceAccordionCard';
import { Button } from '@/components/ui/button';
import CallToActionSection from '@/components/sections/CallToActionSection';
import FaqSection from '@/components/sections/FaqSection';
import PageHeroSection from '@/components/sections/PageHeroSection';
import ProcessTimelineSection from '@/components/sections/ProcessTimelineSection';
import TaxRefundEstimatorSection from '@/components/sections/TaxRefundEstimatorSection';
import { getPagePath } from '@/config/routes';

const serviceCategories = [
  { key: 'all', label: 'All services' },
  { key: 'personal', label: 'Personal' },
  { key: 'business', label: 'Business' },
  { key: 'corporate', label: 'Trusts & Companies' },
  { key: 'finance', label: 'Finance' },
];

const categoryLabels = {
  personal: 'Personal',
  business: 'Business',
  corporate: 'Trusts & Companies',
  finance: 'Finance',
};

const serviceItems = [
  {
    icon: Calculator,
    title: 'Personal Tax Returns',
    description:
      'Your refund should reflect what you actually earned and spent — not just the low-hanging deductions.',
    category: 'personal',
    details:
      "Whether you're a PAYG employee, have investment income, or manage rental properties, we go through your situation properly — not just run the numbers through a template. The difference usually shows up in your refund.",
    includedItems: [
      'Income tax return preparation and lodgement',
      'Investment property and capital gains tax',
      'PAYG summaries and deduction claims',
      'HECS/HELP debt and Medicare levy',
      'Private health insurance rebate',
      'Fringe benefits tax reporting',
    ],
  },
  {
    icon: Building2,
    title: 'Business Accounting',
    description:
      'Clean books, timely reports, and advice that helps you run your business — not just satisfy the ATO.',
    category: 'business',
    details:
      "From daily bookkeeping to end-of-year reporting, we keep your financials in order so you can make decisions based on real numbers — not guesswork. We work with sole traders, partnerships and companies at all stages.",
    includedItems: [
      'Bookkeeping and financial reporting',
      'Business structuring and advisory',
      'Cash flow management and forecasting',
      'Sole trader and partnership returns',
      'Profit and loss statements',
      'Payroll setup and management',
    ],
  },
  {
    icon: Scale,
    title: 'Trust & Company Tax',
    description:
      'Trust and company structures handled properly — distributions, returns, ASIC, the lot.',
    category: 'corporate',
    details:
      "Complex structures shouldn't mean a complex experience for you. We handle the annual returns, distribution planning and compliance so your entity stays tax-efficient and the paperwork stays out of your way.",
    includedItems: [
      'Company and trust tax return preparation',
      'Trust distribution planning and minutes',
      'Entity structuring advice',
      'Director and shareholder reporting',
      'Annual ASIC compliance',
      'Corporate tax planning strategies',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Tax Planning',
    description:
      'Year-round planning that finds opportunities early — not a last-minute EOFY scramble.',
    category: 'personal',
    details:
      "Good tax planning starts well before June 30. We work with you throughout the year to structure your affairs, time your decisions, and make sure you're not handing over more than you need to.",
    includedItems: [
      'Year-round tax minimisation strategies',
      'Pre and post year-end planning',
      'Superannuation optimisation',
      'Investment structuring advice',
      'Capital gains tax planning',
      'Salary packaging guidance',
    ],
  },
  {
    icon: FileText,
    title: 'BAS, GST & Compliance',
    description:
      'BAS lodged on time, every time. No nasty ATO letters landing in your inbox.',
    category: 'business',
    details:
      "Staying on top of BAS and GST obligations means no penalties, no interest charges, and no surprises. We handle the preparation and lodgement and keep you informed about what's coming up.",
    includedItems: [
      'BAS and IAS preparation and lodgement',
      'GST registration and reporting',
      'PAYG withholding and instalments',
      'ATO correspondence and audit support',
      'Superannuation guarantee compliance',
      'Fuel tax credit claims',
    ],
  },
  {
    icon: Award,
    title: 'Self Managed Super Funds',
    description:
      'Your super, your control — but with the compliance and admin handled professionally.',
    category: 'corporate',
    details:
      "Running your own fund gives you control, but the rules are strict and the admin never stops. We handle annual returns, financial statements and compliance so your SMSF stays on the right side of the regulator.",
    includedItems: [
      'SMSF annual tax return preparation',
      'Financial statement preparation',
      'Member contribution reporting',
      'Pension and accumulation phase management',
      'Rollover and transfer support',
      'Audit coordination',
    ],
  },
  {
    icon: Home,
    title: 'Mortgage Broking',
    description:
      'We match your financial picture to the right loan — whether you\'re buying, refinancing, or investing.',
    category: 'finance',
    details:
      "Because we already know your financial situation, we're in a unique position to find lending options that actually fit. No hard sell, no commission-driven recommendations — just practical guidance through the home loan process.",
    includedItems: [
      'First home buyer support and guidance',
      'Refinancing and loan restructuring',
      'Investment property lending',
      'Pre-approval assistance',
      'Lender comparison and selection',
      'Ongoing loan reviews',
    ],
  },
];

const clientTypes = [
  {
    icon: User,
    title: 'Individuals',
    description: 'PAYG workers, investors, retirees',
  },
  {
    icon: Briefcase,
    title: 'Sole Traders',
    description: 'Tradies, freelancers, consultants',
  },
  { icon: Users, title: 'Partnerships', description: 'Business partners of all sizes' },
  { icon: Scale, title: 'Trusts', description: 'Family, discretionary and unit trusts' },
  { icon: Building2, title: 'Companies', description: 'Small businesses and Pty Ltds' },
];

const serviceHighlights = [
  {
    title: 'Fixed fees, quoted upfront',
    description: "You'll know the cost before any work begins. No hourly billing, no surprises.",
  },
  {
    title: 'All entity types covered',
    description: 'From a $99 individual return to complex trust and company structures.',
  },
  {
    title: 'Plain-English guidance',
    description: "We explain what we're doing and why — in language that makes sense.",
  },
];

const serviceFaqs = [
  {
    question: 'How much does a tax return cost?',
    answer:
      "Individual returns start from $99. Business, trust and company returns depend on complexity. We'll always provide a clear fixed-fee quote before starting — you'll never be surprised by an invoice.",
  },
  {
    question: 'Can I switch to you mid-year?',
    answer:
      "Absolutely. We'll coordinate with your previous accountant (or the ATO directly) to make sure we have what we need. The transition is usually smoother than people expect.",
  },
  {
    question: 'How do I send you my documents?',
    answer:
      "Whatever's easiest for you. Email, drop them off in person, photograph them on your phone — we're flexible. We'll let you know if we need anything else.",
  },
  {
    question: "I'm a tradie — do you understand my deductions?",
    answer:
      "We work with a lot of tradies and sole traders in Perth. We know the deductions that apply to your industry — tools, vehicles, clothing, travel between sites — and we make sure nothing gets missed.",
  },
  {
    question: "I've got a few years of overdue returns. Can you help?",
    answer:
      "Yes, and it's more common than you think. We'll work through them methodically, communicate with the ATO on your behalf, and get you back on track. The sooner you start, the easier it is.",
  },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedServiceTitle, setExpandedServiceTitle] = useState(null);

  const filteredServices =
    activeCategory === 'all'
      ? serviceItems
      : serviceItems.filter((item) => item.category === activeCategory);
  const activeCategoryLabel =
    activeCategory === 'all' ? 'All services' : categoryLabels[activeCategory];

  function handleCategoryChange(categoryKey) {
    setActiveCategory(categoryKey);
    setExpandedServiceTitle(null);
  }

  function handleServiceToggle(serviceTitle) {
    setExpandedServiceTitle((currentTitle) =>
      currentTitle === serviceTitle ? null : serviceTitle
    );
  }

  return (
    <div>
      <PageHeroSection
        title="Services that actually help, not just tick boxes"
        subtitle="Clear, fixed-fee tax, accounting and finance support for individuals, sole traders and businesses across Perth."
        actionLabel="Discuss Your Situation"
        actionPageKey="Contact"
      />

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
              Service areas
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-[#1e1b4b] sm:text-3xl">
              Open any service to see what&apos;s included
            </h2>
            <p className="mt-3 text-gray-500">
              Filter by category or browse them all. Every service comes with a fixed-fee quote
              before work begins.
            </p>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-3">
            {serviceHighlights.map(({ title, description }) => (
              <div key={title} className="h-full rounded-xl border border-gray-100 bg-gray-50 p-5">
                <h3 className="text-sm font-semibold text-[#1e1b4b]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
              </div>
            ))}
          </div>

          <div className="mb-10 flex justify-center gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-x-visible sm:pb-0">
            {serviceCategories.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => handleCategoryChange(key)}
                className={`flex-shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  activeCategory === key
                    ? 'bg-[#1e1b4b] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mb-4 flex items-center justify-between gap-3 text-sm text-gray-500">
            <p>{activeCategoryLabel}</p>
            <p>
              {filteredServices.length} service{filteredServices.length === 1 ? '' : 's'}
            </p>
          </div>

          <div className="space-y-3">
            {filteredServices.map((item) => (
              <ServiceAccordionCard
                key={item.title}
                item={{ ...item, categoryLabel: categoryLabels[item.category] }}
                expanded={expandedServiceTitle === item.title}
                onToggle={() => handleServiceToggle(item.title)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
              Who we help
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-[#1e1b4b] sm:text-3xl">
              From simple returns to complex structures
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-500">
              Whether you&apos;re a nurse claiming uniform deductions or a business owner with
              multiple entities, the process is the same — clear, organised and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {clientTypes.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-gray-100 bg-white p-5 text-center transition-shadow hover:shadow-md"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[#1e1b4b]/10">
                  <Icon className="h-6 w-6 text-[#1e1b4b]" />
                </div>
                <h3 className="text-sm font-semibold text-[#1e1b4b]">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
            Pricing
          </p>
          <h3 className="mb-3 text-xl font-bold text-[#1e1b4b]">
            You&apos;ll know the price before we start
          </h3>
          <p className="leading-relaxed text-gray-600">
            We quote a fixed fee based on your situation — not hours worked. No surprises, no
            creeping invoices, no awkward conversations after the fact.
          </p>
          <Link to={getPagePath('Contact')} className="mt-6 inline-block">
            <Button className="h-auto gap-2 bg-[#b91c1c] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#991b1b]">
              Get a Quote
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <ProcessTimelineSection
        title="What happens after you reach out"
        description="You'll know exactly what's happening at each stage. No guessing, no waiting in the dark."
      />
      <TaxRefundEstimatorSection />
      <FaqSection
        title="Service questions"
        description="Common questions about scope, pricing and how we work with new clients."
        items={serviceFaqs}
      />
      <CallToActionSection
        title="Not sure which service fits?"
        description="Tell us a bit about your situation and we'll point you in the right direction — before any work begins or fees apply."
        primaryLabel="Ask Us Anything"
      />
    </div>
  );
}
