// src/components/ContactForm.tsx
'use client';

import { useState } from 'react';
import { cn } from '@lib/utils/cn';

const inquiryTypes = [
  'B2B Bulk Quote',
  'Technical / Spec Advice',
  'Distribution Partnership',
  'After-Sales & Warranty',
];

const fieldClass =
  'w-full border border-[#1e293b] bg-[#0F1115] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus:border-[#C6FF00]';

export const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [inquiry, setInquiry] = useState(inquiryTypes[0]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    // 模拟提交，后续可以接入真实后端
    setTimeout(() => setStatus('sent'), 900);
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center border border-[#C6FF00] bg-[#1a1d23] p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C6FF00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-12 w-12">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <h3 className="mt-5 text-xl font-bold text-white">Request received</h3>
        <p className="mt-2 max-w-sm text-pretty leading-relaxed text-gray-400">
          A VoltField technical advisor will review your specs and reply within
          6 business hours. Check your inbox for a confirmation.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 border border-[#1e293b] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-gray-400 transition-colors hover:border-[#C6FF00] hover:text-[#C6FF00]"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[#1e293b] bg-[#1a1d23] p-6 sm:p-8"
    >
      <fieldset className="flex flex-col gap-5" disabled={status === 'sending'}>
        <div>
          <label className="mb-3 block font-mono text-[11px] uppercase tracking-wide text-gray-400">
            Inquiry type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {inquiryTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setInquiry(t)}
                className={cn(
                  'border px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wide transition-colors',
                  inquiry === t
                    ? 'border-[#C6FF00] bg-[#C6FF00] text-[#0F1115]'
                    : 'border-[#1e293b] text-gray-400 hover:border-[#C6FF00] hover:text-white'
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="sr-only">
              Full name
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="Full name *"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="company" className="sr-only">
              Company
            </label>
            <input
              id="company"
              name="company"
              required
              placeholder="Company *"
              className={fieldClass}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="sr-only">
              Work email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Work email *"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="country" className="sr-only">
              Country
            </label>
            <input
              id="country"
              name="country"
              placeholder="Country / region"
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us what you need — model numbers, quantities, target specs, timelines… *"
            className={cn(fieldClass, 'resize-y')}
          />
        </div>

        <button
          type="submit"
          className="group inline-flex items-center justify-center gap-2 bg-[#C6FF00] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-[#0F1115] transition-transform hover:-translate-y-0.5 disabled:opacity-70"
        >
          {status === 'sending' ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4 animate-spin">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              Sending…
            </>
          ) : (
            <>
              Submit request
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </>
          )}
        </button>
        <p className="text-xs leading-relaxed text-gray-500">
          By submitting you agree to be contacted about your inquiry. We never
          share your details with third parties.
        </p>
      </fieldset>
    </form>
  );
};

export default ContactForm;