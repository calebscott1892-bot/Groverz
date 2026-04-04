import React, { useState } from 'react';
import { CheckCircle, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';

import PageHeroSection from '@/components/sections/PageHeroSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { businessDetails } from '@/config/site';

const contactCards = [
  {
    icon: MapPin,
    title: 'Visit us',
    content: businessDetails.address.lineOne,
    secondary: businessDetails.address.lineTwo,
    href: businessDetails.address.mapHref,
    external: true,
  },
  {
    icon: Phone,
    title: 'Call Ankit',
    content: businessDetails.phones.primary.display,
    secondaryHref: businessDetails.phones.secondary.href,
    secondary: businessDetails.phones.secondary.display,
    href: businessDetails.phones.primary.href,
  },
  {
    icon: Mail,
    title: 'Email us',
    content: businessDetails.email,
    href: businessDetails.emailHref,
  },
  {
    icon: Clock,
    title: 'Office hours',
    content: businessDetails.hours.weekdays,
    secondary: businessDetails.hours.saturday,
  },
];

const serviceOptions = [
  { value: 'personal_tax', label: 'Personal Tax Return' },
  { value: 'business_accounting', label: 'Business Accounting' },
  { value: 'tax_planning', label: 'Tax Planning' },
  { value: 'bas_gst', label: 'BAS / GST Lodgement' },
  { value: 'smsf', label: 'Self Managed Super Fund' },
  { value: 'trust_company', label: 'Trust or Company Tax' },
  { value: 'mortgage', label: 'Mortgage Broking' },
  { value: 'other', label: 'Something Else / Not Sure' },
];

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  botField: '',
};

