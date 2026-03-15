import React from 'react';
import {
  Building2,
  Calculator,
  CheckCircle,
  Clock,
  FileText,
  Handshake,
  HeartHandshake,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

import PhotoPlaceholder from '@/components/common/PhotoPlaceholder';
import CallToActionSection from '@/components/sections/CallToActionSection';
import FaqSection from '@/components/sections/FaqSection';
import PageHeroSection from '@/components/sections/PageHeroSection';
import ProcessTimelineSection from '@/components/sections/ProcessTimelineSection';

const helpCards = [
  {
    icon: Calculator,
    title: 'Personal tax returns',
    description: 'Individual income tax preparation and lodgement to maximise your refund.',
  },
  {
    icon: Building2,
    title: 'Small business accounting',
    description: 'Bookkeeping, financial reporting and advisory tailored to your business.',
  },
  {
    icon: FileText,
    title: 'BAS & GST help',
    description: 'Accurate preparation and lodgement of BAS, IAS and GST returns.',
  },
  {
    icon: HeartHandshake,
    title: 'Ongoing support & advice',
    description: 'Year-round guidance for tax planning, compliance and any questions you have.',
  },
];

const expectations = [
  { icon: MessageSquare, text: 'Clear communication' },
  { icon: ShieldCheck, text: 'Practical guidance' },
  { icon: Clock, text: 'Reliable timelines' },
  { icon: Handshake, text: 'Straightforward process' },
  { icon: HeartHandshake, text: 'Professional, respectful service' },
  { icon: CheckCircle, text: 'No surprises on fees' },
];

const profileHighlights = [
  'Independent practice for 5 years',
  'Cannington-based for 10 years',
  'Curtin University graduate',
];

export default function AboutPage() {
  return (
    <div>
      <PageHeroSection
        title="About Groverz Tax & Accounting Solutions"
        subtitle="Clear, practical accounting support for individuals and small businesses."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <PhotoPlaceholder />
            </div>

            <div className="lg:col-span-3">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
                Meet Ankit
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-[#1e1b4b] sm:text-4xl">
                Ankit Grover
              </h2>
              <p className="mb-6 mt-1 text-sm font-medium text-[#b91c1c]">
                Principal / Founder | Registered Tax Agent
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {profileHighlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-[#1e1b4b]/10 bg-[#1e1b4b]/5 px-3 py-1 text-xs font-medium text-[#1e1b4b]"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              <div className="space-y-4 text-base leading-relaxed text-gray-600">
                <p>
                  Ankit Grover founded Groverz Tax & Accounting Solutions to give individuals and
                  small businesses clear, practical support without the runaround. After moving from
                  India to Australia in 2008 and completing his degrees at Curtin University, he
                  built his practice in Cannington and has spent the past decade in the local area.
                </p>
                <p>
                  With five years in independent practice, his focus is simple: accurate work,
                  straightforward communication and advice that helps clients stay organised,
                  compliant and confident year-round.
                </p>
                <p>
                  Outside the office, he enjoys spending time with his family, being outdoors and
                  making the most of Perth&apos;s rivers and beaches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
              Services
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1e1b4b] sm:text-4xl">
              How I can help
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-500">
              From straightforward returns to ongoing business support, these are the areas clients
              most often come to us for help with.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {helpCards.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#b91c1c]/10">
                  <Icon className="h-5 w-5 text-[#b91c1c]" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-[#1e1b4b]">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[#1e1b4b] sm:text-3xl">
              What you can expect
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-500">
              Our approach is built around clear advice, reliable follow-through and a process that
              feels easy to deal with.
            </p>
          </div>

          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expectations.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-5 py-4"
              >
                <Icon className="h-5 w-5 flex-shrink-0 text-[#b91c1c]" />
                <span className="text-sm font-medium text-[#1e1b4b]">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessTimelineSection title="What it's like to work together" />
      <FaqSection title="Questions we often hear" />
      <CallToActionSection
        title="Need straightforward advice?"
        description="If you'd like a practical second opinion or help getting organised, get in touch and we'll talk through the best next step."
      />
    </div>
  );
}
