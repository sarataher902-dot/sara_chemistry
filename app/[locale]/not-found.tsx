import Link from "next/link";
import { FlaskConical, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="orb orb-teal w-80 h-80 -top-20 -right-20 opacity-20" />

      <div className="relative z-10 max-w-md mx-auto">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-teal-500 to-navy-800 flex items-center justify-center mb-8 shadow-glow">
          <FlaskConical className="w-10 h-10 text-white" />
        </div>

        {/* 404 */}
        <div
          className="text-8xl font-extrabold gradient-text mb-4 leading-none"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          404
        </div>

        <h1 className="text-2xl font-bold text-white mb-3">
          Reaction Not Found
        </h1>
        <p className="text-navy-300 text-sm leading-relaxed mb-8">
          This element seems to have decayed. The page you're looking for doesn't exist — but there's plenty of chemistry waiting for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/en"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-400 hover:to-teal-500 transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/en/learn"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/15 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Learn Chemistry
          </Link>
        </div>
      </div>
    </div>
  );
}
