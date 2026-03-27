"use client";

import { motion } from "framer-motion";
import { X, CheckCircle, Lock } from "lucide-react";

interface Tag {
  bad: string[];
  ok: string[];
}

interface Fix {
  section: string;
  suggestion: string;
}

interface RoastCardProps {
  score: number;
  roast: string;
  problems: string[];
  tags: Tag;
  fixes: Fix[];
  verdict: string;
  ats_score: number;
  isPaid?: boolean;
  isPreview?: boolean;
}

export default function RoastCard({
  score,
  roast,
  problems,
  tags,
  fixes,
  verdict,
  ats_score,
  isPaid = false,
  isPreview = false,
}: RoastCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-2xl border border-dark-border bg-dark-card overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-start justify-between p-6 border-b border-dark-border">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand/40 to-brand/10 border border-brand/30 flex items-center justify-center text-white font-bebas text-lg">
            JS
          </div>
          <div>
            <p className="text-white font-semibold">Your Resume</p>
            <p className="text-white/40 text-xs">Just submitted</p>
          </div>
        </div>
        {/* Score badge */}
        <div className="text-right">
          <div className="font-bebas text-5xl leading-none text-brand">{score}</div>
          <div className="text-white/30 text-xs tracking-wider">/100</div>
        </div>
      </div>

      {/* ATS Score Bar */}
      <div className="px-6 py-4 border-b border-dark-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/50 text-xs tracking-wider uppercase">ATS Score</span>
          <span className="text-white/70 text-xs font-semibold">{ats_score}/100</span>
        </div>
        <div className="h-1.5 bg-dark-border rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${ats_score}%` }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{
              background: ats_score >= 70 ? "#22c55e" : ats_score >= 40 ? "#f59e0b" : "#ef4444",
            }}
          />
        </div>
      </div>

      {/* Verdict */}
      <div className="px-6 py-4 border-b border-dark-border bg-brand/5">
        <p className="text-brand font-semibold text-sm italic">&quot;{verdict}&quot;</p>
      </div>

      {/* Roast */}
      <div className="px-6 py-5 border-b border-dark-border">
        <p className="text-white/80 leading-relaxed text-sm">{roast}</p>
      </div>

      {/* Problems */}
      <div className="px-6 py-5 border-b border-dark-border">
        <h4 className="text-white/40 text-xs tracking-widest uppercase mb-3">Main Problems</h4>
        <ul className="flex flex-col gap-2">
          {problems.map((prob, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/70">
              <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span>{prob}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="px-6 py-5 border-b border-dark-border">
        <div className="flex flex-wrap gap-2">
          {tags.bad?.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20"
            >
              {tag}
            </span>
          ))}
          {tags.ok?.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Fix Suggestions (paywall) */}
      <div className="relative">
        <div
          className={`px-6 py-5 ${!isPaid ? "blur-sm pointer-events-none select-none" : ""}`}
        >
          <h4 className="text-white/40 text-xs tracking-widest uppercase mb-3">Fix Suggestions</h4>
          <ul className="flex flex-col gap-3">
            {fixes.map((fix, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-white/50 font-semibold">{fix.section}: </span>
                  <span className="text-white/70">{fix.suggestion}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Paywall overlay */}
        {!isPaid && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-card/70 backdrop-blur-[2px]">
            <div className="flex flex-col items-center gap-3 text-center px-6">
              <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center">
                <Lock className="w-5 h-5 text-brand" />
              </div>
              <p className="text-white font-semibold text-sm">Fix suggestions are locked</p>
              {!isPreview && (
                <button className="px-5 py-2 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-colors shadow-brand-sm">
                  Get Full Roast — $9 one-time
                </button>
              )}
              {isPreview && (
                <p className="text-white/40 text-xs">Unlock for $9 one-time</p>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
