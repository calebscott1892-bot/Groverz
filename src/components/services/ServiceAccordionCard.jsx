import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, ChevronDown } from 'lucide-react';

export default function ServiceAccordionCard({ item, expanded, onToggle }) {
  const Icon = item.icon;

  return (
    <div
      className={`rounded-xl border bg-white transition-all duration-300 ${
        expanded
          ? 'border-[#b91c1c]/30 shadow-lg'
          : 'border-gray-100 hover:border-[#b91c1c]/20 hover:shadow-md'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-start gap-4 p-6 text-left"
      >
        <div
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg transition-colors ${
            expanded ? 'bg-[#b91c1c] text-white' : 'bg-[#b91c1c]/10 text-[#b91c1c]'
          }`}
        >
          <Icon className="h-6 w-6" />
        </div>

        <div className="min-w-0 flex-1">
          {item.categoryLabel && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#b91c1c]">
              {item.categoryLabel}
            </p>
          )}
          <h3 className="text-lg font-semibold text-[#1e1b4b]">{item.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.description}</p>
        </div>

        <ChevronDown
          className={`mt-1 h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${
            expanded ? 'rotate-180 text-[#b91c1c]' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">
              <div className="border-t border-gray-100 pt-5">
                {item.details && (
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">{item.details}</p>
                )}

                {item.includedItems?.length > 0 && (
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#1e1b4b]">
                      What&apos;s included
                    </p>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {item.includedItems.map((includedItem) => (
                        <li key={includedItem} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#b91c1c]" />
                          <span className="text-sm text-gray-600">{includedItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