export default function ContactPage() {
  const [formState, setFormState] = useState(initialFormState);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');

  const selectedServiceLabel =
    serviceOptions.find(({ value }) => value === formState.service)?.label ?? 'General Enquiry';

  function handleFieldChange(fieldName, fieldValue) {
    setFormState((currentState) => ({
      ...currentState,
      [fieldName]: fieldValue,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitStatus === 'submitting') {
      return;
    }

    setSubmitStatus('submitting');
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          service: selectedServiceLabel,
          message: formState.message,
          botField: formState.botField,
        }),
      });

      let responseBody = null;

      try {
        responseBody = await response.json();
      } catch {
        responseBody = null;
      }

      if (!response.ok) {
        throw new Error(
          responseBody?.error ??
            "Something went wrong sending your enquiry. Try again, or just call or email us directly — we're happy to hear from you either way."
        );
      }

      setSubmitStatus('success');
      setFormState(initialFormState);
    } catch (error) {
      setSubmitStatus('error');
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong sending your enquiry. Try again, or just call or email us directly — we're happy to hear from you either way."
      );
    }
  }

  function handleReset() {
    setSubmitStatus('idle');
    setSubmitError('');
    setFormState(initialFormState);
  }

  return (
    <div>
      <PageHeroSection
        title="Let's talk about your situation"
        subtitle="No sales pitch, no obligation. Just a practical conversation about what you need and how we can help."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
              Get in touch
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-[#1e1b4b] sm:text-3xl">
              Pick whichever way suits you best
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-500">
              Fill in the form, send an email, or just call. Most enquiries get a response within a
              few hours during business hours.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map(
              ({ icon: Icon, title, content, secondary, href, secondaryHref, external }) => (
                <div
                  key={title}
                  className="flex h-full flex-col rounded-2xl border border-[#1e1b4b]/10 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.04)]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#b91c1c]/10">
                    <Icon className="h-5 w-5 text-[#b91c1c]" />
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1e1b4b]/50">
                    {title}
                  </p>

                  {href ? (
                    <a
                      href={href}
                      className="mt-3 block text-sm font-medium leading-relaxed text-[#1e1b4b] transition-colors hover:text-[#b91c1c]"
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                    >
                      {content}
                    </a>
                  ) : (
                    <p className="mt-3 text-sm font-medium leading-relaxed text-[#1e1b4b]">
                      {content}
                    </p>
                  )}

                  {secondary &&
                    (secondaryHref ? (
                      <a
                        href={secondaryHref}
                        className="mt-1.5 block text-sm leading-relaxed text-gray-500 transition-colors hover:text-[#b91c1c]"
                      >
                        {secondary}
                      </a>
                    ) : (
                      <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{secondary}</p>
                    ))}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="section-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-[#1e1b4b]/10 bg-white p-6 shadow-sm sm:p-8">
                <div className="border-b border-[#1e1b4b]/10 pb-6">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
                    Online enquiry
                  </p>
                  <h2 className="text-2xl font-bold text-[#1e1b4b]">
                    Tell us what&apos;s going on
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500">
                    Keep it brief — even just a sentence is enough for us to understand what you
                    need and get back to you with next steps.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-[#1e1b4b]/10 bg-[#f8f5ef] px-3 py-1 text-xs font-medium text-[#1e1b4b]">
                      {businessDetails.registrationLabel}
                    </span>
                    <span className="rounded-full border border-[#1e1b4b]/10 bg-white px-3 py-1 text-xs font-medium text-gray-500">
                      * = required
                    </span>
                  </div>
                </div>

                {submitStatus === 'success' ? (
                  <div className="py-10 text-center" role="status" aria-live="polite">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-7 w-7 text-green-600" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-[#1e1b4b]">
                      Got it — we&apos;ll be in touch soon
                    </h3>
                    <p className="text-sm text-gray-500">
                      We typically respond within a few hours during business hours. If it&apos;s
                      urgent, feel free to call directly.
                    </p>
                    <Button
                      type="button"
                      className="mt-5 h-auto bg-[#1e1b4b] px-6 py-2.5 hover:bg-[#312e81]"
                      onClick={handleReset}
                    >
                      Send Another Enquiry
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="pt-6">
                    <fieldset disabled={submitStatus === 'submitting'} className="space-y-5">
                      <div className="hidden">
                        <Label htmlFor="bot-field">Leave this field blank</Label>
                        <Input
                          id="bot-field"
                          name="bot-field"
                          autoComplete="off"
                          tabIndex={-1}
                          value={formState.botField}
                          onChange={(event) => handleFieldChange('botField', event.target.value)}
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <Label htmlFor="name" className="text-sm">
                            Your name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            required
                            autoComplete="name"
                            placeholder="First and last name"
                            value={formState.name}
                            onChange={(event) => handleFieldChange('name', event.target.value)}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="email" className="text-sm">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={formState.email}
                            onChange={(event) => handleFieldChange('email', event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <Label htmlFor="phone" className="text-sm">
                            Phone (optional)
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            inputMode="tel"
                            pattern="[\d\s\+\-\(\)]{6,20}"
                            placeholder="04XX XXX XXX"
                            value={formState.phone}
                            onChange={(event) => handleFieldChange('phone', event.target.value)}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="service" className="text-sm">
                            What do you need help with?
                          </Label>
                          <Select
                            value={formState.service}
                            onValueChange={(value) => handleFieldChange('service', value)}
                          >
                            <SelectTrigger id="service">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              {serviceOptions.map(({ value, label }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="message" className="text-sm">
                          Anything else we should know? *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          placeholder="Even a sentence or two is fine — e.g. 'I need my 2025 tax return done' or 'I'm a sole trader and need BAS help'"
                          className="min-h-[110px] resize-none"
                          value={formState.message}
                          onChange={(event) => handleFieldChange('message', event.target.value)}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={submitStatus === 'submitting'}
                        className="h-auto w-full gap-2 bg-[#b91c1c] px-7 py-2.5 font-semibold text-white hover:bg-[#991b1b] sm:w-auto"
                      >
                        <Send className="h-4 w-4" />
                        {submitStatus === 'submitting' ? 'Sending...' : 'Send Enquiry'}
                      </Button>

                      {submitError && (
                        <div
                          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                          role="alert"
                        >
                          {submitError}
                        </div>
                      )}

                      <p className="text-xs leading-relaxed text-gray-500">
                        Prefer a conversation first? Call{' '}
                        <a
                          href={businessDetails.phones.primary.href}
                          className="font-medium text-[#b91c1c]"
                        >
                          {businessDetails.phones.primary.display}
                        </a>{' '}
                        during business hours.
                      </p>
                    </fieldset>
                  </form>
                )}
              </div>
            </div>

            <div className="space-y-5 lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
              <div className="overflow-hidden rounded-2xl border border-[#1e1b4b]/10 bg-white shadow-sm">
                <iframe
                  title="Groverz Tax Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1692.9!2d115.9570842!3d-32.0067333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32be9aecbb0d71%3A0x5b8f5ead2673ef15!2s108%20Gerard%20St%2C%20East%20Cannington%20WA%206107!5e0!3m2!1sen!2sau!4v1"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin"
                  className="w-full"
                />
                <div className="flex items-start gap-3 px-5 py-4">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#b91c1c]" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1e1b4b]/50">
                      Office
                    </p>
                    <p className="mt-2 text-sm font-medium text-[#1e1b4b]">
                      {businessDetails.address.lineOne}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {businessDetails.address.lineTwo}
                    </p>
                    <a
                      href={businessDetails.address.mapHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-xs font-medium text-[#b91c1c] transition-colors hover:text-[#991b1b]"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#1e1b4b] p-6 shadow-[0_20px_50px_rgba(30,27,75,0.22)]">
                <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/85">
                  {businessDetails.registrationLabel}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  Rather just pick up the phone?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Ankit answers directly during business hours. No receptionist, no hold music, no
                  &quot;someone will call you back.&quot;
                </p>
                <div className="mt-5 space-y-3">
                  <a
                    href={businessDetails.phones.primary.href}
                    className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-white transition-colors hover:bg-white/15"
                  >
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      {businessDetails.phones.primary.display}
                    </span>
                  </a>
                  <a
                    href={businessDetails.phones.secondary.href}
                    className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-white transition-colors hover:bg-white/15"
                  >
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      {businessDetails.phones.secondary.display}
                    </span>
                  </a>
                  <a
                    href={businessDetails.emailHref}
                    className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-white transition-colors hover:bg-white/15"
                  >
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{businessDetails.email}</span>
                  </a>
                </div>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
                    Hours
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    {businessDetails.hours.weekdays}
                    <br />
                    {businessDetails.hours.saturday}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <p className="text-sm font-semibold text-amber-900">Tax deadline coming up?</p>
                <p className="mt-1.5 text-sm leading-relaxed text-amber-800">
                  If your return is overdue or a deadline is close, mention it in your enquiry and
                  we&apos;ll prioritise getting back to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-navy py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            However you reach out, the first step is easy
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-white/60">
            No commitment, no pressure. Just a straightforward conversation about what you need and
            whether we&apos;re the right fit.
          </p>
        </div>
      </section>
    </div>
  );
}
