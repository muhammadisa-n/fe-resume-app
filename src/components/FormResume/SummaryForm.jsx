import { FileText, Sparkles } from "lucide-react";

function SummaryForm({ data, onChange }) {
  const currentLength = data?.length || 0;
  const maxLength = 700;

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-medium text-[#764de1] dark:border-violet-900/50 dark:bg-violet-950/30 dark:text-violet-300">
          <Sparkles size={14} />
          Professional Summary
        </div>

        <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Summary
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Write a short, impactful overview of your experience, strengths, and
          career goals.
        </p>
      </div>

      <div className="rounded-3xl border border-violet-100 bg-violet-50/40 p-4 dark:border-slate-800 dark:bg-slate-800/40">
        <div className="mb-3 flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <FileText className="size-4 text-[#764de1] dark:text-violet-300" />
            Resume Summary
          </label>

          <span
            className={`text-xs ${
              currentLength > maxLength
                ? "text-red-500"
                : "text-slate-400 dark:text-slate-500"
            }`}
          >
            {currentLength}/{maxLength}
          </span>
        </div>

        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={8}
          maxLength={maxLength + 100}
          className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#764de1] focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#764de1] dark:focus:ring-violet-950/50"
          placeholder="Example: Frontend Developer with experience building responsive web applications using React, Tailwind CSS, and REST APIs..."
        />

        <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
          Tip: Keep it concise. Focus on your role, strongest skills, and the
          value you bring.
        </p>
      </div>
    </div>
  );
}

export default SummaryForm;
