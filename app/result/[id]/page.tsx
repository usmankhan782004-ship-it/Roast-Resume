import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { getCachedRoast } from "@/lib/cache";
import ResultClient from "./ResultClient";

interface PageProps {
  params: { id: string };
}

export default async function ResultPage({ params }: PageProps) {
  const { id } = params;

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
