"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import UploadZone from "@/components/UploadZone";
import PricingPlans from "@/components/PricingPlans";
import { Flame, Clock, Shield, TrendingUp } from "lucide-react";

const stats = [
  { value: "47K+", label: "Resumes roasted", icon: Flame },
  { value: "$0", label: "To get started", icon: Shield },
  { value: "30s", label: "Average roast time", icon: Clock },
  { value: "94%", label: "ATS fail rate caught", icon: TrendingUp },
];

const steps = [
  {
    number: "01",
    title: "Upload your resume",
    desc: "PDF or DOCX — we handle both. Drag, drop, done.",
  },
  {
    number: "02",
    title: "Get brutally roasted",
    desc: "Gemini AI tears through every section, no mercy.",
  },
  {
    number: "03",
    title: "Fix it & get hired",
    desc: "Actionable suggestions turn your mess into a magnet.",
  },
];

const sampleRoast = {
  score: 23,
  verdict: "A resume so generic it could apply for any job and get rejected by all of them.",
  roast:
    "John lists 'Microsoft Office' as a skill in 2026 — bold move, my guy. The objective section reads like it was copy-pasted from a 2004 Yahoo Jobs template, and somehow there's not a single number in the entire document. Three pages for a 2-year career? Your resume isn't bad, it's aggressively mediocre.",
  problems: [
    "No quantifiable achievements anywhere",
    "Objective section is a complete cliché",
    "Listed 'Microsoft Office' as a skill",
  ],
  tags: {
    bad: ["ATS Failed", "No metrics", "Generic summary"],
    ok: ["Good structure", "Right length"],
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand/5 blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-semibold tracking-widest uppercase"
          >
            <Flame size={12} />
            AI-Powered Resume Destruction
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-bebas text-6xl sm:text-8xl lg:text-9xl leading-none tracking-wider mb-6"
          >
            YOUR RESUME{" "}
            <span className="text-brand" style={{ textShadow: "0 0 40px rgba(255,69,0,0.5)" }}>
              SUCKS.
            </span>
            <br />
            LET&apos;S PROVE IT.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-lg sm:text-xl max-w-xl mb-12 leading-relaxed"
          >
            Upload your resume. Get brutally honest AI feedback in 30 seconds.
          </motion.p>

          {/* Upload Zone */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full max-w-lg"
          >
            <UploadZone />
            <p className="text-white/20 text-xs mt-4 text-center">
              Free to start · No signup required · PDF & DOCX
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="border-y border-dark-border bg-dark-card/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-2"
              >
                <stat.icon className="w-5 h-5 text-brand/60" />
                <div className="font-bebas text-4xl text-white">{stat.value}</div>
                <div className="text-white/40 text-xs tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-bebas text-5xl sm:text-6xl tracking-wider text-white mb-3">
            HOW IT WORKS
          </h2>
          <p className="text-white/40 text-sm">Three steps to destroying your ego</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative flex flex-col gap-4 p-6 rounded-2xl border border-dark-border bg-dark-card group hover:border-brand/30 transition-colors"
            >
              <span className="font-bebas text-6xl text-brand/20 group-hover:text-brand/30 transition-colors leading-none">
                {step.number}
              </span>
              <h3 className="font-bebas text-2xl tracking-wide text-white">{step.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sample Roast Preview */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-bebas text-5xl sm:text-6xl tracking-wider text-white mb-3">
            SAMPLE ROAST
          </h2>
          <p className="text-white/40 text-sm">This is what we do to bad resumes</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-dark-border bg-dark-card overflow-hidden"
        >
          {/* Card Header */}
          <div className="flex items-start justify-between p-6 border-b border-dark-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand/40 to-brand/10 border border-brand/30 flex items-center justify-center text-white font-bebas text-lg">
                JS
              </div>
              <div>
                <p className="text-white font-semibold">John Smith&apos;s Resume</p>
                <p className="text-white/40 text-xs">Just roasted</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bebas text-5xl leading-none text-red-400">{sampleRoast.score}</div>
              <div className="text-white/30 text-xs">/100</div>
            </div>
          </div>

          {/* Verdict */}
          <div className="px-6 py-4 border-b border-dark-border bg-brand/5">
            <p className="text-brand text-sm italic">"{sampleRoast.verdict}"</p>
          </div>

          {/* Roast Text */}
          <div className="px-6 py-5 border-b border-dark-border">
            <p className="text-white/70 text-sm leading-relaxed">{sampleRoast.roast}</p>
          </div>

          {/* Tags */}
          <div className="px-6 py-4 border-b border-dark-border flex flex-wrap gap-2">
            {sampleRoast.tags.bad.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full text-xs bg-red-500/10 text-red-400 border border-red-500/20">
                {tag}
              </span>
            ))}
            {sampleRoast.tags.ok.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {tag}
              </span>
            ))}
          </div>

          {/* Blurred fix suggestions */}
          <div className="relative">
            <div className="px-6 py-5 blur-sm pointer-events-none select-none">
              <h4 className="text-white/40 text-xs tracking-widest uppercase mb-3">Fix Suggestions</h4>
              <ul className="flex flex-col gap-2 text-sm text-white/60">
                <li>✓ Summary: Rewrite with specific target role and 2 key achievements</li>
                <li>✓ Experience: Add metrics to every bullet point</li>
                <li>✓ Skills: Remove MS Office, add industry-specific tools</li>
                <li>✓ Length: Condense to 1 page max</li>
              </ul>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-card/70 backdrop-blur-[2px]">
              <div className="flex flex-col items-center gap-3 text-center px-6">
                <p className="text-white font-semibold text-sm">Fix suggestions locked</p>
                <Link
                  href="/roast"
                  className="px-6 py-2.5 bg-brand text-white text-sm font-bold rounded-lg hover:bg-brand-dark transition-colors shadow-brand-sm"
                >
                  Get Full Roast — $9 one-time
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section className="bg-dark-card/30 border-t border-dark-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-bebas text-5xl sm:text-6xl tracking-wider text-white mb-3">
              SIMPLE PRICING
            </h2>
            <p className="text-white/40 text-sm">Pay once, stop getting rejected</p>
          </motion.div>
          <PricingPlans />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-border bg-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-brand" />
            <span className="font-bebas text-xl tracking-wider text-white/60">
              RoastMyResume.ai
            </span>
          </div>
          <p className="text-white/30 text-sm text-center">
            RoastMyResume.ai · Built with brutally honest AI · 2026
          </p>
          <Link href="/pricing" className="text-white/30 text-sm hover:text-white/60 transition-colors">
            Pricing
          </Link>
        </div>
      </footer>
    </div>
  );
}
