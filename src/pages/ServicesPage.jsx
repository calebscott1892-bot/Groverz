import React, { useState } from 'react';
import {
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

import ServiceAccordionCard from '@/components/services/ServiceAccordionCard';
import CallToActionSection from '@/components/sections/CallToActionSection';
import FaqSection from '@/components/sections/FaqSection';
import PageHeroSection from '@/components/sections/PageHeroSection';
import ProcessTimelineSection from '@/components/sections/ProcessTimelineSection';
import TaxRefundEstimatorSection from '@/components/sections/TaxRefundEstimatorSection';

const serviceCategories = [
  { key: 'all', label: 'All Services' },
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
    description: 'Individual income tax returns prepared and lodged to maximise your refund.',
    category: 'personal',
    details:
      "We take the stress out of tax time. Whether you're a PAYG employee, have investment income, or manage rental properties, we'll ensure every allowable deduction is claimed and your return is lodged accurately.",
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
    description: 'Bookkeeping, financial reporting and advisory for small businesses.',
    category: 'business',
    details:
      'From day-to-day bookkeeping to end-of-year reporting, we keep your financials organised so you can focus on running your business. We work with sole traders, partnerships and companies of all sizes.',
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
    description: 'Tax returns, compliance and structuring for trusts and companies.',
    category: 'corporate',
    details:
      "We handle the complexity of trust and company structures so you don't have to. From annual returns to distribution planning, we ensure your entity stays compliant and tax-efficient.",
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
    description: 'Year-round strategies to legally minimise your tax obligations.',
    category: 'personal',
    details:
      "Tax planning isn't just something you do at the end of the financial year. We work with you throughout the year to identify opportunities, structure your affairs, and ensure you're not paying more than you need to.",
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
    description: 'Accurate preparation and lodgement of BAS, IAS and GST returns.',
    category: 'business',
    details:
      'Stay on top of your obligations with timely and accurate BAS and GST lodgements. We handle the paperwork and keep you informed, so there are no nasty surprises from the ATO.',
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
    description: 'SMSF administration, tax returns and compliance services.',
    category: 'corporate',
    details:
      'Running your own super fund gives you control, but it comes with responsibilities. We handle the administration, tax returns and compliance so your SMSF stays on track and within the rules.',
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
      'Home loan guidance to help you find the right fit, whether buying, refinancing, or investing.',
    category: 'finance',
    details:
      "Navigating the home loan market can be overwhelming. We help simplify the process by understanding your financial position and matching you with suitable lending options. Whether you're a first home buyer, looking to refinance, or expanding your property portfolio, we're here to guide you through it.",
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
  { icon: User, title: 'Individuals', description: 'PAYG employees, investors and retirees' },
  {
    icon: Briefcase,
    title: 'Sole Traders',
    description: 'Self-employed professionals and tradespeople',
  },
  { icon: Users, title: 'Partnerships', description: 'Business partnerships of all sizes' },
  { icon: Scale, title: 'Trusts', description: 'Family, discretionary and unit trusts' },
  { icon: Building2, title: 'Companies', description: 'Small businesses and private companies' },
];

const serviceHighlights = [
  {
    title: 'Fixed-fee options',
    description: 'Clear scope and pricing before work begins.',
  },
  {
    title: 'Support across structures',
    description: 'From individuals and sole traders to trusts and companies.',
  },
  {
    title: 'Straightforward guidance',
    description: 'Practical advice without unnecessary jargon.',
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
        title="Tax, Accounting & Finance Services"
        subtitle="Clear, fixed-fee support for individuals, sole traders and business structures across Perth."
        actionLabel="Discuss Your Needs"
        actionPageKey="Contact"
      />

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
              Service categories
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-[#1e1b4b] sm:text-3xl">
              Our services
            </h2>
            <p className="mt-3 text-gray-500">
              Choose a category to narrow the list, then open any service to see what&apos;s
              included.
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

          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {serviceCategories.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => handleCategoryChange(key)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
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
              Client fit
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-[#1e1b4b] sm:text-3xl">
              Who we help
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-500">
              We work with clients at different stages, from individual returns through to more
              complex business and entity structures.
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
          <h3 className="mb-3 text-xl font-bold text-[#1e1b4b]">Transparent fixed-fee pricing</h3>
          <p className="leading-relaxed text-gray-600">
            We provide fixed-fee options depending on your needs. You&apos;ll always know the cost
            and scope upfront before we begin - no hourly billing, no hidden charges.
          </p>
        </div>
      </section>

      <ProcessTimelineSection description="Once you reach out, we keep the next steps clear so you know what to expect at each stage." />
      <TaxRefundEstimatorSection />
      <FaqSection
        title="Service questions"
        description="A few common questions about scope, timing and how we usually work with new clients."
      />
      <CallToActionSection
        title="Not sure which service fits?"
        description="Tell us a little about your situation and we'll point you to the right starting point before any work begins."
        primaryLabel="Ask About Services"
      />
    </div>
  );
}
