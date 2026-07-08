// src/modules/layout/components/Nav.tsx

'use client'; // 确保 React 组件在客户端运行

import {
  $cartItemCount,
  $regionId,
  initCart,
  toggleCartSidebar,
} from "@lib/stores/cart";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { cn } from "@lib/utils/cn"; // 导入 cn 函数

interface NavProps {
  countryCode: string;
  regionId: string | null;
}

export const Nav = ({ countryCode, regionId }: NavProps) => {
  const cartItemCount = useStore($cartItemCount);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (regionId) {
      $regionId.set(regionId);
      initCart();
    }
    // 获取当前路径（仅在客户端）
    setCurrentPath(window.location.pathname);
  }, [regionId]);

  const handleCartClick = () => {
    toggleCartSidebar();
  };

  // 导航菜单配置
  const navItems = [
    { href: `/products`, label: 'Products' },
    { href: `/service`, label: 'Service' },
    { href: `/insights`, label: 'Insights' },
    { href: `/about`, label: 'About' },
    { href: `/contact`, label: 'Contact' },
  ];

  // 判断链接是否激活
  const isActive = (href: string) => {
    // 去除 countryCode 前缀后再比较
    const pathWithoutCountry = currentPath.replace(`/${countryCode}`, '') || '/';
    return pathWithoutCountry === href || (href !== '/' && pathWithoutCountry.startsWith(href));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/85 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Logo 区域 */}
        <a
          href={`/${countryCode}`}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </span>
          <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            VOLT<span className="text-blue-600">FIELD</span>
          </span>
        </a>

        {/* 桌面端导航 */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <a
                key={item.href}
                href={`/${countryCode}${item.href}`}
                className={cn(
                  "text-sm font-medium uppercase tracking-wide transition-colors",
                  active
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* 桌面端 CTA 按钮 */}
        <div className="hidden md:block">
          <a
            href={`/${countryCode}/contact`}
            className="inline-block bg-blue-600 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Request a Quote
          </a>
        </div>

        {/* 右侧操作区 */}
        <div className="flex items-center gap-4">
          {/* 购物车按钮 */}
          <button
            onClick={handleCartClick}
            className={cn(
              "relative text-sm font-medium transition-colors",
              cartItemCount > 0
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
            )}
            aria-label={`Shopping cart with ${cartItemCount} item${cartItemCount !== 1 ? 's' : ''}`}
          >
            Cart ({cartItemCount})
          </button>

          {/* 移动端菜单按钮 */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-gray-700 md:hidden dark:text-gray-300"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 移动端菜单（展开时） */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <a
                  key={item.href}
                  href={`/${countryCode}${item.href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "border-b border-gray-100 py-3 text-sm font-medium uppercase tracking-wide dark:border-gray-800",
                    active
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                  )}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href={`/${countryCode}/contact`}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 mb-2 bg-blue-600 px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-white hover:bg-blue-700"
            >
              Request a Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};