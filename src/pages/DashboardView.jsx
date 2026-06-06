import {
  PlusIcon,
  XIcon,
  FileText,
  Sparkles,
  Pencil,
  Trash2,
  Loader2,
  Calendar,
  Check,
  Palette,
  LayoutTemplate,
  Languages,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import api from "../config/axios";
import { useNavigate } from "react-router";

const DashboardView = () => {
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    template: "classic",
    accentColor: "#000000",
    language: "",
  });

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  const templates = [
    {
      value: "classic",
      label: "Classic",
      description: "Clean and ATS-friendly layout.",
    },
    {
      value: "modern",
      label: "Modern",
      description: "Stylish and modern visual layout.",
    },
  ];

  const colors = [
    "#000000",
    "#374151",
    "#1e3a8a",
    "#2563eb",
    "#764de1",
    "#16a34a",
    "#dc2626",
    "#ea580c",
  ];

  const languages = [
    {
      value: "en",
      label: "English",
      description: "Use English labels in resume template.",
    },
    {
      value: "id",
      label: "Indonesia",
      description: "Gunakan label Bahasa Indonesia di template.",
    },
  ];

  useEffect(() => {
    const controller = new AbortController();

    const fetchResumes = async () => {
      try {
        setLoading(true);

        const { data } = await api.get("/resume", {
          signal: controller.signal,
        });

        setResumes(data.resume || []);
      } catch (error) {
        if (error.name === "CanceledError" || error.name === "AbortError")
          return;

        toast.error(
          error?.response?.data?.message || "Gagal mengambil resume."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();

    return () => controller.abort();
  }, []);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetCreateForm = () => {
    setStep(1);
    setFormData({
      title: "",
      template: "classic",
      accentColor: "#000000",
      language: "",
    });
  };

  const closeShowCreateResume = () => {
    if (creating) return;
    setShowCreateResume(false);
    resetCreateForm();
  };

  const handleCreateResume = async () => {
    if (!formData.title.trim()) {
      toast.error("Resume title wajib diisi.");
      return;
    }

    if (!formData.language) {
      toast.error("Pilih bahasa resume terlebih dahulu.");
      return;
    }

    try {
      setCreating(true);

      const { data } = await api.post("/resume", {
        title: formData.title.trim(),
        template: formData.template,
        accentColor: formData.accentColor,
        language: formData.language,
      });

      toast.success(data?.message || "Create Resume Berhasil");

      if (data?.resume) {
        setResumes((prev) => [data.resume, ...prev]);
      }

      setShowCreateResume(false);
      resetCreateForm();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Terjadi kesalahan.");
    } finally {
      setCreating(false);
    }
  };

  const handleNextStep = () => {
    if (step === 1 && !formData.title.trim()) {
      toast.error("Resume title wajib diisi.");
      return;
    }

    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleDeleteResume = async (resumeId) => {
    const result = await Swal.fire({
      title: "Delete Resume?",
      text: "Resume yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#764de1",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
      background: document.documentElement.classList.contains("dark")
        ? "#0f172a"
        : "#ffffff",
      color: document.documentElement.classList.contains("dark")
        ? "#f8fafc"
        : "#0f172a",
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(resumeId);
      await api.delete(`/resume/${resumeId}`);
      setResumes((prev) => prev.filter((resume) => resume._id !== resumeId));
      toast.success("Resume berhasil dihapus.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Gagal menghapus resume.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getLanguageLabel = (language) => {
    return language === "id" ? "Indonesia" : "English";
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-slate-50 transition-colors dark:from-slate-950 dark:via-slate-950 dark:to-[#120b24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <section className="mb-8 sm:mb-10">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 w-fit rounded-full border border-violet-100 bg-white px-4 py-2 text-sm text-[#764de1] shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-violet-300">
                <Sparkles size={16} />
                Dashboard
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Create and manage your resumes
              </h1>

              <p className="max-w-2xl text-slate-500 dark:text-slate-400">
                Start a new resume, organize your drafts, and build a polished
                profile that is ready for your next opportunity.
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <button
              onClick={() => setShowCreateResume(true)}
              className="group relative min-h-56 overflow-hidden rounded-3xl border border-dashed border-violet-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#764de1] hover:shadow-xl hover:shadow-violet-200/60 active:scale-[0.98] dark:border-violet-900/50 dark:bg-slate-900/80 dark:hover:shadow-violet-950/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-transparent to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-violet-950/20 dark:to-slate-900" />

              <div className="relative z-10 flex h-full flex-col items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#764de1] text-white shadow-lg shadow-violet-300/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 dark:shadow-violet-950/50">
                  <PlusIcon size={28} />
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-[#764de1] dark:text-slate-100">
                    Create Resume
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Build a new resume from scratch using modern templates.
                  </p>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#764de1] dark:text-violet-300">
                  Get started
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </button>

            {loading &&
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="min-h-56 animate-pulse rounded-3xl border border-violet-100 bg-white/70 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
                >
                  <div className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-slate-800" />
                  <div className="mt-10 h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="mt-4 h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="mt-2 h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              ))}

            {!loading &&
              resumes.map((resume) => (
                <div
                  key={resume._id}
                  onClick={() => navigate(`/app/builder/${resume._id}`)}
                  className="group relative min-h-56 overflow-hidden rounded-3xl border border-violet-100 bg-white/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#764de1] hover:shadow-xl hover:shadow-violet-200/50 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-violet-700 dark:hover:shadow-violet-950/30 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-transparent to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-violet-950/20 dark:to-slate-900" />

                  <div className="absolute right-4 top-4 z-20 flex translate-y-2 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/app/builder/${resume._id}`);
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm transition hover:bg-violet-50 hover:text-[#764de1] dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-violet-300"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteResume(resume._id);
                      }}
                      disabled={deletingId === resume._id}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                    >
                      {deletingId === resume._id ? (
                        <Loader2 size={17} className="animate-spin" />
                      ) : (
                        <Trash2 size={17} />
                      )}
                    </button>
                  </div>

                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <div
                        className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-white transition-all duration-300 group-hover:scale-105"
                        style={{
                          backgroundColor: resume.accentColor || "#000000",
                        }}
                      >
                        <FileText size={27} />
                      </div>

                      <h3 className="line-clamp-2 pr-16 text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {resume.title}
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-[#764de1] dark:bg-violet-950/30 dark:text-violet-300">
                          {resume.template || "classic"}
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {getLanguageLabel(resume.language)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                      <Calendar size={14} />
                      Updated {formatDate(resume.updatedAt)}
                    </div>
                  </div>
                </div>
              ))}

            {!loading && resumes.length === 0 && (
              <div className="min-h-56 rounded-3xl border border-violet-100 bg-white/70 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-[#764de1] dark:bg-violet-950/30 dark:text-violet-300">
                    <FileText size={26} />
                  </div>

                  <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                    No resume yet
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Your created resumes will appear here after you make one.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {showCreateResume && (
        <div
          onClick={closeShowCreateResume}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl border border-violet-100 bg-white p-6 shadow-2xl shadow-violet-950/20 animate-in fade-in zoom-in-95 duration-200 dark:border-slate-800 dark:bg-slate-900"
          >
            <button
              type="button"
              disabled={creating}
              onClick={closeShowCreateResume}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition hover:bg-violet-50 hover:text-[#764de1] disabled:cursor-not-allowed dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-violet-300"
            >
              <XIcon size={20} />
            </button>

            <div className="mb-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#764de1] text-white shadow-lg shadow-violet-300/50 dark:shadow-violet-950/50">
                {creating ? (
                  <Loader2 size={26} className="animate-spin" />
                ) : (
                  <FileText size={26} />
                )}
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Create Resume
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Complete a few quick steps to set up your new resume.
              </p>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={`h-2 rounded-full transition ${
                    step >= item
                      ? "bg-[#764de1]"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                />
              ))}
            </div>

            {step === 1 && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Resume Title
                </label>

                <input
                  type="text"
                  onChange={(e) => updateFormData("title", e.target.value)}
                  placeholder="Example: Frontend Developer Resume"
                  value={formData.title}
                  autoFocus
                  disabled={creating}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#764de1] focus:bg-white focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#764de1] dark:focus:bg-slate-900 dark:focus:ring-violet-950/50"
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <LayoutTemplate size={16} className="text-[#764de1]" />
                    Choose Template
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {templates.map((template) => {
                      const isActive = formData.template === template.value;

                      return (
                        <button
                          key={template.value}
                          type="button"
                          onClick={() =>
                            updateFormData("template", template.value)
                          }
                          className={`rounded-3xl border p-4 text-left transition ${
                            isActive
                              ? "border-[#764de1] bg-violet-50 dark:border-violet-500 dark:bg-violet-950/30"
                              : "border-slate-200 bg-slate-50 hover:border-[#764de1] dark:border-slate-700 dark:bg-slate-800"
                          }`}
                        >
                          <div className="mb-3 flex items-center justify-between">
                            <LayoutTemplate
                              size={20}
                              className="text-[#764de1]"
                            />
                            {isActive && (
                              <div className="rounded-full bg-[#764de1] p-1 text-white">
                                <Check size={14} />
                              </div>
                            )}
                          </div>

                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                            {template.label}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                            {template.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <Palette size={16} className="text-[#764de1]" />
                    Choose Accent Color
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => updateFormData("accentColor", color)}
                        className={`relative h-10 w-10 rounded-2xl border-2 shadow-sm transition hover:scale-110 ${
                          formData.accentColor === color
                            ? "border-slate-900 ring-4 ring-violet-100 dark:border-white dark:ring-violet-950/50"
                            : "border-white ring-1 ring-slate-200 dark:border-slate-900 dark:ring-slate-700"
                        }`}
                        style={{ backgroundColor: color }}
                      >
                        {formData.accentColor === color && (
                          <span className="absolute inset-0 flex items-center justify-center text-white">
                            <Check size={17} />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Languages size={16} className="text-[#764de1]" />
                  Choose Language
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {languages.map((language) => {
                    const isActive = formData.language === language.value;

                    return (
                      <button
                        key={language.value}
                        type="button"
                        onClick={() =>
                          updateFormData("language", language.value)
                        }
                        className={`rounded-3xl border p-4 text-left transition ${
                          isActive
                            ? "border-[#764de1] bg-violet-50 dark:border-violet-500 dark:bg-violet-950/30"
                            : "border-slate-200 bg-slate-50 hover:border-[#764de1] dark:border-slate-700 dark:bg-slate-800"
                        }`}
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <Languages size={20} className="text-[#764de1]" />

                          {isActive && (
                            <div className="rounded-full bg-[#764de1] p-1 text-white">
                              <Check size={14} />
                            </div>
                          )}
                        </div>

                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          {language.label}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                          {language.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-7 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={step === 1 || creating}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <ChevronLeft size={16} />
                Back
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={creating}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#764de1] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-violet-300/40 transition hover:-translate-y-0.5 hover:bg-[#6842cd] active:scale-95 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCreateResume}
                  disabled={
                    !formData.title.trim() || !formData.language || creating
                  }
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#764de1] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-violet-300/40 transition hover:-translate-y-0.5 hover:bg-[#6842cd] active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none dark:shadow-violet-950/50 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
                >
                  {creating && <Loader2 size={18} className="animate-spin" />}
                  {creating ? "Creating..." : "Create Resume"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardView;
