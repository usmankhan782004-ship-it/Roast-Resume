"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type UploadState = "idle" | "dragging" | "uploading" | "parsing" | "roasting" | "error";

interface UploadZoneProps {
  onRoastComplete?: (id: string) => void;
  compact?: boolean;
}

export default function UploadZone({ onRoastComplete, compact = false }: UploadZoneProps) {
  const router = useRouter();
  const [state, setState] = useState<UploadState>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [progress, setProgress] = useState<string>("");

  const persistRoast = (payload: Record<string, unknown>) => {
    if (typeof window === "undefined") return;

    const roastId = typeof payload.id === "string" ? payload.id : "";
    const shareToken = typeof payload.share_token === "string" ? payload.share_token : "";

    if (!roastId && !shareToken) return;

    if (roastId) {
      window.localStorage.setItem(`roast:${roastId}`, JSON.stringify(payload));
    }

    if (shareToken && shareToken !== roastId) {
      window.localStorage.setItem(`roast:${shareToken}`, JSON.stringify(payload));
    }
  };

  const handleFile = useCallback((f: File) => {
    const allowed = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    const allowedExt = /\.(pdf|docx|doc)$/i;
    if (!allowed.includes(f.type) && !allowedExt.test(f.name)) {
      setError("Only PDF and DOCX files are supported.");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("File must be under 10MB.");
      return;
    }
    setFile(f);
    setError("");
    setState("idle");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setState("idle");
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  };

  const handleRoast = async () => {
    if (!file) return;
    setError("");

    try {
      // Step 1: Parse
      setState("parsing");
      setProgress("Extracting resume text...");

      const formData = new FormData();
      formData.append("file", file);

      const parseRes = await fetch("/api/parse", {
        method: "POST",
        body: formData,
      });

      const parseData = await parseRes.json();
      if (!parseRes.ok) throw new Error(parseData.error || "Failed to parse file");

      // Step 2: Roast
      setState("roasting");
      setProgress("Roasting with Gemini AI...");

      const roastRes = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: parseData.text }),
      });

      const roastData = await roastRes.json();
      if (!roastRes.ok) throw new Error(roastData.error || "Failed to generate roast");

      // Step 3: Redirect
      setProgress("Redirecting to your roast...");
      const id = roastData.id || roastData.share_token;
      persistRoast(roastData);
      if (onRoastComplete) {
        onRoastComplete(id);
      } else {
        router.push(`/result/${id}`);
      }
    } catch (err: unknown) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const isProcessing = ["uploading", "parsing", "roasting"].includes(state);

  const getStatusLabel = () => {
    if (state === "parsing") return "Parsing your resume...";
    if (state === "roasting") return "AI is roasting you...";
    return progress;
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.label
            key="dropzone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            htmlFor="resume-upload"
            onDragOver={(e) => { e.preventDefault(); setState("dragging"); }}
            onDragLeave={() => setState("idle")}
            onDrop={handleDrop}
            className={`
              relative flex flex-col items-center justify-center cursor-pointer
              border-2 border-dashed rounded-2xl transition-all duration-300
              ${compact ? "p-8 min-h-[180px]" : "p-12 min-h-[240px]"}
              ${state === "dragging"
                ? "border-brand bg-brand/10 scale-[1.01]"
                : "border-dark-border hover:border-brand/50 hover:bg-dark-muted/50 bg-dark-card"
              }
            `}
          >
            <div className="flex flex-col items-center gap-4 text-center pointer-events-none">
              <div className={`rounded-full p-4 ${state === "dragging" ? "bg-brand/20" : "bg-dark-muted"}`}>
                <Upload
                  className={`w-8 h-8 ${state === "dragging" ? "text-brand" : "text-white/40"}`}
                />
              </div>
              <div>
                <p className="text-white font-semibold text-lg">
                  {state === "dragging" ? "Drop it here!" : "Drop your resume here"}
                </p>
                <p className="text-white/40 text-sm mt-1">
                  PDF or DOCX · Max 10MB
                </p>
              </div>
              <div className="flex items-center gap-3 w-full max-w-xs">
                <div className="flex-1 h-px bg-dark-border" />
                <span className="text-white/30 text-xs">OR</span>
                <div className="flex-1 h-px bg-dark-border" />
              </div>
              <span className="px-5 py-2 bg-dark-muted border border-dark-border rounded-lg text-white/60 text-sm hover:text-white hover:border-brand/40 transition-colors">
                Browse files
              </span>
            </div>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.docx,.doc,application/pdf"
              className="sr-only"
              onChange={handleInputChange}
            />
          </motion.label>
        ) : (
          <motion.div
            key="file-preview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl border border-dark-border bg-dark-card p-6 flex flex-col gap-5"
          >
            {/* File info */}
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-brand/10 border border-brand/20 p-3">
                <FileText className="w-6 h-6 text-brand" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{file.name}</p>
                <p className="text-white/40 text-sm">
                  {(file.size / 1024).toFixed(0)} KB · Ready to roast
                </p>
              </div>
              <button
                onClick={() => { setFile(null); setState("idle"); setError(""); }}
                className="text-white/30 hover:text-white/70 transition-colors p-1"
                disabled={isProcessing}
              >
                <X size={18} />
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 rounded-lg px-4 py-3">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Processing status */}
            {isProcessing && (
              <div className="flex items-center gap-3 text-brand text-sm">
                <div className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin shrink-0" />
                <span>{getStatusLabel()}</span>
              </div>
            )}

            {/* CTA */}
            <button
              onClick={handleRoast}
              disabled={isProcessing}
              className={`
                relative w-full py-4 rounded-xl font-bebas text-xl tracking-widest
                transition-all duration-300
                ${isProcessing
                  ? "bg-brand/50 text-white/50 cursor-not-allowed"
                  : "bg-brand text-white hover:bg-brand-dark shadow-brand hover:shadow-brand hover:scale-[1.02] active:scale-[0.99]"
                }
              `}
            >
              {isProcessing ? "ROASTING..." : "ROAST MY RESUME →"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error state below */}
      {state === "error" && !file && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-red-400 text-sm text-center"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
