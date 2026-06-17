"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Send, CheckCircle2, AlertCircle, Mail, MessageCircle, Instagram, Youtube, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const SUBJECTS_EN = ["General Enquiry", "Book a Tutoring Session", "IGCSE Exam Prep", "Custom Worksheet Order", "Content Writing Request", "Other"];
const SUBJECTS_AR = ["استفسار عام", "حجز جلسة تدريس", "التحضير لامتحان IGCSE", "طلب ورقة عمل مخصصة", "طلب كتابة محتوى", "أخرى"];

const socials = [
  { icon: Instagram,     label: "Instagram",   href: "https://instagram.com",    handleEn: "@sarachemistry",    handleAr: "@sarachemistry" },
  { icon: Youtube,       label: "YouTube",     href: "https://youtube.com",      handleEn: "Sara Chemistry",    handleAr: "سارة الكيمياء" },
  { icon: Twitter,       label: "Twitter / X", href: "https://twitter.com",      handleEn: "@sara_chemistry",   handleAr: "@sara_chemistry" },
  { icon: MessageCircle, label: "WhatsApp",    href: "https://wa.me/1234567890", handleEn: "+1 234 567 890",    handleAr: "واتساب" },
];

export default function ContactPageClient() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [form, setForm]       = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus]   = useState<"idle" | "sending" | "success" | "error">("idle");
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});

  const subjects = isRTL ? SUBJECTS_AR : SUBJECTS_EN;

  const errors: Partial<Record<keyof FormState, string>> = {};
  if (touched.name    && !form.name.trim())                           errors.name    = isRTL ? "الاسم مطلوب" : "Name is required";
  if (touched.email   && !/\S+@\S+\.\S+/.test(form.email))           errors.email   = isRTL ? "بريد إلكتروني غير صالح" : "Invalid email address";
  if (touched.subject && !form.subject)                               errors.subject = isRTL ? "الموضوع مطلوب" : "Please select a subject";
  if (touched.message && form.message.trim().length < 10)             errors.message = isRTL ? "الرسالة قصيرة جداً" : "Message is too short";

  const isValid = !Object.keys(errors).length && form.name && form.email && form.subject && form.message.length >= 10;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    if (!isValid) return;

    setStatus("sending");
    // Simulate async submission — replace with your API/form service
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTouched({});
  };

  const fieldCls = (field: keyof FormState) =>
    cn(
      "w-full px-4 py-3 rounded-xl border text-sm text-navy-900 placeholder-navy-400 focus:outline-none focus:ring-2 transition-all bg-white",
      errors[field]
        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
        : "border-navy-200 focus:border-teal-400 focus:ring-teal-100"
    );

  return (
    <section className="py-16 lg:py-24 bg-section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">

          {/* ── Form ── */}
          <div className="bg-white rounded-3xl border border-navy-100 shadow-card p-8 sm:p-10">
            <h2
              className="text-2xl font-extrabold text-navy-900 mb-1"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t("title")}
            </h2>
            <p className="text-navy-500 text-sm mb-8">{t("subtitle")}</p>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-teal-500" />
                </div>
                <p className="text-navy-900 font-bold text-lg">{t("form.success")}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm text-teal-600 font-semibold hover:underline"
                >
                  {isRTL ? "إرسال رسالة أخرى" : "Send another message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-navy-700 mb-1.5">
                      {t("form.name")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur("name")}
                      placeholder={isRTL ? "الاسم الكامل" : "Full name"}
                      className={fieldCls("name")}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy-700 mb-1.5">
                      {t("form.email")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur("email")}
                      placeholder="you@example.com"
                      className={fieldCls("email")}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1.5">
                    {t("form.subject")} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    onBlur={() => handleBlur("subject")}
                    className={fieldCls("subject")}
                  >
                    <option value="">{isRTL ? "اختر موضوعاً..." : "Select a subject..."}</option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1.5">
                    {t("form.message")} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur("message")}
                    rows={5}
                    placeholder={isRTL ? "اكتب رسالتك هنا..." : "Write your message here..."}
                    className={cn(fieldCls("message"), "resize-none")}
                  />
                  <div className="flex items-center justify-between mt-1">
                    {errors.message
                      ? <p className="text-red-500 text-xs">{errors.message}</p>
                      : <span />
                    }
                    <span className={cn("text-xs", form.message.length > 10 ? "text-navy-400" : "text-navy-300")}>
                      {form.message.length} {isRTL ? "حرف" : "chars"}
                    </span>
                  </div>
                </div>

                {/* Error alert */}
                {status === "error" && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <p className="text-red-600 text-sm">{t("form.error")}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-200",
                    status === "sending"
                      ? "bg-navy-100 text-navy-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 shadow-sm hover:shadow-glow"
                  )}
                >
                  {status === "sending" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-navy-300 border-t-transparent rounded-full animate-spin" />
                      {t("form.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t("form.send")}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── Sidebar info ── */}
          <div className="space-y-5">
            {/* Direct email */}
            <div className="bg-white rounded-2xl border border-navy-100 shadow-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-bold text-navy-900 text-sm mb-1">
                    {isRTL ? "راسلني عبر البريد الإلكتروني" : "Email Me Directly"}
                  </p>
                  <a
                    href="mailto:sara@sarachemistry.com"
                    className="text-teal-600 text-sm hover:underline font-medium"
                  >
                    {t("info.email")}
                  </a>
                  <p className="text-navy-400 text-xs mt-1">
                    {isRTL ? "رد خلال 24 ساعة" : "Response within 24 hours"}
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-green-500 hover:bg-green-600 rounded-2xl p-6 transition-colors group"
            >
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">{t("info.whatsapp")}</p>
                <p className="text-green-100 text-xs">
                  {isRTL ? "رد أسرع عادةً" : "Usually faster response"}
                </p>
              </div>
            </a>

            {/* Social links */}
            <div className="bg-white rounded-2xl border border-navy-100 shadow-card p-6">
              <p className="text-xs font-bold text-navy-500 uppercase tracking-wider mb-4">
                {t("info.social")}
              </p>
              <div className="space-y-3">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group hover:text-teal-600 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-navy-50 group-hover:bg-teal-50 border border-navy-100 group-hover:border-teal-200 flex items-center justify-center transition-colors">
                        <Icon className="w-4 h-4 text-navy-500 group-hover:text-teal-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-navy-700 group-hover:text-teal-600">{s.label}</p>
                        <p className="text-xs text-navy-400">{isRTL ? s.handleAr : s.handleEn}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Response note */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-100 p-5">
              <p className="text-teal-800 text-xs leading-relaxed font-medium">
                💡 {isRTL
                  ? "للحجوزات، يُرجى تضمين مستواك الدراسي ومواد الامتحان وأي تواريخ امتحان قادمة."
                  : "For bookings, please include your year group, exam board, and any upcoming exam dates."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
