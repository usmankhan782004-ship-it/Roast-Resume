"use client";

import { motion } from "framer-motion";
import UploadZone from "@/components/UploadZone";
import { Flame, Shield, Clock, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DEMO_RESUME_TEXT = `JOHN SMITH
john.smith@gmail.com | LinkedIn: linkedin.com/in/johnsmith | Phone: 555-0100

OBJECTIVE
To obtain a challenging position in a fast-paced organization where I can utilize my skills and grow professionally.

SKILLS
• Microsoft Office (Word, Excel, PowerPoint)
• Communication skills
• Team player
• Detail-oriented
• Fast learner

WORK EXPERIENCE
Junior Marketing Coordinator
XYZ Corp | June 2022 – Present
• Assisted with marketing campaigns
• Worked with cross-functional teams
• Helped create content for social media
• Attended weekly meetings and took notes

Intern
ABC Company | Jan 2022 – May 2022
• Performed various administrative tasks
• Assisted senior staff with day-to-day operations

EDUCATION
Bachelor of Business Administration
State University | Graduated May 2022
GPA: 3.1 / 4.0

REFERENCES
Available upon request.`;

export default function RoastPage() {
  const router = useRouter();
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoError, setDemoError] = useState("");

  const handleDemo = async () => {
    setDemoLoading(true);
    setDemoError("");
    try {
      const res = await fetch("/api/roast/demo", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      router.push(`/result/${data.id}`);
    } catch (err: unknown) {
      setDemoError(err instanceof Error ? err.message : "Something went wrong");
      setDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-brand/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-semibold tracking-widest uppercase mb-6">
            <Flame size={12} />
            Let&apos;s Get Roasting
          </div>
          <h1 className="font-bebas text-6xl sm:text-7xl tracking-wider text-white mb-4">
            UPLOAD YOUR RESUME
          </h1>
          <p className="text-white/40 text-lg">
            We&apos;ll tear it apart so recruiters don&apos;t have to.
          </p>
        </motion.div>

        {/* Upload Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <UploadZone />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4 my-6"
        >
          <div className="flex-1 h-px bg-dark-border" />
          <span className="text-white/20 text-xs tracking-widest uppercase">or</span>
          <div className="flex-1 h-px bg-dark-border" />
        </motion.div>

        {/* Demo Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={handleDemo}
            disabled={demoLoading}
            className={`
              w-full flex items-center justify-center gap-3 py-4 rounded-xl border text-sm font-semibold transition-all duration-200
              ${demoLoading
                ? "border-brand/20 bg-brand/5 text-brand/40 cursor-not-allowed"
                : "border-brand/30 bg-brand/10 text-brand hover:bg-brand/20 hover:border-brand/50"
              }
            `}
          >
            {demoLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                Roasting demo resume... (15–30s)
              </>
            ) : (
              <>
                <PlayCircle size={18} />
                Try with a Demo Resume — No Upload Needed
              </>
            )}
          </button>
          {demoError && (
            <p className="text-red-400 text-xs text-center mt-2">{demoError}</p>
          )}
          <p className="text-white/20 text-xs text-center mt-2">
            Uses a sample weak resume so you can see a real roast instantly
          </p>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 grid grid-cols-3 gap-4"
        >
          {[
            { icon: Shield, text: "We never store your resume permanently" },
            { icon: Clock, text: "Results in under 30 seconds" },
            { icon: Flame, text: "Powered by Gemini 2.0 Flash" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 text-center p-4 rounded-xl border border-dark-border bg-dark-card">
              <item.icon className="w-5 h-5 text-brand/50" />
              <p className="text-white/30 text-xs leading-relaxed">{item.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
