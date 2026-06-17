import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "teal" | "navy" | "white";
}

export default function SectionBadge({
  children,
  className,
  variant = "teal",
}: SectionBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest",
        variant === "teal" &&
          "bg-teal-50 text-teal-700 border border-teal-200",
        variant === "navy" &&
          "bg-navy-50 text-navy-700 border border-navy-200",
        variant === "white" &&
          "bg-white/15 text-white border border-white/30 backdrop-blur-sm",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {children}
    </span>
  );
}
