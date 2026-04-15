import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getPagePath } from '@/config/routes';

// ATO resident tax rates for 2025-26 (Stage 3 rates, unchanged from 2024-25).
// Review before 1 July 2026 in case Parliament legislates new thresholds.
const taxBrackets = [
  { min: 0, max: 18200, rate: 0, base: 0 },
  { min: 18201, max: 45000, rate: 0.16, base: 0 },
  { min: 45001, max: 135000, rate: 0.3, base: 4288 },
  { min: 135001, max: 190000, rate: 0.37, base: 31288 },
  { min: 190001, max: Infinity, rate: 0.45, base: 51638 },
];

function calculateTax(taxableIncome) {
  for (const bracket of taxBrackets) {
    if (taxableIncome <= bracket.max) {
      return bracket.base + (taxableIncome - bracket.min + 1) * bracket.rate;
    }
  }

  return 0;
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function TaxRefundEstimatorSection() {
  const [formState, setFormState] = useState({
    income: '',
    taxWithheld: '',
    deductions: '',
  });
  const [estimate, setEstimate] = useState(null);

  function handleFieldChange(fieldName, fieldValue) {
    setFormState((currentState) => ({
      ...currentState,
      [fieldName]: fieldValue,
    }));
    setEstimate(null);
  }

  function handleEstimateSubmit(event) {
    event.preventDefault();

    const grossIncome = parseFloat(formState.income) || 0;
    const withheldTax = parseFloat(formState.taxWithheld) || 0;
    const totalDeductions = parseFloat(formState.deductions) || 0;
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);
    const taxOwed = calculateTax(taxableIncome);
    const refund = withheldTax - taxOwed;

    setEstimate({ taxableIncome, taxOwed, refund });
  }

  function handleReset() {
    setFormState({
      income: '',
      taxWithheld: '',
      deductions: '',
    });
    setEstimate(null);
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="rounded-xl bg-gradient-to-br from-[#1e1b4b] to-[#312e81] p-6 sm:p-10 lg:p-12">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-wider text-white/60">
                  Free tool
                </p>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Tax Refund Estimator
              </h2>
              <p className="mt-4 leading-relaxed text-white/70">
                Get a quick, non-binding estimate of your potential tax refund based on the 2025-26
                Australian resident tax rates. Enter your details and see your result instantly.
              </p>

              {estimate && (
                <div className="mt-8 space-y-3">
                  <div className="rounded-lg bg-white/10 p-4">
                    <p className="mb-1 text-xs uppercase tracking-wider text-white/60">
                      Taxable Income
                    </p>
                    <p className="text-xl font-bold text-white">
                      {formatCurrency(estimate.taxableIncome)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4">
                    <p className="mb-1 text-xs uppercase tracking-wider text-white/60">
                      Estimated Tax Owed
                    </p>
                    <p className="text-xl font-bold text-white">
                      {formatCurrency(estimate.taxOwed)}
                    </p>
                  </div>
                  <div
                    className={`rounded-lg p-4 ${
                      estimate.refund >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}
                  >
                    <p className="mb-1 text-xs uppercase tracking-wider text-white/60">
                      {estimate.refund >= 0 ? 'Estimated Refund' : 'Estimated Amount Owing'}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency(Math.abs(estimate.refund))}
                    </p>
                  </div>
                  <Link to={getPagePath('Contact')} className="mt-3 inline-block">
                    <Button className="h-auto bg-[#b91c1c] px-7 py-2.5 font-semibold text-white hover:bg-[#991b1b]">
                      Talk to Us
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <div className="order-1 rounded-xl bg-white p-6 sm:p-8 lg:order-2">
              <form onSubmit={handleEstimateSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="est-income" className="text-sm text-[#1e1b4b]">
                    Gross Annual Income ($)
                  </Label>
                  <Input
                    id="est-income"
                    type="number"
                    min="0"
                    required
                    inputMode="numeric"
                    placeholder="e.g. 75000"
                    value={formState.income}
                    onChange={(event) => handleFieldChange('income', event.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="est-withheld" className="text-sm text-[#1e1b4b]">
                    Tax Already Withheld ($)
                  </Label>
                  <Input
                    id="est-withheld"
                    type="number"
                    min="0"
                    required
                    inputMode="numeric"
                    placeholder="e.g. 16000"
                    value={formState.taxWithheld}
                    onChange={(event) => handleFieldChange('taxWithheld', event.target.value)}
                  />
                  <p className="text-xs text-gray-400">From your PAYG summary or payslips</p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="est-deductions" className="text-sm text-[#1e1b4b]">
                    Total Deductions ($)
                  </Label>
                  <Input
                    id="est-deductions"
                    type="number"
                    min="0"
                    inputMode="numeric"
                    placeholder="e.g. 3000"
                    value={formState.deductions}
                    onChange={(event) => handleFieldChange('deductions', event.target.value)}
                  />
                  <p className="text-xs text-gray-400">
                    Work expenses, donations, self-education, etc.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="submit"
                    className="h-auto flex-1 gap-2 bg-[#b91c1c] px-6 py-2.5 font-semibold text-white hover:bg-[#991b1b]"
                  >
                    <Calculator className="h-4 w-4" />
                    Estimate My Refund
                  </Button>

                  {estimate && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                      className="h-auto px-4 py-2.5"
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </form>

              <div className="mt-5 flex items-start gap-2 border-t border-gray-100 pt-4">
                <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                <p className="text-xs leading-relaxed text-gray-400">
                  This is a simplified estimate only, based on 2024-25 Australian resident tax
                  rates. It does not include Medicare levy, HELP repayments, offsets or other
                  factors. For an accurate assessment, get in touch and we can review your situation
                  in more detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
