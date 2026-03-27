/**
 * Resume file parser utilities.
 * pdf-parse and mammoth are run server-side only.
 */

export async function parsePdf(buffer: Buffer): Promise<string> {
  // Dynamic import to avoid client-side bundling issues
  const pdfParse = (await import("pdf-parse")).default;
  const data = await pdfParse(buffer);
  return data.text;
}

export async function parseDocx(buffer: Buffer): Promise<string> {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

export function estimatePageCount(text: string): number {
  // ~500 words per page is a common rule of thumb
  const words = countWords(text);
  return Math.max(1, Math.round(words / 500));
}
