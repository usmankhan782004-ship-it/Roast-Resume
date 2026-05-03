"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import ScoreCircle from "@/components/ScoreCircle";
import ShareCard from "@/components/ShareCard";
import { X, CheckCircle, Lock, ArrowLeft, Flame } from "lucide-react";

interface RoastData {
  id: string;
  score: number;
  roast_text: string;
  problems: string[];
  fixes: { section: string; suggestion: string }[];
  tags: { bad: string[]; ok: string[] };
  ats_score: number;
  verdict: string;
  is_paid: boolean;
  share_token: string;
}

interface ResultClientProps {
  roast: RoastData | null;
  roastId: string;
}

export default function ResultClient({ roast, roastId }: ResultClientProps) {
  const [resolvedRoast, setResolvedRoast] = useState<RoastData | null>(roast);

  useEffect(() => {
    if (resolvedRoast || typeof window === "undefined") {
      return;
    }

    const stored = window.localStorage.getItem(`roast:${roastId}`);
    if (!stored) {
      return;
    }

    try {
      setResolvedRoast(JSON.parse(stored) as RoastData);
    } catch {
      // Ignore malformed local cache and keep the empty state.
    }
  }, [roastId, resolvedRoast]);

  if (!resolvedRoast) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <div className="max-w-lg w-full rounded-2xl border border-dark-border bg-dark-card p-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-semibold tracking-widest uppercase mb-5">
            <Flame size={12} />
            Loading roast
          </div>
          <h1 className="font-bebas text-4xl tracking-wider text-white mb-3">
            HOLD UP
          </h1>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            I&apos;m trying to load your roast. If this is your own upload, the browser cache should have it.
          </p>
          <p className="text-white/30 text-xs break-all">
            Result ID: {roastId}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-brand/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/roast"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Roast another resume
          </Link>
        </motion.div>

        {/* Header with Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center mb-12 gap-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-semibold tracking-widest uppercase">
            <Flame size={12} />
            Your Roast Results
          </div>
          <ScoreCircle score={resolvedRoast.score} size={200} />
          <div>
            <p className="text-brand font-semibold text-lg italic mb-2">
              &quot;{resolvedRoast.verdict}&quot;
            </p>
            <p className="text-white/30 text-sm">ATS Score: {resolvedRoast.ats_score}/100</p>
          </div>
        </motion.div>

        {/* ATS progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 p-5 rounded-xl border border-dark-border bg-dark-card"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/50 text-xs tracking-wider uppercase">ATS Compatibility</span>
            <span className="text-white font-semibold text-sm">{resolvedRoast.ats_score}/100</span>
          </div>
          <div className="h-2 bg-dark-border rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${resolvedRoast.ats_score}%` }}
              transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background:
                  resolvedRoast.ats_score >= 70
                    ? "#22c55e"
                    : resolvedRoast.ats_score >= 40
                    ? "#f59e0b"
                    : "#ef4444",
              }}
            />
          </div>
          <p className="mt-2 text-white/30 text-xs">
            {resolvedRoast.ats_score < 40
              ? "Your resume would be invisible to ATS systems."
              : resolvedRoast.ats_score < 70
              ? "Moderate ATS compatibility — room for improvement."
              : "Good ATS compatibility."}
          </p>
        </motion.div>

        {/* Roast Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 p-6 rounded-xl border border-dark-border bg-dark-card"
        >
          <h2 className="font-bebas text-2xl tracking-wider text-white mb-4">THE ROAST</h2>
          <p className="text-white/70 leading-relaxed">{resolvedRoast.roast_text}</p>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-6 p-6 rounded-xl border border-dark-border bg-dark-card"
        >
          <h2 className="font-bebas text-2xl tracking-wider text-white mb-4">VERDICT TAGS</h2>
          <div className="flex flex-wrap gap-2">
            {resolvedRoast.tags?.bad?.map((tag: string, i: number) => (
              <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                {tag}
              </span>
            ))}
            {resolvedRoast.tags?.ok?.map((tag: string, i: number) => (
              <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Problems */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 p-6 rounded-xl border border-dark-border bg-dark-card"
        >
          <h2 className="font-bebas text-2xl tracking-wider text-white mb-4">MAIN PROBLEMS</h2>
          <ul className="flex flex-col gap-3">
            {resolvedRoast.problems?.map((prob: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                {prob}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Fix Suggestions (paywall) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mb-6 relative rounded-xl border border-dark-border bg-dark-card overflow-hidden"
        >
          <div className={`p-6 ${!resolvedRoast.is_paid ? "blur-sm pointer-events-none select-none" : ""}`}>
            <h2 className="font-bebas text-2xl tracking-wider text-white mb-4">FIX SUGGESTIONS</h2>
            <ul className="flex flex-col gap-4">
              {resolvedRoast.fixes?.map((fix: { section: string; suggestion: string }, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-white/60 font-semibold">{fix.section}: </span>
                    <span className="text-white/70">{fix.suggestion}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {!resolvedRoast.is_paid && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-card/75 backdrop-blur-[2px]">
              <div className="flex flex-col items-center gap-4 text-center px-6">
                <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Fix suggestions are locked</p>
                  <p className="text-white/40 text-sm">Unlock your complete action plan</p>
                </div>
                <button className="px-8 py-3 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark transition-all shadow-brand hover:shadow-brand hover:scale-[1.02] active:scale-[0.99]">
                  Get Full Roast — $9 one-time
                </button>
                <p className="text-white/20 text-xs">One-time payment · Instant access</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 p-6 rounded-xl border border-dark-border bg-dark-card"
        >
          <h2 className="font-bebas text-2xl tracking-wider text-white mb-6">SHARE YOUR ROAST</h2>
          <ShareCard
            score={resolvedRoast.score}
            verdict={resolvedRoast.verdict}
            shareToken={resolvedRoast.share_token || resolvedRoast.id}
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/roast"
            className="inline-flex items-center gap-2 px-8 py-3 bg-dark-card border border-dark-border text-white/60 rounded-xl hover:text-white hover:border-brand/30 transition-colors text-sm"
          >
            <Flame size={16} className="text-brand" />
            Roast another resume
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
