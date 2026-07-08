// src/components/InsightsBrowser.tsx
'use client';

import { useMemo, useState } from 'react';
import { cn } from '@lib/utils/cn';
import type { Post, PostCategory } from '@lib/posts';

type Filter = 'All' | PostCategory;

interface InsightsBrowserProps {
  posts: Post[];
}

export const InsightsBrowser = ({ posts }: InsightsBrowserProps) => {
  const [filter, setFilter] = useState<Filter>('All');

  const filtered = useMemo(
    () => (filter === 'All' ? posts : posts.filter((p) => p.category === filter)),
    [filter, posts]
  );

  const postCategories: PostCategory[] = ['Technical', 'Field Report', 'Safety', 'Supply Chain'];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(['All', ...postCategories] as Filter[]).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={cn(
              'border px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors',
              filter === c
                ? 'border-[#C6FF00] bg-[#C6FF00] text-[#0F1115]'
                : 'border-[#1e293b] text-gray-400 hover:border-[#C6FF00] hover:text-white'
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <a
            key={post.slug}
            href={`/insights/${post.slug}`}
            className="group flex flex-col overflow-hidden border border-[#1e293b] bg-[#1a1d23] transition-colors hover:border-[#C6FF00]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={post.image || '/placeholder.svg'}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 bg-[#0F1115]/90 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-[#C6FF00] backdrop-blur">
                {post.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wide text-gray-400">
                <span>{post.date}</span>
                <span className="h-1 w-1 rounded-full bg-[#1e293b]" />
                <span>{post.readTime}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-snug text-balance text-white transition-colors group-hover:text-[#C6FF00]">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-400">
                {post.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[#C6FF00]">
                Read article
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default InsightsBrowser;