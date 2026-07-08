// src/components/ProductTabs.tsx
'use client';

import { useState } from 'react';
import { cn } from '@lib/utils/cn';

const TABS = ['Specifications', 'Safety & Compliance', 'Applications'] as const;
type Tab = (typeof TABS)[number];

interface Product {
  slug: string;
  name: string;
  brand?: string;
  image?: string;
  priceUSD?: number;
  badges?: string[];
  category?: string;
  audience?: string[];
  keySpecs?: Array<{ label: string; value: string }>;
  specs?: Array<{ label: string; value: string }>;
  summary?: string;
}

interface ProductTabsProps {
  product: Product;
}

export const ProductTabs = ({ product }: ProductTabsProps) => {
  const [tab, setTab] = useState<Tab>('Specifications');

  // 如果没有 specs 数据，使用 keySpecs 作为替代
  const specs = product.specs || product.keySpecs || [];

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-[#1e293b]">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              '-mb-px border-b-2 px-4 py-3 text-sm font-bold uppercase tracking-wide transition-colors',
              tab === t
                ? 'border-b-[#C6FF00] text-[#C6FF00]'
                : 'border-b-transparent text-gray-400 hover:text-white'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="pt-8">
        {tab === 'Specifications' && (
          <dl className="grid gap-px overflow-hidden border border-[#1e293b] bg-[#1e293b] sm:grid-cols-2">
            {specs.map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between gap-4 bg-[#1a1d23] px-5 py-4"
              >
                <dt className="text-sm text-gray-400">{s.label}</dt>
                <dd className="font-mono text-sm font-semibold text-[#C6FF00]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {tab === 'Safety & Compliance' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              {(product.badges || []).map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-2 border border-[#FF5200] px-4 py-2 font-mono text-xs uppercase tracking-wide text-[#FF5200]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                  {b}
                </span>
              ))}
            </div>
            <p className="max-w-2xl leading-relaxed text-gray-400">
              This product is selected for compliance with international safety
              standards. Full certificates (CE / VDE / GS / IEC 60900 as
              applicable) and third-party calibration reports are available on
              request. Insulated products are rated for live high-voltage
              service work.
            </p>
            <button
              type="button"
              className="flex items-center gap-2 border border-[#1e293b] px-5 py-3 text-sm font-bold uppercase tracking-wide text-gray-300 transition-colors hover:border-[#C6FF00] hover:text-[#C6FF00]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Download Certificates (PDF)
            </button>
          </div>
        )}

        {tab === 'Applications' && (
          <div className="max-w-2xl space-y-4 leading-relaxed text-gray-400">
            <p>{product.summary || 'This product is designed for professional EV diagnostics, power-electronics R&D, and field service applications.'}</p>
            <p>
              Typical deployments include EV battery pack diagnostics,
              power-electronics R&amp;D benches, high-voltage field service and
              off-grid expedition power. Our technical team can confirm
              suitability for your specific application and configure a complete
              system around this unit.
            </p>
            <p className="font-mono text-xs text-[#C6FF00]">
              Need a wiring diagram or integration guide? Ask a technical
              advisor via the quote form.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;