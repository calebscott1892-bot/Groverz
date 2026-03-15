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
      'If you lodge your own return, the deadline is 31 October. If you use a registered tax agent like us, you may be eligible for an extended deadline. Get in touch and we can advise you.',
  },
  {
    question: 'What do I need to bring to my appointment?',
    answer:
      "Your tax file number, photo ID, bank details for your refund, PAYG summary or income statements, and any receipts for deductions you'd like to claim. We'll let you know if we need anything else.",
  },
  {
    question: 'Do you offer remote or online appointments?',
    answer:
      'Yes. We can work with you over the phone, by email, or via video call - whatever suits you best.',
  },
  {
    question: 'How much does a tax return cost?',
    answer:
      "Our fees are transparent and fixed. The cost depends on the complexity of your return. We'll provide a clear quote before we begin - no surprises.",
  },
  {
    question: 'Can you help with overdue or late tax returns?',
    answer:
      'Absolutely. We regularly help clients catch up on prior-year returns. The sooner you get in touch, the sooner we can help sort things out.',
  },
];

export default function FaqSection({ items = defaultItems, title = 'Frequently asked questions' }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-[#1e1b4b] sm:text-3xl">
          {title}
        </h2>

        <Accordion type="single" collapsible className="space-y-2">
          {items.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`faq-${index}`}
              className="rounded-lg border border-gray-100 px-5"
            >
              <AccordionTrigger className="py-4 text-left text-sm font-semibold text-[#1e1b4b] hover:no-underline">
                {question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-gray-600">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
