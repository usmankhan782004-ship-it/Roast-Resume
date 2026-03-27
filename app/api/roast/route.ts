import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/gemini";
import { supabaseAdmin } from "@/lib/supabase";
import { cacheRoast } from "@/lib/cache";
import { v4 as uuidv4 } from "uuid";

export interface RoastResult {
  score: number;
  roast: string;
  problems: string[];
  tags: { bad: string[]; ok: string[] };
  fixes: { section: string; suggestion: string }[];
  ats_score: number;
  verdict: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeText } = body;

    if (!resumeText || typeof resumeText !== "string") {
      return NextResponse.json({ error: "resumeText is required" }, { status: 400 });
    }

    if (resumeText.trim().length < 50) {
      return NextResponse.json({ error: "Resume text too short" }, { status: 400 });
    }

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are RoastGPT — brutally honest, witty, genuinely helpful resume critic. Always respond in valid JSON only."
        },
        {
          role: "user",
          content: `Analyze this resume and return ONLY this JSON structure, no markdown:
{
  "score": <0-100>,
  "roast": "<2-3 sentence brutal funny roast>",
  "problems": ["<problem 1>", "<problem 2>", "<problem 3>"],
  "tags": { "bad": ["<tag>", "<tag>"], "ok": ["<tag>"] },
  "fixes": [
    { "section": "<name>", "suggestion": "<rewrite>" },
    { "section": "<name>", "suggestion": "<rewrite>" },
    { "section": "<name>", "suggestion": "<rewrite>" },
    { "section": "<name>", "suggestion": "<rewrite>" }
  ],
  "ats_score": <0-100>,
  "verdict": "<one punchy line>"
}

Resume:
${resumeText.slice(0, 12000)}`
        }
      ],
    });

    const text = response.choices[0].message.content || "";
    let roastData: RoastResult;
    try {
      const clean = text.replace(/```json|```/g, "").trim();
      roastData = JSON.parse(clean);
    } catch {
      console.error("Failed to parse Grok response:", text);
      return NextResponse.json({ error: "Invalid AI response" }, { status: 500 });
    }

    // Validate required fields
    if (
      typeof roastData.score !== "number" ||
      typeof roastData.roast !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid AI response format. Please try again." },
        { status: 500 }
      );
    }

    // Generate unique share token
    const shareToken = uuidv4().replace(/-/g, "").slice(0, 12);

    // Store in Supabase
    const { data: dbRow, error: dbError } = await supabaseAdmin
      .from("roasts")
      .insert({
        resume_text: resumeText.slice(0, 10000),
        score: roastData.score,
        roast_text: roastData.roast,
        problems: roastData.problems,
        fixes: roastData.fixes,
        tags: roastData.tags,
        ats_score: roastData.ats_score,
        verdict: roastData.verdict,
        is_paid: false,
        share_token: shareToken,
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      // Store in in-memory cache as fallback so result page still works
      const fallbackPayload = {
        id: shareToken,
        resume_text: resumeText.slice(0, 10000),
        score: roastData.score,
        roast_text: roastData.roast,
        problems: roastData.problems,
        fixes: roastData.fixes,
        tags: roastData.tags,
        ats_score: roastData.ats_score,
        verdict: roastData.verdict,
        is_paid: false,
        share_token: shareToken,
        created_at: new Date().toISOString(),
      };
      cacheRoast(shareToken, fallbackPayload);
      return NextResponse.json({
        id: shareToken,
        ...roastData,
        is_paid: false,
        share_token: shareToken,
      });
    }

    // Also cache in memory for fast retrieval
    const successPayload = {
      id: dbRow.id,
      resume_text: resumeText.slice(0, 10000),
      score: roastData.score,
      roast_text: roastData.roast,
      problems: roastData.problems,
      fixes: roastData.fixes,
      tags: roastData.tags,
      ats_score: roastData.ats_score,
      verdict: roastData.verdict,
      is_paid: false,
      share_token: shareToken,
      created_at: new Date().toISOString(),
    };
    cacheRoast(dbRow.id, successPayload);
    cacheRoast(shareToken, successPayload);

    return NextResponse.json({
      id: dbRow.id,
      ...roastData,
      is_paid: false,
      share_token: shareToken,
    });
  } catch (error: any) {
    console.error("Roast API Full Error:", error);
    // Surface rate limit errors clearly
    const errMsg = error?.message || String(error);
    const is429 = errMsg.includes("429") || errMsg.toLowerCase().includes("too many requests") || errMsg.toLowerCase().includes("quota");
    
    if (is429) {
      return NextResponse.json(
        { error: "AI rate limit strictly reached — please wait 65+ seconds and try again." },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error. Please try again or use Demo mode if this persists." },
      { status: 500 }
    );
  }
}
