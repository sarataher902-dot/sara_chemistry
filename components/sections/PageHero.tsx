import SectionBadge from "@/components/ui/SectionBadge";

interface PageHeroProps {
  badge: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function PageHero({ badge, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy-950 overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="orb orb-teal w-80 h-80 -top-32 -right-20" />
      <div className="orb orb-cyan w-56 h-56 bottom-0 left-10 opacity-10" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,184,184,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,184,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-5">
          <SectionBadge variant="white">{badge}</SectionBadge>
        </div>
        <h1
          className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-navy-300 text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {children}
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 60L48 56C96 52 192 44 288 40C384 36 480 36 576 42C672 48 768 60 864 60C960 60 1056 48 1152 42C1248 36 1344 36 1392 36L1440 36V60H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
