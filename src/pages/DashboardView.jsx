import { PlusIcon, XIcon, FileText, Sparkles } from "lucide-react";
import { useState } from "react";

const DashboardView = () => {
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [title, setTitle] = useState("");

  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    console.log(title);

    setShowCreateResume(false);
    setTitle("");
  };

  const openShowCreateResume = () => {
    setShowCreateResume(true);
  };

  const closeShowCreateResume = () => {
    setShowCreateResume(false);
    setTitle("");
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-slate-50 transition-colors dark:from-slate-950 dark:via-slate-950 dark:to-[#120b24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {/* Header */}
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

          {/* Resume Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {/* Create Resume */}
            <button
              onClick={openShowCreateResume}
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

            {/* Empty State */}
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
          </section>
        </div>
      </main>

      {/* Dialog */}
      {showCreateResume && (
        <div
          onClick={closeShowCreateResume}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
        >
          <form
            onSubmit={handleCreateResume}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl border border-violet-100 bg-white p-6 shadow-2xl shadow-violet-950/20 dark:border-slate-800 dark:bg-slate-900"
          >
            <button
              type="button"
              onClick={closeShowCreateResume}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition hover:bg-violet-50 hover:text-[#764de1] dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-violet-300"
            >
              <XIcon size={20} />
            </button>

            <div className="mb-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#764de1] text-white shadow-lg shadow-violet-300/50 dark:shadow-violet-950/50">
                <FileText size={26} />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Create Resume
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Give your resume a clear title so it is easier to manage later.
              </p>
            </div>

            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Resume Title
            </label>

            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Example: Frontend Developer Resume"
              value={title}
              autoFocus
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#764de1] focus:bg-white focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#764de1] dark:focus:bg-slate-900 dark:focus:ring-violet-950/50"
            />

            <button
              type="submit"
              disabled={!title.trim()}
              className="mt-5 w-full rounded-2xl bg-[#764de1] px-5 py-3 font-medium text-white shadow-lg shadow-violet-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6842cd] active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none disabled:hover:translate-y-0 dark:shadow-violet-950/50 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
            >
              Create Resume
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default DashboardView;
