import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { getCachedRoast } from "@/lib/cache";
import ResultClient from "./ResultClient";

const DEMO_RESULT = {
  id: "demo",
  score: 23,
  roast_text:
    "Congratulations — you've created a resume that perfectly blends into the rejection pile. Your summary says you're 'a passionate developer who loves solving problems,' which is exactly what 2.3 million other applicants wrote this week. Your skills section lists Microsoft Office in 2026. Bold choice.",
  problems: [
    "No measurable achievements — zero numbers or metrics anywhere",
    "Generic summary that could belong to literally anyone",
    "ATS will reject this before a human ever sees it",
  ],
  fixes: [
    { section: "Summary", suggestion: "Replace with: 'Software engineer with 5+ years building Node.js APIs serving 10M+ requests/day at [Company]'" },
    { section: "Experience", suggestion: "Add metrics to every bullet: 'Reduced load time by 40%' not 'Improved performance'" },
    { section: "Skills", suggestion: "Remove Microsoft Office. Add: Docker, AWS, CI/CD, your actual tech stack" },
    { section: "Projects", suggestion: "Include one real project with impact, scope, and measurable outcomes" },
  ],
  tags: { bad: ["ATS: Failed", "No metrics", "Generic summary"], ok: ["Good length", "Clean structure"] },
  ats_score: 31,
  verdict: "This resume would get you ghosted by a startup run by interns.",
  is_paid: false,
  share_token: "demo",
};

interface PageProps {
  params: { id: string };
}

export default async function ResultPage({ params }: PageProps) {
  const { id } = params;

  if (id === "demo") {
    return <ResultClient roast={DEMO_RESULT} />;
  }

  // 1. Check in-memory cache first (fast, works without Supabase table)
  const cached = getCachedRoast(id);
  if (cached) {
    return <ResultClient roast={cached} />;
  }

  // 2. Try Supabase by UUID
  let roast = null;
  const isUuid = /^[0-9a-f-]{36}$/.test(id);

  if (isUuid) {
    const { data } = await supabaseAdmin
      .from("roasts")
      .select("*")
      .eq("id", id)
      .single();
    roast = data;
  }

  // 3. Fallback: try share_token
  if (!roast) {
    const { data } = await supabaseAdmin
      .from("roasts")
      .select("*")
      .eq("share_token", id)
      .single();
    roast = data;
  }

  if (!roast) {
    notFound();
  }

  return <ResultClient roast={roast} />;
}
