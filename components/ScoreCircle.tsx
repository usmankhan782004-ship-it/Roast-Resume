"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface ScoreCircleProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

function getScoreColor(score: number): string {
  if (score >= 70) return "#22c55e"; // green
  if (score >= 40) return "#f59e0b"; // amber
  return "#ef4444"; // red
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Decent";
  if (score >= 60) return "Meh";
  if (score >= 40) return "Weak";
  if (score >= 20) return "Bad";
  return "Trash";
}

export default function ScoreCircle({
  score,
  size = 180,
  strokeWidth = 12,
}: ScoreCircleProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  useEffect(() => {
    if (inView) {
      controls.start({
        strokeDashoffset: circumference - (score / 100) * circumference,
        transition: { duration: 1.8, ease: [0.4, 0, 0.2, 1] },
      });
    }
  }, [inView, controls, score, circumference]);

  return (
    <div ref={ref} className="relative flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#222222"
            strokeWidth={strokeWidth}
          />
          {/* Glow filter */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Animated progress arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={controls}
            filter="url(#glow)"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="font-bebas leading-none"
            style={{ fontSize: size * 0.28, color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6, ease: "backOut" }}
          >
            {score}
          </motion.span>
          <span className="text-white/30 text-xs font-dm tracking-widest uppercase">
            / 100
          </span>
        </div>
      </div>

      {/* Label badge */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8 }}
        className="px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
        style={{
          backgroundColor: `${color}20`,
          color,
          border: `1px solid ${color}40`,
        }}
      >
        {label}
      </motion.div>
    </div>
  );
}
