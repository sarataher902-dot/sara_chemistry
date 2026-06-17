import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
  variant?: "default" | "navy" | "teal" | "ghost";
}

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const variants = {
  default: "bg-white border border-navy-100 shadow-card hover:shadow-card-hover",
  navy: "bg-navy-900 border border-navy-800 text-white",
  teal: "bg-teal-50 border border-teal-200",
  ghost: "bg-transparent border border-navy-100",
};

export default function Card({
  children,
  className,
  hover = true,
  padding = "md",
  variant = "default",
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300",
        variants[variant],
        paddings[padding],
        hover && "hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </div>
  );
}
