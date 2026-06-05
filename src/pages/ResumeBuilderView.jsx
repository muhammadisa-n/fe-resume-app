import { useParams, Link } from "react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import api from "../config/axios";
import {
  ArrowLeftIcon,
  ChevronLeft,
  ChevronRight,
  SaveIcon,
  ShareIcon,
  DownloadIcon,
  Loader2,
  User,
  FileText,
  BriefcaseBusiness,
  GraduationCap,
  Workflow,
  Sparkles,
  Settings,
  CheckCircle2,
} from "lucide-react";

import PersonalInfoForm from "../components/FormResume/PersonalInfoForm";
import SummaryForm from "../components/FormResume/SummaryForm";
import ExperienceForm from "../components/FormResume/ExperienceForm";
import EducationForm from "../components/FormResume/EducationForm";
import ProjectForm from "../components/FormResume/ProjectForm";
import SkillForm from "../components/FormResume/SkillForm";
import SettingForm from "../components/FormResume/SettingForm";
import ResumePreview from "../components/ResumePreview";

const ResumeBuilderView = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    summary: "",
    template: "classic",
    accentColor: "darkblue",
    language: "en",
    education: [],
    experience: [],
    personalInfo: {},
    project: [],
    public: false,
    skills: [],
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("saved");

  const initialLoadRef = useRef(true);
  const lastSavedSnapshotRef = useRef("");

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: BriefcaseBusiness },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: Workflow },
    { id: "skills", name: "Skills", icon: Sparkles },
    { id: "setting", name: "Setting", icon: Settings },
  ];

  const activeSection = sections[activeSectionIndex];
  const progress = ((activeSectionIndex + 1) * 100) / sections.length;

  const getSnapshot = (data) => {
    const cloned = structuredClone({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        image:
          typeof data.personalInfo?.image === "object"
            ? {
                name: data.personalInfo.image?.name,
                size: data.personalInfo.image?.size,
                lastModified: data.personalInfo.image?.lastModified,
              }
            : data.personalInfo?.image,
      },
    });

    return JSON.stringify({
      data: cloned,
      removeBackground,
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const getResumeDataById = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/resume/${resumeId}`, {
          signal: controller.signal,
        });

        const resume = response.data.resume;

        setResumeData(resume);
        lastSavedSnapshotRef.current = getSnapshot(resume);
      } catch (error) {
        if (error.name === "CanceledError" || error.name === "AbortError") {
          return;
        }

        toast.error(
          error?.response?.data?.message || "Gagal mengambil data resume."
        );
      } finally {
        setLoading(false);
        setTimeout(() => {
          initialLoadRef.current = false;
        }, 300);
      }
    };

    getResumeDataById();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeId]);

  const saveResume = useCallback(
    async (showToast = false) => {
      const currentSnapshot = getSnapshot(resumeData);

      if (currentSnapshot === lastSavedSnapshotRef.current) {
        return;
      }

      try {
        setSaving(true);
        setSaveStatus("saving");

        const formData = new FormData();
        formData.append("resumeData", JSON.stringify(resumeData));

        if (removeBackground) {
          formData.append("removeBackground", "yes");
        }

        if (typeof resumeData.personalInfo?.image === "object") {
          formData.append("image", resumeData.personalInfo.image);
        }

        const response = await api.put(`/resume/${resumeId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const updatedResume = response.data.resume;

        setResumeData(updatedResume);
        lastSavedSnapshotRef.current = getSnapshot(updatedResume);
        setSaveStatus("saved");

        if (showToast) {
          toast.success("Resume berhasil disimpan.");
        }
      } catch (error) {
        setSaveStatus("error");
        toast.error(
          error?.response?.data?.message || "Gagal menyimpan resume."
        );
      } finally {
        setSaving(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resumeData, removeBackground, resumeId]
  );

  useEffect(() => {
    if (loading || initialLoadRef.current || !resumeData?._id) return;

    const currentSnapshot = getSnapshot(resumeData);

    if (currentSnapshot === lastSavedSnapshotRef.current) return;

    setSaveStatus("pending");

    const timeout = setTimeout(() => {
      saveResume(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [resumeData, removeBackground, loading, saveResume]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    await saveResume(true);
  };

  const handleShare = async () => {
    const baseUrl = window.location.href.split("/app/")[0];
    const resumeUrl = `${baseUrl}/view/${resumeId}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: resumeData.title,
          text: resumeData.title,
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

  const handleDownloadOrPrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-[#120b24]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-20 w-20 animate-spin rounded-full border-4 border-violet-200 border-t-[#764de1] dark:border-slate-800 dark:border-t-violet-400" />
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText className="text-[#764de1] dark:text-violet-300" />
            </div>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Loading resume builder...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-slate-50 transition-colors dark:from-slate-950 dark:via-slate-950 dark:to-[#120b24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 print:hidden">
        <Link
          to="/app"
          className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-[#764de1] hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-violet-300"
        >
          <ArrowLeftIcon className="size-4" />
          Back To Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="mb-6 print:hidden">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 w-fit rounded-full border border-violet-100 bg-white px-4 py-2 text-sm text-[#764de1] shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-violet-300">
              <Sparkles size={16} />
              Resume Builder
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  {resumeData.title || "Untitled Resume"}
                </h1>
                <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">
                  Complete each section and preview your resume in real time.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-violet-100 bg-white px-4 py-2.5 text-sm font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                  {saving || saveStatus === "pending" ? (
                    <>
                      <Loader2 className="size-4 animate-spin text-[#764de1]" />
                      {saveStatus === "pending" ? "Waiting..." : "Saving..."}
                    </>
                  ) : saveStatus === "error" ? (
                    <>
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      Not saved
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="size-4 text-emerald-500" />
                      Saved
                    </>
                  )}
                </div>

                {resumeData.public && (
                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-600 transition hover:-translate-y-0.5 hover:bg-blue-100 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-300 dark:hover:bg-blue-950/50"
                  >
                    <ShareIcon className="size-4" />
                    Share
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleDownloadOrPrint}
                  className="inline-flex items-center gap-2 rounded-2xl border border-violet-100 bg-violet-50 px-4 py-2.5 text-sm font-medium text-[#764de1] transition hover:-translate-y-0.5 hover:bg-violet-100 dark:border-violet-900/50 dark:bg-violet-950/30 dark:text-violet-300 dark:hover:bg-violet-950/50"
                >
                  <DownloadIcon className="size-4" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid xl:grid-cols-2 gap-6 lg:gap-8">
          <section className="print:hidden">
            <div className="overflow-hidden rounded-3xl border border-violet-100 bg-white/90 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
              <div className="border-b border-violet-100 p-5 dark:border-slate-800">
                <div className="mb-5">
                  <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-violet-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-[#764de1] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2">
                  {sections.map((section, index) => {
                    const Icon = section.icon;
                    const isActive = activeSectionIndex === index;

                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => setActiveSectionIndex(index)}
                        className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition-all ${
                          isActive
                            ? "bg-[#764de1] text-white shadow-lg shadow-violet-300/40 dark:shadow-violet-950/50"
                            : "border border-violet-100 bg-violet-50 text-slate-600 hover:bg-violet-100 hover:text-[#764de1] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-violet-300"
                        }`}
                      >
                        <Icon className="size-4" />
                        {section.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleSubmitForm}>
                <div className="border-b border-violet-100 p-5 dark:border-slate-800">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-[#764de1] dark:text-violet-300">
                        Section {activeSectionIndex + 1} of {sections.length}
                      </p>

                      <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">
                        {activeSection.name}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                        }
                        disabled={activeSectionIndex === 0}
                        className="inline-flex items-center gap-1 rounded-xl border border-violet-100 bg-violet-50 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                      >
                        <ChevronLeft className="size-4" />
                        Prev
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setActiveSectionIndex((prev) =>
                            Math.min(prev + 1, sections.length - 1)
                          )
                        }
                        disabled={activeSectionIndex === sections.length - 1}
                        className="inline-flex items-center gap-1 rounded-xl border border-violet-100 bg-violet-50 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                      >
                        Next
                        <ChevronRight className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  {activeSection.id === "personal" && (
                    <PersonalInfoForm
                      data={resumeData.personalInfo}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personalInfo: data,
                        }))
                      }
                      removeBackground={removeBackground}
                      setRemoveBackground={setRemoveBackground}
                    />
                  )}

                  {activeSection.id === "summary" && (
                    <SummaryForm
                      data={resumeData.summary}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          summary: data,
                        }))
                      }
                    />
                  )}

                  {activeSection.id === "experience" && (
                    <ExperienceForm
                      data={resumeData.experience}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          experience: data,
                        }))
                      }
                    />
                  )}

                  {activeSection.id === "education" && (
                    <EducationForm
                      data={resumeData.education}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          education: data,
                        }))
                      }
                    />
                  )}

                  {activeSection.id === "projects" && (
                    <ProjectForm
                      data={resumeData.project}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          project: data,
                        }))
                      }
                    />
                  )}

                  {activeSection.id === "skills" && (
                    <SkillForm
                      data={resumeData.skills}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          skills: data,
                        }))
                      }
                    />
                  )}

                  {activeSection.id === "setting" && (
                    <SettingForm
                      data={resumeData}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          title: data.title,
                          template: data.template,
                          public: data.public,
                          accentColor: data.accentColor,
                          language: data.language,
                        }))
                      }
                    />
                  )}

                  <button
                    type="submit"
                    disabled={saving}
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#764de1] px-5 py-3 font-medium text-white shadow-lg shadow-violet-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6842cd] active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none dark:shadow-violet-950/50 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
                  >
                    {saving ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      <SaveIcon className="size-5" />
                    )}
                    {saving ? "Saving..." : "Save Resume"}
                  </button>
                </div>
              </form>
            </div>
          </section>

          <section>
            <div className="sticky top-24">
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accentColor}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ResumeBuilderView;
