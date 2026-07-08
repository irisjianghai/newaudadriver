'use client';

import React, { useState, useMemo } from 'react';

const STEPS = [48, 120, 400, 800, 1000, 1500];

const mockProducts = [
  { slug: "oscilloscope-100mhz", name: "Digital Oscilloscope 100MHz", maxVoltage: 800, image: "/images/product-oscilloscope.png" },
  { slug: "battery-analyzer", name: "EV Battery Capacity Analyzer", maxVoltage: 1000, image: "/images/product-battery-analyzer.png" },
  { slug: "insulated-wrench-set", name: "1500V Insulated Wrench Set", maxVoltage: 1500, image: "/images/product-insulated-wrench.png" },
  { slug: "field-light-12v", name: "12V LED Field Light", maxVoltage: 48, image: "/images/product-field-light.png" },
  { slug: "power-supply-1500v", name: "1500V DC Power Supply", maxVoltage: 1500, image: "/images/product-power-supply.png" },
  { slug: "inverter-2000w", name: "2000W Pure Sine Inverter", maxVoltage: 120, image: "/images/product-inverter.png" },
];

interface SpecFilterProps {
  countryCode?: string;
}

export const SpecFilter = ({ countryCode = "us" }: SpecFilterProps) => {
  const [index, setIndex] = useState(4);
  const voltage = STEPS[index];

  const matches = useMemo(
    () => mockProducts.filter((p) => p.maxVoltage >= voltage).slice(0, 4),
    [voltage]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-20">
      <div className="border border-[#1e293b] bg-[#1a1d23] p-6 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr]">
          {/* 左侧 */}
          <div className="flex flex-col">
            <p className="font-mono text-xs uppercase tracking-widest text-[#C6FF00]">
              Spec-Filter
            </p>
            <h3 className="mt-3 text-2xl font-bold text-balance text-white">
              Match gear to your working voltage
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Drag the slider to your system voltage. We instantly surface
              instruments and safety tools rated for the job.
            </p>

            <div className="mt-8">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-wide text-gray-400">
                  Working Voltage
                </span>
                <span className="font-mono text-3xl font-bold text-[#C6FF00]">
                  {voltage} V
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={STEPS.length - 1}
                step={1}
                value={index}
                onChange={(e) => setIndex(Number(e.target.value))}
                aria-label="Select working voltage"
                className="mt-4 w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #C6FF00 0%, #C6FF00 ${(index / (STEPS.length - 1)) * 100}%, #374151 ${(index / (STEPS.length - 1)) * 100}%, #374151 100%)`
                }}
              />
              <div className="mt-2 flex justify-between font-mono text-[10px] text-gray-500">
                {STEPS.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>

            <p className="mt-8 font-mono text-xs text-gray-400">
              {matches.length} rated {matches.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          {/* 右侧：产品列表 */}
          <div className="grid grid-cols-2 gap-4">
            {matches.length > 0 ? (
              matches.map((p) => (
                <a
                  key={p.slug}
                  href={`/${countryCode}/products/${p.slug}`}
                  className="group flex flex-col gap-2 border border-[#1e293b] bg-[#0F1115] p-4 transition-colors hover:border-[#C6FF00]"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-[#1a1d23]">
                    <img
                      src={p.image || '/placeholder.svg'}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase text-[#C6FF00]">
                      {p.maxVoltage} V rated
                    </p>
                    <p className="truncate text-sm font-semibold text-white group-hover:text-[#C6FF00]">
                      {p.name}
                    </p>
                  </div>
                </a>
              ))
            ) : (
              <p className="col-span-2 py-10 text-center text-sm text-gray-400">
                No products rated that high yet — contact us for a custom sourcing request.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecFilter;