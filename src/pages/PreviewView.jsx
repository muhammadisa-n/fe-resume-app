import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  Download,
  FileX2,
  Share2,
  Sparkles,
  Copy,
} from "lucide-react";
import { toast } from "sonner";

import ResumePreview from "../components/ResumePreview";
import api from "../config/axios";

const PreviewView = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const getResumeData = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/resume/public/${resumeId}`, {
          signal: controller.signal,
        });

        setResumeData(response.data.resume);
      } catch (error) {
        if (error.name === "CanceledError" || error.name === "AbortError") {
          return;
        }

        setResumeData(null);
      } finally {
        setLoading(false);
      }
    };

    getResumeData();

    return () => controller.abort();
  }, [resumeId]);

  const handleDownloadOrPrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const resumeUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: resumeData?.title || "Resume",
          text: resumeData?.title || "View my resume",
          url: resumeUrl,
        });
      } else {
        await navigator.clipboard.writeText(resumeUrl);
        toast.success("Link resume berhasil disalin.");
      }
    } catch {
      toast.error("Gagal membagikan resume.");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-slate-50 px-4 transition-colors dark:from-slate-950 dark:via-slate-950 dark:to-[#120b24]">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="h-20 w-20 animate-spin rounded-full border-4 border-violet-200 border-t-[#764de1] dark:border-slate-800 dark:border-t-violet-400" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#764de1] text-white shadow-lg shadow-violet-300/50 dark:shadow-violet-950/50">
                <Sparkles size={22} className="animate-pulse" />
              </div>
            </div>
          </div>

          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Loading resume...
          </h1>

          <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Please wait while we prepare the public resume preview.
          </p>
        </div>
      </main>
    );
  }

  if (!resumeData) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-slate-50 px-4 transition-colors dark:from-slate-950 dark:via-slate-950 dark:to-[#120b24]">
        <div className="w-full max-w-md rounded-3xl border border-violet-100 bg-white/90 p-8 text-center shadow-xl shadow-violet-100/50 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-violet-950/20">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-50 text-[#764de1] dark:bg-violet-950/30 dark:text-violet-300">
            <FileX2 size={38} />
          </div>

          <h1 className="text-5xl font-bold text-[#764de1]">404</h1>

          <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
            Resume Not Found
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            This resume may be private, deleted, or the public link is no longer
            available.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#764de1] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-violet-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6842cd] active:scale-95 dark:shadow-violet-950/50"
          >
            <ArrowLeft size={16} />
            Return Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-slate-50 transition-colors dark:from-slate-950 dark:via-slate-950 dark:to-[#120b24]">
      {/* Public Top Bar */}
      <div className="sticky top-0 z-50 border-b border-violet-100 bg-white/80 backdrop-blur-xl shadow-sm dark:border-slate-800 dark:bg-slate-950/80 print:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#764de1] text-white shadow-lg shadow-violet-300/50 transition-all duration-300 group-hover:scale-105 dark:shadow-violet-950/50">
              <Sparkles size={18} />
            </div>

            <div className="hidden sm:block">
              <h1 className="font-bold text-slate-900 dark:text-slate-100">
                Resume Builder
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Public resume preview
              </p>
            </div>
          </Link>

          <div className="min-w-0 flex-1 px-2 text-center max-md:hidden">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
              {resumeData.title || "Untitled Resume"}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Shared resume
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-600 transition hover:-translate-y-0.5 hover:bg-blue-100 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-300 dark:hover:bg-blue-950/50"
            >
              {navigator.share ? <Share2 size={16} /> : <Copy size={16} />}
              <span className="hidden sm:inline">
                {navigator.share ? "Share" : "Copy Link"}
              </span>
            </button>

            <button
              type="button"
              onClick={handleDownloadOrPrint}
              className="inline-flex items-center gap-2 rounded-2xl border border-violet-100 bg-violet-50 px-4 py-2.5 text-sm font-medium text-[#764de1] transition hover:-translate-y-0.5 hover:bg-violet-100 dark:border-violet-900/50 dark:bg-violet-950/30 dark:text-violet-300 dark:hover:bg-violet-950/50"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 print:max-w-none print:p-0">
        <ResumePreview
          data={resumeData}
          accentColor={resumeData.accentColor}
          template={resumeData.template}
        />
      </div>
    </main>
  );
};

export default PreviewView;
