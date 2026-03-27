"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-dark-border bg-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Flame
                className="w-7 h-7 text-brand group-hover:scale-110 transition-transform"
              />
              <div className="absolute inset-0 blur-sm bg-brand/40 rounded-full scale-75" />
            </div>
            <span className="font-bebas text-2xl tracking-wider text-white">
              Roast<span className="text-brand">My</span>Resume
              <span className="text-white/50">.ai</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/roast"
              className="px-4 py-2 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-colors shadow-brand-sm"
            >
              Roast My Resume →
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-dark-border bg-dark-card"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              <Link
                href="/"
                className="text-white/70 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/pricing"
                className="text-white/70 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/roast"
                className="px-4 py-2 bg-brand text-white text-sm font-semibold rounded-lg text-center"
                onClick={() => setMobileOpen(false)}
              >
                Roast My Resume →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
