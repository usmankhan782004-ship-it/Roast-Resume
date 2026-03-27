"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PricingPlans from "@/components/PricingPlans";
import { Flame, HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "How does the AI roast work?",
    a: "We send your resume text to Google's Gemini 1.5 Flash model with a specialized prompt that evaluates structure, content, ATS compatibility, and impact. The result is a brutally honest (but genuinely helpful) score and analysis.",
  },
  {
    q: "Is my resume data safe?",
    a: "Your resume text is analyzed and stored in our database with a unique ID for the share link. We don't sell your data or use it to train AI models. You can request deletion at any time.",
  },
  {
    q: "What formats do you support?",
    a: "We support PDF and DOCX files up to 10MB. These cover 99% of all resumes. We extract the raw text for analysis.",
  },
  {
    q: "What's included in the $9 Quick Fix?",
    a: "You get the full roast report including all fix suggestions unlocked, section-by-section rewrites, and ATS keyword optimization — one-time payment, no subscription.",
  },
  {
    q: "What counts as ATS score?",
    a: "ATS (Applicant Tracking System) score measures how well your resume would survive automated screening software used by most large employers. It checks formatting, keywords, and structure.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-dark-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-white/80 font-medium text-sm pr-4">{q}</span>
        <ChevronDown
          size={18}
          className={`text-white/30 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="pb-5"
        >
          <p className="text-white/40 text-sm leading-relaxed">{a}</p>
        </motion.div>
      )}
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-dark">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-brand/5 blur-[120px] pointer-events-none" />

      {/* Hero */}
      <section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-semibold tracking-widest uppercase mb-6">
            <Flame size={12} />
            Simple Pricing
          </div>
          <h1 className="font-bebas text-6xl sm:text-7xl tracking-wider text-white mb-4">
            STOP GETTING REJECTED
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            One honest AI critique could be worth more than 6 months of job applications.
          </p>
        </motion.div>
      </section>

      {/* Plans */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <PricingPlans />
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase mb-4">
            <HelpCircle size={14} />
            FAQ
          </div>
          <h2 className="font-bebas text-4xl tracking-wider text-white">COMMON QUESTIONS</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-dark-border bg-dark-card px-6"
        >
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-white/40 text-sm mb-4">Still not sure? Try the free roast first.</p>
          <Link
            href="/roast"
            className="inline-flex items-center gap-2 px-8 py-3 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark transition-all shadow-brand hover:scale-[1.02]"
          >
            <Flame size={16} />
            Start Free Roast
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
