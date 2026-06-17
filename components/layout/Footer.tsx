"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { FlaskConical, Mail, Instagram, Youtube, Twitter, MessageCircle } from "lucide-react";

const navGroups = {
  quickLinks: [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "learn", href: "/learn" },
    { key: "blog", href: "/blog" },
    { key: "services", href: "/services" },
    { key: "contact", href: "/contact" },
  ],
  resources: [
    { labelEn: "IGCSE Notes", labelAr: "ملاحظات IGCSE", href: "/resources" },
    { labelEn: "Worksheets", labelAr: "أوراق عمل", href: "/resources?type=worksheets" },
    { labelEn: "Shop", labelAr: "المتجر", href: "/shop" },
    { labelEn: "Kids Science", labelAr: "علوم الأطفال", href: "/kids" },
    { labelEn: "Free Resources", labelAr: "موارد مجانية", href: "/resources?type=free" },
  ],
};

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const localePath = (href: string) =>
    `/${locale}${href === "/" ? "" : href}`;

  return (
    <footer className="bg-navy-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href={localePath("/")} className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="text-lg font-bold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Sara Mohamed
              </span>
            </Link>
            <p className="text-navy-300 text-sm leading-relaxed mb-5">
              {t("tagline")}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: MessageCircle, href: "https://wa.me/1234567890", label: "WhatsApp" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-navy-800 hover:bg-teal-600 flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {navGroups.quickLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={localePath(href)}
                    className="text-navy-300 hover:text-teal-400 text-sm transition-colors duration-150"
                  >
                    {tNav(key as "home" | "about" | "learn" | "blog" | "services" | "contact")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("resources")}
            </h3>
            <ul className="space-y-2.5">
              {navGroups.resources.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localePath(item.href)}
                    className="text-navy-300 hover:text-teal-400 text-sm transition-colors duration-150"
                  >
                    {isRTL ? item.labelAr : item.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("newsletter")}
            </h3>
            <p className="text-navy-300 text-sm mb-4">{t("newsletterDesc")}</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={isRTL ? "بريدك الإلكتروني" : "Your email"}
                className="flex-1 px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-sm text-white placeholder-navy-400 focus:outline-none focus:border-teal-500 transition-colors"
              />
              <button className="px-3 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap">
                {t("subscribe")}
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-500 flex-shrink-0" />
              <a
                href="mailto:sara@sarachemistry.com"
                className="text-navy-300 hover:text-teal-400 text-sm transition-colors"
              >
                sara@sarachemistry.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-navy-400 text-xs">
            © {new Date().getFullYear()} Sara Mohamed. {t("rights")}
          </p>
          <div className="flex items-center gap-4">
            <Link href={localePath("/")} className="text-navy-400 hover:text-teal-400 text-xs transition-colors">
              {t("privacy")}
            </Link>
            <Link href={localePath("/")} className="text-navy-400 hover:text-teal-400 text-xs transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
