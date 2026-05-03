import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { cacheRoast } from "@/lib/cache";

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

const DEMO_ROAST = {
  score: 23,
  roast: "Congratulations — you've created a resume that perfectly blends into the rejection pile. Your summary says you're 'a passionate developer who loves solving problems,' which is exactly what 2.3 million other applicants wrote this week. Your skills section lists Microsoft Office in 2026. Bold choice.",
  problems: [
    "No measurable achievements — zero numbers or metrics anywhere",
    "Generic summary that could belong to literally anyone",
    "ATS will reject this before a human ever sees it"
  ],
  tags: { 
    bad: ["ATS: Failed", "No metrics", "Generic summary"], 
    ok: ["Good length", "Clean structure"] 
  },
  fixes: [
    { section: "Summary", suggestion: "Replace with: 'Software engineer with 5+ years building Node.js APIs serving 10M+ requests/day at [Company]'" },
    { section: "Experience", suggestion: "Add metrics to every bullet: 'Reduced load time by 40%' not 'Improved performance'" },
    { section: "Skills", suggestion: "Remove Microsoft Office. Add: Docker, AWS, CI/CD, your actual tech stack" }
  ],
  ats_score: 31,
  verdict: "This resume would get you ghosted by a startup run by interns."
};

export async function POST() {
  try {
    const shareToken = "demo";
    
    // Map to DB structure
    const dbData = {
      resume_text: DEMO_RESUME_TEXT,
      score: DEMO_ROAST.score,
      roast_text: DEMO_ROAST.roast,
      problems: DEMO_ROAST.problems,
      fixes: DEMO_ROAST.fixes,
      tags: DEMO_ROAST.tags,
      ats_score: DEMO_ROAST.ats_score,
      verdict: DEMO_ROAST.verdict,
      is_paid: false,
      share_token: shareToken
    };

    // Store in Supabase
    const { data: dbRow, error: dbError } = await supabaseAdmin
      .from("roasts")
      .insert(dbData)
      .select("id")
      .single();

    const resultId = dbRow?.id || shareToken;

    // Always cache in memory for the demo fallback
    const payload = {
      id: resultId,
      ...dbData,
      created_at: new Date().toISOString()
    };
    
    cacheRoast(resultId, payload);
    cacheRoast(shareToken, payload);

    if (dbError) {
      console.error("Supabase demo insert error:", dbError);
    }

    return NextResponse.json({ id: resultId });
  } catch (error) {
    console.error("Demo API error:", error);
    return NextResponse.json({ error: "Failed to create demo roast" }, { status: 500 });
  }
}
