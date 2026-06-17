"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, FlaskConical, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const navKeys = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "learn", href: "/learn" },
  { key: "resources", href: "/resources" },
  { key: "kids", href: "/kids" },
  { key: "blog", href: "/blog" },
  { key: "services", href: "/services" },
  { key: "shop", href: "/shop" },
  { key: "contact", href: "/contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const isRTL = locale === "ar";

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    // Replace the locale segment in the path
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");
    router.push(`/${nextLocale}${pathWithoutLocale || "/"}`);
  };

  const localePath = (href: string) =>
    `/${locale}${href === "/" ? "" : href}`;

  const isActive = (href: string) => {
    const lp = localePath(href);
    if (href === "/") return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(lp);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-navy-100"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            href={localePath("/")}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-navy-800 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300">
              <FlaskConical className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className={cn(
                  "text-base font-bold text-navy-900 transition-colors",
                  "group-hover:text-teal-600"
                )}
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Sara Mohamed
              </span>
              <span className="text-[10px] font-medium text-teal-600 tracking-wide uppercase">
                Chemistry Educator
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navKeys.slice(0, 7).map(({ key, href }) => (
              <Link
                key={key}
                href={localePath(href)}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive(href)
                    ? "text-teal-600 bg-teal-50"
                    : "text-navy-700 hover:text-navy-900 hover:bg-navy-50"
                )}
              >
                {t(key as keyof ReturnType<typeof t>)}
                {isActive(href) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-teal-500" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA + Lang Switch */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={switchLocale}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-navy-600 hover:text-teal-600 transition-colors rounded-lg hover:bg-teal-50"
              aria-label="Switch language"
            >
              <Globe className="w-4 h-4" />
              <span>{t("switchLang")}</span>
            </button>
            <Link
              href={localePath("/contact")}
              className="px-4 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-sm hover:shadow-glow transition-all duration-200"
            >
              {t("bookSession")}
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={switchLocale}
              className="p-2 rounded-lg text-navy-600 hover:bg-navy-50"
              aria-label="Switch language"
            >
              <Globe className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl text-navy-700 hover:bg-navy-100 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-navy-100 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navKeys.map(({ key, href }) => (
              <Link
                key={key}
                href={localePath(href)}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "px-4 py-2.5 text-sm font-medium rounded-xl transition-colors",
                  isActive(href)
                    ? "text-teal-600 bg-teal-50 font-semibold"
                    : "text-navy-700 hover:bg-navy-50"
                )}
              >
                {t(key as keyof ReturnType<typeof t>)}
              </Link>
            ))}
            <div className="pt-2 border-t border-navy-100 mt-2">
              <Link
                href={localePath("/contact")}
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-teal-500 to-teal-600"
              >
                {t("bookSession")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
