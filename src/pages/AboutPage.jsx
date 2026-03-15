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

const profileFacts = [
  { label: 'Local base', value: 'East Cannington, WA' },
  { label: 'Practice', value: 'Independent practice for 5 years' },
  { label: 'Background', value: 'Curtin University graduate' },
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
            <div className="space-y-5 lg:col-span-2">
              <PhotoPlaceholder facts={profileFacts} />

              <div className="rounded-2xl border border-[#1e1b4b]/10 bg-[#1e1b4b]/[0.03] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1e1b4b]/60">
                  What guides the work
                </p>
                <ul className="mt-4 space-y-3">
                  {expectations.slice(0, 3).map(({ text }) => (
                    <li key={text} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#b91c1c]" />
                      <span className="text-sm text-gray-600">{text}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-[#1e1b4b]/10 pt-4 text-sm leading-relaxed text-gray-500">
                  The aim is to keep tax and accounting support clear, steady and easy to deal with
                  from the first conversation onward.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3 lg:pt-4">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#b91c1c]">
                Meet Ankit
              </p>
              <h2 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-[#1e1b4b] sm:text-4xl">
                A local practice built on clear advice and dependable follow-through
              </h2>
              <p className="mt-3 text-sm font-medium text-[#b91c1c]">
                Principal / Founder | Registered Tax Agent
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#1e1b4b]/80">
                Groverz Tax & Accounting Solutions was founded to give individuals and small
                businesses practical support without the runaround.
              </p>

              <div className="mt-10 space-y-8">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1e1b4b]/55">
                    Background
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-gray-600">
                    Ankit Grover moved from India to Australia in 2008 and completed his degrees at
                    Curtin University. He later built his practice in Cannington and has spent the
                    past decade in the local area.
                  </p>
                </div>

                <div className="grid gap-8 border-t border-[#1e1b4b]/10 pt-8 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1e1b4b]/55">
                      Service approach
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-gray-600">
                      With five years in independent practice, his focus is simple: accurate work,
                      straightforward communication and advice that helps clients stay organised,
                      compliant and confident year-round.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1e1b4b]/55">
                      Local perspective
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-gray-600">
                      Outside the office, he enjoys spending time with his family, being outdoors
                      and making the most of Perth&apos;s rivers and beaches.
                    </p>
                  </div>
                </div>

                <div className="max-w-3xl rounded-2xl border border-[#1e1b4b]/10 bg-[#f8f5ef] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1e1b4b]/55">
                    Why clients come to us
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-gray-600">
                    The practice is set up for people who want one steady point of contact for tax
                    returns, business accounting, BAS and ongoing advice, with clear communication
                    around what is needed next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
              Practice Areas
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1e1b4b] sm:text-4xl">
              Where clients usually need support
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-500">
              Support is centred on the work most individuals and small businesses need handled
              properly, on time and with clear advice around it.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {helpCards.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="h-full rounded-xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-md"
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
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
              Service Style
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-[#1e1b4b] sm:text-3xl">
              How the practice works day to day
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-500">
              The service approach is built around clear explanations, dependable follow-through and
              a process that feels straightforward to deal with.
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

      <ProcessTimelineSection
        title="What it's like to work together"
        description="From the first conversation to ongoing support, we keep the process clear, calm and easy to follow."
      />
      <FaqSection
        title="Questions we often hear"
        description="A few of the common questions clients ask before getting started with us."
      />
      <CallToActionSection
        title="Need straightforward advice?"
        description="If you'd like a practical second opinion or help getting organised, get in touch and we'll talk through the best next step."
        primaryLabel="Talk to Us"
      />
    </div>
  );
}
