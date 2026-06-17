"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

export default function NewsletterSection() {
  const t = useTranslations("home.newsletter");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: integrate with email service (Mailchimp/ConvertKit/etc.)
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-navy-900 via-navy-900 to-navy-800 rounded-3xl p-8 sm:p-12 overflow-hidden">
          {/* Decoration */}
          <div className="absolute inset-0 molecule-bg opacity-10" />
          <div className="orb orb-teal w-64 h-64 -top-20 -right-20 opacity-20" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-start">
              <SectionBadge variant="white" className="mb-3">
                {t("badge")}
              </SectionBadge>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-white mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {t("title")}
              </h2>
              <p className="text-navy-300">{t("subtitle")}</p>
            </div>

            <div className="w-full lg:w-auto lg:min-w-[380px]">
              {submitted ? (
                <div className="flex items-center gap-3 bg-teal-500/10 border border-teal-500/30 rounded-xl px-5 py-4">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
                  <p className="text-teal-300 text-sm font-medium">
                    {isRTL ? "تم الاشتراك بنجاح! 🎉" : "Successfully subscribed! 🎉"}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("placeholder")}
                      className="w-full ps-10 pe-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-navy-400 focus:outline-none focus:border-teal-400 transition-colors text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-400 hover:to-teal-500 transition-all duration-300 whitespace-nowrap text-sm"
                  >
                    {t("cta")}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
              <p className="text-navy-400 text-xs mt-3 text-center lg:text-start">
                {t("privacy")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
