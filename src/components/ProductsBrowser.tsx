// src/components/ProductsBrowser.tsx
'use client';

import { useMemo, useState } from 'react';
import { cn } from '@lib/utils/cn';

// ===== 类型定义 =====
type AudienceFilter = 'All' | 'Technician' | 'Explorer';
type CategorySlug = 'ev-diagnostics' | 'power-supply' | 'insulated-tools' | 'field-lighting';
type CategoryFilter = 'all' | CategorySlug;

interface Product {
  slug: string;
  name: string;
  brand?: string;
  image?: string;
  priceUSD?: number;
  badges?: string[];
  category?: CategorySlug;
  audience?: AudienceFilter[];
  keySpecs?: Array<{ label: string; value: string }>;
}

interface ProductsBrowserProps {
  products: Product[];
  categories: { slug: CategorySlug; name: string }[];
  initialCategory?: CategoryFilter;
  initialAudience?: AudienceFilter;
}

// ===== 格式化价格 =====
const formatPrice = (amount?: number) => {
  if (amount === undefined) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

// ===== 主组件 =====
export const ProductsBrowser = ({
  products,
  categories,
  initialCategory = 'all',
  initialAudience = 'All',
}: ProductsBrowserProps) => {
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [audience, setAudience] = useState<AudienceFilter>(initialAudience);

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const catOk = category === 'all' || p.category === category;
        const audOk = audience === 'All' || (p.audience || []).includes(audience);
        return catOk && audOk;
      }),
    [category, audience, products]
  );

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      {/* ===== 左侧筛选侧边栏 ===== */}
      <aside className="w-full lg:w-[240px] lg:shrink-0 lg:sticky lg:top-24">
        <div className="border border-[#1e293b] bg-[#1a1d23] p-5">
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#C6FF00]">
            Audience
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(['All', 'Technician', 'Explorer'] as AudienceFilter[]).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAudience(a)}
                className={cn(
                  'border px-3 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors',
                  audience === a
                    ? 'border-[#C6FF00] bg-[#C6FF00] text-[#0F1115]'
                    : 'border-[#1e293b] text-gray-400 hover:border-[#C6FF00] hover:text-white'
                )}
              >
                {a}
              </button>
            ))}
          </div>

          <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-[#C6FF00]">
            Category
          </p>
          <div className="mt-3 flex flex-col gap-1">
            <button
              type="button"
              onClick={() => setCategory('all')}
              className={cn(
                'flex items-center justify-between border-l-2 px-3 py-2 text-left text-sm transition-colors',
                category === 'all'
                  ? 'border-l-[#C6FF00] bg-[#0F1115] text-white'
                  : 'border-l-transparent text-gray-400 hover:text-white'
              )}
            >
              All Products
              <span className="font-mono text-xs">{products.length}</span>
            </button>
            {categories.map((c) => {
              const count = products.filter((p) => p.category === c.slug).length;
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setCategory(c.slug)}
                  className={cn(
                    'flex items-center justify-between border-l-2 px-3 py-2 text-left text-sm transition-colors',
                    category === c.slug
                      ? 'border-l-[#C6FF00] bg-[#0F1115] text-white'
                      : 'border-l-transparent text-gray-400 hover:text-white'
                  )}
                >
                  {c.name}
                  <span className="font-mono text-xs">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* ===== 右侧产品网格 ===== */}
      <div className="flex-1 min-w-0">
        <p className="mb-6 font-mono text-xs text-gray-400">
          Showing {filtered.length} of {products.length} products
        </p>
        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <a
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group flex flex-col border border-[#1e293b] bg-[#1a1d23] transition-colors hover:border-[#C6FF00]"
              >
                <div className="relative aspect-square overflow-hidden bg-[#0F1115]">
                  <img
                    src={p.image || '/placeholder.svg'}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  {p.badges && p.badges.length > 0 && (
                    <div className="absolute left-0 top-0 flex flex-wrap gap-1 p-3">
                      {p.badges.slice(0, 2).map((badge) => (
                        <span
                          key={badge}
                          className="bg-[#0F1115]/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-[#C6FF00] backdrop-blur"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  {p.brand && (
                    <p className="font-mono text-[11px] uppercase tracking-wide text-[#C6FF00]">
                      {p.brand}
                    </p>
                  )}
                  <h3 className="mt-2 text-base font-bold leading-snug text-balance text-white">
                    {p.name}
                  </h3>

                  {p.keySpecs && p.keySpecs.length > 0 && (
                    <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-[#1e293b] pt-4">
                      {p.keySpecs.slice(0, 2).map((spec) => (
                        <div key={spec.label}>
                          <dt className="text-[10px] uppercase tracking-wide text-gray-400">
                            {spec.label}
                          </dt>
                          <dd className="font-mono text-sm text-[#C6FF00]">
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <div className="mt-auto flex items-end justify-between pt-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-gray-400">
                        From
                      </p>
                      <p className="text-lg font-bold text-white">
                        {formatPrice(p.priceUSD)}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-gray-400 transition-colors group-hover:text-[#C6FF00]">
                      Details
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-[#1e293b] p-16 text-center">
            <p className="text-gray-400">No products match this filter combination.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsBrowser;