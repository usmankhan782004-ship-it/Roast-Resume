"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Zap, Crown } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
  icon: React.ReactNode;
}

const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    description: "Dip your toes in the burn",
    features: [
      "1 resume roast",
      "Score preview (0–100)",
      "Basic problems list",
      "Locked fix suggestions",
      "Shareable result link",
    ],
    cta: "Start Free Roast",
    ctaHref: "/roast",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    name: "Quick Fix",
    price: "$9",
    period: "one-time",
    description: "Full roast. Full fixes. Get hired.",
    features: [
      "1 full resume roast",
      "Detailed score breakdown",
      "ATS compatibility score",
      "Unlocked fix suggestions",
      "Section-by-section rewrites",
      "ATS keyword optimization",
      "Shareable result card",
    ],
    cta: "Get Full Roast — $9",
    ctaHref: "/pricing",
    highlighted: true,
    badge: "MOST POPULAR",
    icon: <Zap className="w-5 h-5 text-brand" />,
  },
  {
    name: "Job Hustler",
    price: "$19",
    period: "/month",
    description: "Unlimited roasts. Land the job.",
    features: [
      "Unlimited resume roasts",
      "Everything in Quick Fix",
      "Cover letter generation",
      "LinkedIn bio roast",
      "Priority AI response",
      "Export as PDF report",
    ],
    cta: "Go Unlimited",
    ctaHref: "/pricing",
    icon: <Crown className="w-5 h-5" />,
  },
];

export default function PricingPlans() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan, i) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className={`
            relative flex flex-col rounded-2xl border p-6 transition-all duration-300
            ${plan.highlighted
              ? "border-brand bg-gradient-to-b from-brand/10 to-dark-card shadow-brand"
              : "border-dark-border bg-dark-card hover:border-dark-border/80"
            }
          `}
        >
          {/* Popular badge */}
          {plan.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 bg-brand text-white text-xs font-bold tracking-widest rounded-full shadow-brand-sm">
                {plan.badge}
              </span>
            </div>
          )}

          {/* Header */}
          <div className="mb-6">
            <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center ${plan.highlighted ? "bg-brand/20 border border-brand/30 text-brand" : "bg-dark-muted border border-dark-border text-white/50"}`}>
              {plan.icon}
            </div>
            <h3 className="font-bebas text-2xl tracking-wide text-white">{plan.name}</h3>
            <p className="text-white/40 text-sm mt-1">{plan.description}</p>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-end gap-1">
              <span className={`font-bebas text-5xl leading-none ${plan.highlighted ? "text-brand" : "text-white"}`}>
                {plan.price}
              </span>
              {plan.period && (
                <span className="text-white/30 text-sm mb-1">{plan.period}</span>
              )}
            </div>
          </div>

          {/* Features */}
          <ul className="flex flex-col gap-2.5 mb-8 flex-1">
            {plan.features.map((feat, j) => (
              <li key={j} className="flex items-start gap-2.5 text-sm">
                <Check
                  className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? "text-brand" : "text-white/40"}`}
                />
                <span className="text-white/70">{feat}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href={plan.ctaHref}
            className={`
              w-full py-3 rounded-xl text-sm font-bold text-center transition-all duration-200
              ${plan.highlighted
                ? "bg-brand text-white hover:bg-brand-dark shadow-brand-sm hover:shadow-brand hover:scale-[1.02]"
                : "bg-dark-muted border border-dark-border text-white/70 hover:text-white hover:border-brand/30"
              }
            `}
          >
            {plan.cta}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
