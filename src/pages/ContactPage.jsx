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

const contactFormName = 'contact-enquiry';

const contactCards = [
  {
    icon: MapPin,
    title: 'Visit Us',
    content: businessDetails.address.full,
    href: businessDetails.address.mapHref,
    external: true,
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: businessDetails.phones.primary.display,
    secondaryHref: businessDetails.phones.secondary.href,
    secondary: businessDetails.phones.secondary.display,
    href: businessDetails.phones.primary.href,
  },
  {
    icon: Mail,
    title: 'Email Us',
    content: businessDetails.email,
    href: businessDetails.emailHref,
  },
  {
    icon: Clock,
    title: 'Business Hours',
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
  { value: 'other', label: 'Other / General Enquiry' },
];

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  botField: '',
};

function encodeFormData(formData) {
  return new URLSearchParams(
    Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
  ).toString();
}

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

    if (formState.botField) {
      setSubmitStatus('success');
      return;
    }

    setSubmitStatus('submitting');
    setSubmitError('');

    const formData = new FormData(event.currentTarget);
    formData.set('service', selectedServiceLabel);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodeFormData(formData),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setSubmitStatus('success');
      setFormState(initialFormState);
    } catch (_error) {
      setSubmitStatus('error');
      setSubmitError(
        "We couldn't send your enquiry just now. Please try again, or call or email us directly."
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
        title="Get in touch"
        subtitle="Talk through your tax, accounting or finance needs and we'll point you in the right direction."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
              Contact options
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-[#1e1b4b] sm:text-3xl">
              Reach us in the way that suits you best
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-500">
              Whether you prefer to call, email or visit, we&apos;ve kept the process simple.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map(
              ({ icon: Icon, title, content, secondary, href, secondaryHref, external }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-gray-50 p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#b91c1c]/10">
                    <Icon className="h-5 w-5 text-[#b91c1c]" />
                  </div>
                  <h3 className="mb-1.5 text-sm font-semibold text-[#1e1b4b]">{title}</h3>

                  {href ? (
                    <a
                      href={href}
                      className="block text-sm text-gray-600 transition-colors hover:text-[#b91c1c]"
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                    >
                      {content}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-600">{content}</p>
                  )}

                  {secondary &&
                    (secondaryHref ? (
                      <a
                        href={secondaryHref}
                        className="mt-0.5 block text-sm text-gray-500 transition-colors hover:text-[#b91c1c]"
                      >
                        {secondary}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm text-gray-500">{secondary}</p>
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
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
                  Online enquiry
                </p>
                <h2 className="mb-1 text-2xl font-bold text-[#1e1b4b]">Tell us how we can help</h2>
                <p className="mb-6 text-sm text-gray-500">
                  Send your enquiry through the website and we&apos;ll get back to you within one
                  business day.
                </p>

                {submitStatus === 'success' ? (
                  <div className="py-10 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-7 w-7 text-green-600" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-[#1e1b4b]">Thank you</h3>
                    <p className="text-sm text-gray-500">
                      Your enquiry has been sent successfully. We&apos;ll be in touch as soon as we
                      can.
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
                  <form
                    name={contactFormName}
                    method="POST"
                    action="/"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <input type="hidden" name="form-name" value={contactFormName} />
                    <input type="hidden" name="service" value={selectedServiceLabel} />

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
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="Your full name"
                          value={formState.name}
                          onChange={(event) => handleFieldChange('name', event.target.value)}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-sm">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={formState.email}
                          onChange={(event) => handleFieldChange('email', event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-sm">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="04XX XXX XXX"
                          value={formState.phone}
                          onChange={(event) => handleFieldChange('phone', event.target.value)}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="service" className="text-sm">
                          Service Needed
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
                        Your Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Tell us how we can help..."
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

                    <p className="text-xs text-gray-500">
                      If you&apos;d rather not use the form, you can still call or email us directly
                      using the details on this page.
                    </p>
                  </form>
                )}
              </div>
            </div>

            <div className="space-y-5 lg:col-span-2">
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
                <iframe
                  title="Groverz Tax Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3385.8!2d115.96!3d-32.0!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDAw!5e0!3m2!1sen!2sau!4v1"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
                <div className="flex items-start gap-3 px-5 py-4">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#b91c1c]" />
                  <div>
                    <p className="text-sm font-medium text-[#1e1b4b]">
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

              <div className="rounded-xl bg-[#1e1b4b] p-6">
                <h3 className="mb-2 text-lg font-semibold text-white">Prefer to speak with us?</h3>
                <p className="mb-5 text-sm leading-relaxed text-white/60">
                  Call us for a quick conversation about your tax, accounting or finance needs.
                </p>
                <div className="space-y-3">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-navy py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            No question is too small
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-white/60">
            Whether you&apos;re an individual, sole trader or business owner, we&apos;re here to
            help you move forward with confidence.
          </p>
        </div>
      </section>
    </div>
  );
}
