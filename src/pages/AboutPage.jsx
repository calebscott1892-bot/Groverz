import React from 'react';
import {
  ArrowRight,
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
import { Link } from 'react-router-dom';

import PhotoPlaceholder from '@/components/common/PhotoPlaceholder';
import { Button } from '@/components/ui/button';
import CallToActionSection from '@/components/sections/CallToActionSection';
import FaqSection from '@/components/sections/FaqSection';
import PageHeroSection from '@/components/sections/PageHeroSection';
import ProcessTimelineSection from '@/components/sections/ProcessTimelineSection';
import { getPagePath } from '@/config/routes';

const helpCards = [
  {
    icon: Calculator,
    title: 'Personal tax returns',
    description:
      'Individual returns prepared with every eligible deduction claimed — not just the obvious ones.',
  },
  {
    icon: Building2,
    title: 'Small business accounting',
    description:
      'Bookkeeping, reporting and advisory that gives you a clear picture of where your business actually stands.',
  },
  {
    icon: FileText,
    title: 'BAS & GST lodgement',
    description:
      'Accurate, on-time lodgement so the ATO stays off your back and your cash flow stays predictable.',
  },
  {
    icon: HeartHandshake,
    title: 'Year-round support',
    description:
      "Tax questions don't only come up in July. We're available all year for planning, compliance and advice.",
  },
];

const expectations = [
  { icon: MessageSquare, text: 'Plain-English explanations' },
  { icon: ShieldCheck, text: 'Advice you can act on' },
  { icon: Clock, text: 'Deadlines we actually meet' },
  { icon: Handshake, text: 'No runaround process' },
  { icon: HeartHandshake, text: 'Respectful, personal service' },
  { icon: CheckCircle, text: 'Fees agreed upfront' },
];

const profileFacts = [
  { label: 'Local base', value: 'East Cannington, WA' },
  { label: 'Practice', value: 'Independent for 5+ years' },
  { label: 'Education', value: 'Curtin University graduate' },
];

const aboutFaqs = [
  {
    question: 'Who actually does my tax return?',
    answer:
      "Ankit personally handles your work. You're not handed off to junior staff or farmed out to a processing centre. The person you talk to is the person who does the work.",
  },
  {
    question: "I've never used an accountant before — is that okay?",
    answer:
      "Absolutely. A large portion of our clients come to us after years of doing their own returns through myTax. There's no judgement — we'll walk you through everything and you'll quickly see the difference.",
  },
  {
    question: 'Do I need to come into the office?',
    answer:
      "Not if you don't want to. Many clients work with us entirely by phone, email or video call. We're flexible.",
  },
  {
    question: 'What if my tax situation is complicated?',
    answer:
      "That's what we're here for. Whether it's multiple income streams, investment properties, trust structures, or catching up on years of overdue returns — we've handled it before.",
  },
  {
    question: 'How quickly will my return be done?',
    answer:
      "Most individual returns are prepared and lodged within 3–5 business days of receiving your documents. Business and trust returns depend on complexity, but we'll always give you a clear timeline upfront.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeroSection
        title="The person behind the practice"
        subtitle="A straightforward accountant in East Cannington who'd rather do good work than talk about it."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-5">
            <div className="space-y-5 lg:col-span-2">
              <PhotoPlaceholder facts={profileFacts} />

              <div className="rounded-2xl border border-[#1e1b4b]/10 bg-[#1e1b4b]/[0.03] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1e1b4b]/60">
                  How we work
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
                  Straightforward work, clear communication, and a process that doesn&apos;t waste
                  your time. That&apos;s the whole idea.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3 lg:pt-4">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#b91c1c]">
                Meet Ankit
              </p>
              <h2 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-[#1e1b4b] sm:text-4xl">
                Built on accurate work and honest advice — not marketing slogans
              </h2>
              <p className="mt-3 text-sm font-medium text-[#b91c1c]">
                Principal / Founder | Registered Tax Agent
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#1e1b4b]/80">
                I started Groverz because I kept seeing the same problem: people overpaying on tax
                because their accountant was too busy (or too disinterested) to look properly. I
                wanted to run a practice where every client gets the attention their return deserves.
              </p>

              <div className="mt-10 space-y-8">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1e1b4b]/55">
                    Background
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-gray-600">
                    I moved from India to Perth in 2008, completed my degrees at Curtin University,
                    and built my practice right here in Cannington. Fifteen-plus years in the area
                    means I understand the local community — the tradies, the small business owners,
                    the families juggling rentals and HECS debt.
                  </p>
                </div>

                <div className="grid gap-8 border-t border-[#1e1b4b]/10 pt-8 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1e1b4b]/55">
                      What makes this different
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-gray-600">
                      With five years running my own practice, the focus hasn&apos;t changed:
                      accurate work, straight talk, and advice that actually helps you keep more of
                      what you earn. I don&apos;t upsell services you don&apos;t need.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1e1b4b]/55">
                      Outside the office
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-gray-600">
                      When I&apos;m not staring at tax returns, you&apos;ll find me with my family,
                      somewhere near the river or the beach. Perth&apos;s too good to spend every
                      weekend indoors.
                    </p>
                  </div>
                </div>

                <div className="max-w-3xl rounded-2xl border border-[#1e1b4b]/10 bg-[#f8f5ef] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1e1b4b]/55">
                    Who this practice is for
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-gray-600">
                    If you want one reliable person to handle your tax, bookkeeping and compliance —
                    someone who picks up the phone and knows your situation without having to look it
                    up — that&apos;s what I set this up to be.
                  </p>
                  <Link to={getPagePath('Contact')} className="mt-4 inline-block">
                    <Button className="h-auto gap-2 bg-[#b91c1c] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#991b1b]">
                      Start a Conversation
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
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
              What we handle
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1e1b4b] sm:text-4xl">
              The work most people come to us for
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-500">
              Everyone&apos;s situation is a bit different, but most of our clients need one or more
              of these handled properly and on time.
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
              What to expect
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-[#1e1b4b] sm:text-3xl">
              How things actually work day to day
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-500">
              No jargon-heavy reports, no chasing for updates. Clear communication and deadlines
              that get met.
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
        title="From first contact to ongoing support"
        description="Here's what the process looks like from your side. No surprises, no waiting in the dark."
      />
      <FaqSection
        title="Questions people ask before getting started"
        description="If your question isn't here, just ask — that's literally what the contact page is for."
        items={aboutFaqs}
      />
      <CallToActionSection
        title="Curious if we're the right fit?"
        description="We're happy to have a quick chat — no strings, no sales pitch. Just an honest conversation about whether we can help."
        primaryLabel="Start a Conversation"
      />
    </div>
  );
}
