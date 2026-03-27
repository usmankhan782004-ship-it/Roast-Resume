"use client";

import { motion } from "framer-motion";
import { X, Link } from "lucide-react";

interface ShareCardProps {
  score: number;
  verdict: string;
  shareToken: string;
}

export default function ShareCard({ score, verdict, shareToken }: ShareCardProps) {
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/result/${shareToken}`;

  const twitterText = `I just got my resume roasted by AI 🔥\n\nScore: ${score}/100\n"${verdict}"\n\nGet yours roasted at`;
  const linkedinText = `My resume just got absolutely destroyed by AI 💀\n\nScore: ${score}/100 — "${verdict}"\n\nTry it yourself:`;

  const openTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  };

  const openLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  };

  const getScoreColor = (s: number) => {
    if (s >= 70) return "#22c55e";
    if (s >= 40) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Visual Share Card */}
      <motion.div
        id="share-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-dark-border overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #141414 0%, #0f0f0f 100%)",
        }}
      >
        {/* Top brand bar */}
        <div className="px-6 py-3 bg-brand/10 border-b border-brand/20 flex items-center justify-between">
          <span className="font-bebas tracking-wider text-white/70 text-sm">
            ROASTMYRESUME.AI
          </span>
          <span className="text-white/30 text-xs">AI Resume Analysis</span>
        </div>

        <div className="p-8 flex flex-col items-center gap-6 text-center">
          {/* Score display */}
          <div>
            <div
              className="font-bebas leading-none"
              style={{ fontSize: "5rem", color: getScoreColor(score) }}
            >
              {score}
              <span className="text-white/20" style={{ fontSize: "2rem" }}>/100</span>
            </div>
          </div>

          {/* Verdict */}
          <blockquote className="text-white/70 text-lg italic max-w-md">
            &quot;{verdict}&quot;
          </blockquote>

          {/* Share URL */}
          <div className="text-white/20 text-xs tracking-wider border border-dark-border rounded-lg px-4 py-2 font-mono">
            {shareUrl}
          </div>
        </div>
      </motion.div>

      {/* Share Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={openTwitter}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 text-[#1DA1F2] font-semibold text-sm hover:bg-[#1DA1F2]/20 transition-colors"
        >
          <X size={18} />
          Share on X / Twitter
        </button>
        <button
          onClick={openLinkedIn}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/20 text-[#0A66C2] font-semibold text-sm hover:bg-[#0A66C2]/20 transition-colors"
        >
          <Link size={18} />
          Share on LinkedIn
        </button>
      </div>
    </div>
  );
}
