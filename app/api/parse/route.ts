import { NextRequest, NextResponse } from "next/server";
import { parsePdf, parseDocx, countWords, estimatePageCount } from "@/lib/parser";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    const mimeType = file.type;

    if (!allowedTypes.includes(mimeType) && !file.name.match(/\.(pdf|docx|doc)$/i)) {
      return NextResponse.json(
        { error: "Only PDF and DOCX files are supported" },
        { status: 400 }
      );
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be under 10MB" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let text = "";

    const isPdf =
      mimeType === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    const isDocx =
      mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.toLowerCase().endsWith(".docx") ||
      file.name.toLowerCase().endsWith(".doc");

    if (isPdf) {
      text = await parsePdf(buffer);
    } else if (isDocx) {
      text = await parseDocx(buffer);
    } else {
      return NextResponse.json(
        { error: "Unsupported file format" },
        { status: 400 }
      );
    }

    if (!text || text.trim().length < 20) {
      return NextResponse.json(
        { error: "Could not extract text from file. Please ensure the file contains readable text." },
        { status: 422 }
      );
    }

    const wordCount = countWords(text);
    const pageCount = estimatePageCount(text);

    return NextResponse.json({
      text: text.trim(),
      wordCount,
      pageCount,
    });
  } catch (error) {
    console.error("Parse error:", error);
    return NextResponse.json(
      { error: "Failed to parse file. Please try a different file." },
      { status: 500 }
    );
  }
}
