import { useState } from "react";
import { Plus, X, Sparkles, BadgeCheck } from "lucide-react";

const SkillForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    const skill = newSkill.trim();

    if (skill && !data.includes(skill)) {
      onChange([...data, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-medium text-[#764de1] dark:border-violet-900/50 dark:bg-violet-950/30 dark:text-violet-300">
          <Sparkles size={14} />
          Skill Set
        </div>

        <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Skills
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Add technical skills, tools, frameworks, and strengths relevant to
          your target role.
        </p>
      </div>

      <div className="rounded-3xl border border-violet-100 bg-violet-50/40 p-4 dark:border-slate-800 dark:bg-slate-800/40">
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <BadgeCheck className="size-4 text-[#764de1] dark:text-violet-300" />
          Add Skill
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Example: JavaScript, React, Tailwind CSS"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#764de1] focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#764de1] dark:focus:ring-violet-950/50"
            onChange={(e) => setNewSkill(e.target.value)}
            value={newSkill}
            onKeyDown={handleKeyPress}
          />

          <button
            type="button"
            onClick={addSkill}
            disabled={!newSkill.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#764de1] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-violet-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6842cd] active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none dark:shadow-violet-950/50 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
          >
            <Plus className="size-4" />
            Add
          </button>
        </div>
      </div>

      {data.length > 0 ? (
        <div className="rounded-3xl border border-violet-100 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">
              Added Skills
            </h4>

            <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-[#764de1] dark:bg-violet-950/30 dark:text-violet-300">
              {data.length} skills
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.map((skill, index) => (
              <span
                key={index}
                className="group inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-sm font-medium text-[#764de1] transition hover:border-[#764de1] hover:bg-violet-100 dark:border-violet-900/50 dark:bg-violet-950/30 dark:text-violet-300 dark:hover:bg-violet-950/50"
              >
                {skill}

                <button
                  onClick={() => removeSkill(index)}
                  className="rounded-full p-0.5 text-violet-400 transition hover:bg-violet-200 hover:text-red-500 dark:text-violet-300 dark:hover:bg-violet-900"
                  type="button"
                >
                  <X className="size-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-violet-200 bg-violet-50/40 p-8 text-center dark:border-slate-700 dark:bg-slate-800/40">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-[#764de1] shadow-sm dark:bg-slate-900 dark:text-violet-300">
            <BadgeCheck className="size-8" />
          </div>

          <h4 className="font-semibold text-slate-800 dark:text-slate-100">
            No skills added yet
          </h4>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Add skills that match your target job or industry.
          </p>
        </div>
      )}
    </div>
  );
};

export default SkillForm;
