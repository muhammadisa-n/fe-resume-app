import { useState } from "react";
import {
  Plus,
  Workflow,
  Trash2,
  FolderKanban,
  Layers3,
  FileText,
  Sparkles,
  ChevronDown,
} from "lucide-react";

const ProjectForm = ({ data, onChange }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#764de1] focus:bg-white focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#764de1] dark:focus:bg-slate-900 dark:focus:ring-violet-950/50";

  const labelClass =
    "mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300";

  const iconClass = "size-4 text-[#764de1] dark:text-violet-300";

  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };

    onChange([...data, newProject]);
    setOpenIndex(data.length);
  };

  const removeProject = (index) => {
    onChange(data.filter((_, i) => i !== index));

    if (openIndex === index) {
      setOpenIndex(0);
    }
  };

  const updateChangeProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-medium text-[#764de1] dark:border-violet-900/50 dark:bg-violet-950/30 dark:text-violet-300">
            <Sparkles size={14} />
            Portfolio Work
          </div>

          <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Projects
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Showcase relevant projects, case studies, or portfolio work.
          </p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#764de1] px-4 py-3 text-sm font-medium text-white shadow-lg shadow-violet-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6842cd] active:scale-95 dark:shadow-violet-950/50"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-violet-200 bg-violet-50/40 p-8 text-center dark:border-slate-700 dark:bg-slate-800/40">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-[#764de1] shadow-sm dark:bg-slate-900 dark:text-violet-300">
            <Workflow className="size-8" />
          </div>

          <h4 className="font-semibold text-slate-800 dark:text-slate-100">
            No project added yet
          </h4>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Click “Add Project” to highlight your best work.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((project, index) => {
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
                      <FolderKanban className="size-5" />
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        {project.name || `Project #${index + 1}`}
                      </h4>

                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        {project.type || "Project type / technology"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeProject(index);
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
                              <FolderKanban className={iconClass} />
                              Project Name
                            </label>
                            <input
                              type="text"
                              placeholder="Example: Resume Builder App"
                              className={inputClass}
                              value={project.name || ""}
                              onChange={(e) =>
                                updateChangeProject(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div>
                            <label className={labelClass}>
                              <Layers3 className={iconClass} />
                              Type / Tech
                            </label>
                            <input
                              type="text"
                              placeholder="Example: React, Node.js, MongoDB"
                              className={inputClass}
                              value={project.type || ""}
                              onChange={(e) =>
                                updateChangeProject(
                                  index,
                                  "type",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <label className={labelClass}>
                            <FileText className={iconClass} />
                            Description
                          </label>
                          <textarea
                            value={project.description || ""}
                            onChange={(e) =>
                              updateChangeProject(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            rows={7}
                            className={`${inputClass} resize-none leading-6`}
                            placeholder="Describe what the project does, your role, tools used, and the impact or result..."
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

export default ProjectForm;
