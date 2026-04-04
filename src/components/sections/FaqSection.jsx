import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const defaultItems = [
  {
    question: 'When is the deadline for lodging my tax return?',
    answer:
      'If you lodge your own return, the deadline is 31 October. If you use a registered tax agent like us, you may qualify for an extended deadline — but you need to be registered with us before the original due date.',
  },
  {
    question: 'What do I need to bring?',
    answer:
      "Your tax file number, photo ID, bank details for your refund, PAYG summary or income statements, and any receipts for deductions. Don't worry if you're missing something — we'll work it out together.",
  },
  {
    question: 'Can I do everything remotely?',
    answer:
      'Absolutely. Most of our clients work with us by phone, email or video call. You never have to come into the office unless you want to.',
  },
  {
    question: 'How much does it cost?',
    answer:
      "Individual returns start from $80. More complex work (businesses, trusts, SMSF) depends on scope — but we always provide a clear fixed-fee quote before we begin. You'll never be surprised by a bill.",
  },
  {
    question: "I've got overdue returns — can you help?",
    answer:
      'Yes, and it\'s more common than you think. We\'ll work through them methodically, liaise with the ATO on your behalf, and get you current. The sooner you reach out, the easier it is to sort out.',
  },
];

export default function FaqSection({
  items = defaultItems,
  title = 'Frequently asked questions',
  description = null,
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#1e1b4b] sm:text-3xl">{title}</h2>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-500">
              {description}
            </p>
          )}
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {items.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`faq-${index}`}
              className="rounded-xl border border-gray-100/80 bg-white px-6 shadow-sm transition-all data-[state=open]:border-[#b91c1c]/15 data-[state=open]:shadow-md"
            >
              <AccordionTrigger className="py-5 text-left text-sm font-semibold text-[#1e1b4b] hover:no-underline">
                {question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-gray-600">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
