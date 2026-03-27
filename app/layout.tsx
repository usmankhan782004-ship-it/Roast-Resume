import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RoastMyResume.ai — Brutally Honest AI Resume Feedback",
  description:
    "Upload your resume and get brutally honest AI feedback in 30 seconds. ATS score, roast, and actionable fixes powered by Gemini 1.5 Flash.",
  keywords: ["resume review", "AI resume", "ATS score", "resume feedback", "job search"],
  openGraph: {
    title: "RoastMyResume.ai",
    description: "Your resume sucks. Let's prove it.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="bg-dark text-white font-dm antialiased min-h-screen">
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
