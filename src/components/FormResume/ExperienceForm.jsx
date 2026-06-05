import { useState } from "react";
import {
  Plus,
  BriefcaseBusiness,
  Trash2,
  Building2,
  Calendar,
  FileText,
  Sparkles,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";

const ExperienceForm = ({ data, onChange }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#764de1] focus:bg-white focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#764de1] dark:focus:bg-slate-900 dark:focus:ring-violet-950/50";

  const labelClass =
    "mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300";

  const iconClass = "size-4 text-[#764de1] dark:text-violet-300";

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    };

    onChange([...data, newExperience]);
    setOpenIndex(data.length);
  };

  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index));

    if (openIndex === index) {
      setOpenIndex(0);
    }
  };

  const updateChangeExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };

    if (field === "isCurrent" && value) {
      updated[index].endDate = "";
    }

    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-medium text-[#764de1] dark:border-violet-900/50 dark:bg-violet-950/30 dark:text-violet-300">
            <Sparkles size={14} />
            Work History
          </div>

          <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Experience
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Add your professional experience, roles, responsibilities, and
            achievements.
          </p>
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#764de1] px-4 py-3 text-sm font-medium text-white shadow-lg shadow-violet-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6842cd] active:scale-95 dark:shadow-violet-950/50"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-violet-200 bg-violet-50/40 p-8 text-center dark:border-slate-700 dark:bg-slate-800/40">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-[#764de1] shadow-sm dark:bg-slate-900 dark:text-violet-300">
            <BriefcaseBusiness className="size-8" />
          </div>

          <h4 className="font-semibold text-slate-800 dark:text-slate-100">
            No work experience added yet
          </h4>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Click “Add Experience” to include your work history.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((experience, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-violet-100 bg-white/80 shadow-sm transition-all duration-300 hover:border-[#764de1] dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-violet-700"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-[#764de1] dark:bg-violet-950/30 dark:text-violet-300">
                      <BriefcaseBusiness className="size-5" />
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        {experience.position || `Experience #${index + 1}`}
                      </h4>

                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        {experience.company || "Company details"}{" "}
                        {experience.isCurrent && "• Present"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeExperience(index);
                      }}
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100 hover:text-red-600 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50"
                    >
                      <Trash2 className="size-4" />
                    </button>

                    <ChevronDown
                      className={`size-5 text-slate-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-violet-100 p-5 dark:border-slate-800">
                      <div className="grid gap-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className={labelClass}>
                              <Building2 className={iconClass} />
                              Company Name
                            </label>
                            <input
                              type="text"
                              placeholder="Example: Google"
                              className={inputClass}
                              value={experience.company || ""}
                              onChange={(e) =>
                                updateChangeExperience(
                                  index,
                                  "company",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div>
                            <label className={labelClass}>
                              <BadgeCheck className={iconClass} />
                              Position
                            </label>
                            <input
                              type="text"
                              placeholder="Example: Frontend Developer"
                              className={inputClass}
                              value={experience.position || ""}
                              onChange={(e) =>
                                updateChangeExperience(
                                  index,
                                  "position",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className={labelClass}>
                              <Calendar className={iconClass} />
                              Start Date
                            </label>
                            <input
                              type="month"
                              className={inputClass}
                              value={experience.startDate || ""}
                              onChange={(e) =>
                                updateChangeExperience(
                                  index,
                                  "startDate",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div>
                            <label className={labelClass}>
                              <Calendar className={iconClass} />
                              End Date
                            </label>
                            <input
                              type="month"
                              disabled={experience.isCurrent}
                              className={inputClass}
                              value={experience.endDate || ""}
                              onChange={(e) =>
                                updateChangeExperience(
                                  index,
                                  "endDate",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <label className="flex w-fit cursor-pointer items-center gap-3 rounded-2xl border border-violet-100 bg-violet-50 px-4 py-3 text-sm text-slate-700 transition hover:bg-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                          <input
                            type="checkbox"
                            checked={experience.isCurrent || false}
                            onChange={(e) =>
                              updateChangeExperience(
                                index,
                                "isCurrent",
                                e.target.checked
                              )
                            }
                            className="h-4 w-4 accent-[#764de1]"
                          />
                          Currently working here
                        </label>

                        <div>
                          <label className={labelClass}>
                            <FileText className={iconClass} />
                            Description
                          </label>
                          <textarea
                            value={experience.description || ""}
                            onChange={(e) =>
                              updateChangeExperience(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            rows={7}
                            className={`${inputClass} resize-none leading-6`}
                            placeholder="Describe your responsibilities, achievements, tools used, and measurable impact..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
