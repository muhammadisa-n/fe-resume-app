import {
  FileIcon,
  PaletteIcon,
  EyeIcon,
  EyeOffIcon,
  LayoutTemplate,
  Sparkles,
  Check,
  Languages,
} from "lucide-react";
import { HexColorPicker } from "react-colorful";

const SettingForm = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleVisibility = () => {
    onChange({
      ...data,
      public: !data.public,
    });
  };

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#764de1] focus:bg-white focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#764de1] dark:focus:bg-slate-900 dark:focus:ring-violet-950/50";

  const labelClass =
    "mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300";

  const iconClass = "size-4 text-[#764de1] dark:text-violet-300";

  const currentAccentColor = data.accentColor || "#000000";

  const colors = [
    "#000000",
    "#374151",
    "#1e3a8a",
    "#2563eb",
    "#7c3aed",
    "#9333ea",
    "#db2777",
    "#dc2626",
    "#ea580c",
    "#ca8a04",
    "#16a34a",
    "#0891b2",
  ];

  const templates = [
    {
      value: "classic",
      label: "Classic",
      description: "Clean and ATS-friendly layout.",
    },
    {
      value: "modern",
      label: "Modern",
      description: "Stylish layout with stronger visual hierarchy.",
    },
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
      description: "Gunakan label Bahasa Indonesia di template resume.",
    },
  ];

  return (
    <div className="space-y-7">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-medium text-[#764de1] dark:border-violet-900/50 dark:bg-violet-950/30 dark:text-violet-300">
          <Sparkles size={14} />
          Resume Preferences
        </div>

        <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Settings
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Customize your resume title, template style, language, visibility, and
          accent color.
        </p>
      </div>

      <div className="rounded-3xl border border-violet-100 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <label className={labelClass}>
          <FileIcon className={iconClass} />
          File Name <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          placeholder="Example: Frontend Developer Resume"
          value={data.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          className={inputClass}
          required
        />

        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
          This title will help you identify the resume in your dashboard.
        </p>
      </div>

      <div className="rounded-3xl border border-violet-100 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <label className={labelClass}>
          <PaletteIcon className={iconClass} />
          Accent Color <span className="text-red-500">*</span>
        </label>

        <div className="mt-4 grid gap-5 lg:grid-cols-[220px_1fr]">
          <div className="rounded-3xl border border-violet-100 bg-violet-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
            <HexColorPicker
              color={currentAccentColor}
              onChange={(color) => handleChange("accentColor", color)}
              className="!w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <div
                className="h-14 w-14 rounded-2xl border-4 border-white shadow-lg dark:border-slate-900"
                style={{ backgroundColor: currentAccentColor }}
              />

              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Selected Color
                </p>

                <input
                  type="text"
                  value={currentAccentColor}
                  onChange={(e) => handleChange("accentColor", e.target.value)}
                  className="mt-1 w-32 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-[#764de1] focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-violet-950/50"
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Preset Colors
              </p>

              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleChange("accentColor", color)}
                    className={`relative h-10 w-10 rounded-2xl border-2 shadow-sm transition hover:scale-110 ${
                      currentAccentColor === color
                        ? "border-slate-900 ring-4 ring-violet-100 dark:border-white dark:ring-violet-950/50"
                        : "border-white ring-1 ring-slate-200 dark:border-slate-900 dark:ring-slate-700"
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {currentAccentColor === color && (
                      <span className="absolute inset-0 flex items-center justify-center text-white">
                        <Check size={17} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
              This color will be used for resume headings, borders, profile
              accents, and template highlights.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-violet-100 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <label className={labelClass}>
          <LayoutTemplate className={iconClass} />
          Template <span className="text-red-500">*</span>
        </label>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {templates.map((template) => {
            const isActive = data.template === template.value;

            return (
              <button
                key={template.value}
                type="button"
                onClick={() => handleChange("template", template.value)}
                className={`rounded-3xl border p-4 text-left transition-all duration-300 ${
                  isActive
                    ? "border-[#764de1] bg-violet-50 shadow-lg shadow-violet-100 dark:border-violet-500 dark:bg-violet-950/30 dark:shadow-violet-950/20"
                    : "border-slate-200 bg-slate-50 hover:border-[#764de1] hover:bg-violet-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-violet-500 dark:hover:bg-slate-800/80"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#764de1] dark:bg-slate-900 dark:text-violet-300">
                    <LayoutTemplate size={18} />
                  </div>

                  {isActive && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#764de1] text-white">
                      <Check size={15} />
                    </div>
                  )}
                </div>

                <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                  {template.label}
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {template.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-violet-100 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <label className={labelClass}>
          <Languages className={iconClass} />
          Language <span className="text-red-500">*</span>
        </label>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {languages.map((language) => {
            const isActive = (data.language || "en") === language.value;

            return (
              <button
                key={language.value}
                type="button"
                onClick={() => handleChange("language", language.value)}
                className={`rounded-3xl border p-4 text-left transition-all duration-300 ${
                  isActive
                    ? "border-[#764de1] bg-violet-50 shadow-lg shadow-violet-100 dark:border-violet-500 dark:bg-violet-950/30 dark:shadow-violet-950/20"
                    : "border-slate-200 bg-slate-50 hover:border-[#764de1] hover:bg-violet-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-violet-500 dark:hover:bg-slate-800/80"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#764de1] dark:bg-slate-900 dark:text-violet-300">
                    <Languages size={18} />
                  </div>

                  {isActive && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#764de1] text-white">
                      <Check size={15} />
                    </div>
                  )}
                </div>

                <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                  {language.label}
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {language.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-violet-100 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <label className={labelClass}>Visibility</label>

        <button
          type="button"
          onClick={handleVisibility}
          className={`mt-3 flex w-full items-center justify-between gap-4 rounded-3xl border p-4 text-left transition-all duration-300 ${
            data.public
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300"
              : "border-slate-200 bg-slate-50 text-slate-700 hover:border-[#764de1] hover:bg-violet-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-violet-500"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                data.public
                  ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300"
                  : "bg-white text-slate-500 dark:bg-slate-900 dark:text-slate-400"
              }`}
            >
              {data.public ? (
                <EyeIcon className="size-5" />
              ) : (
                <EyeOffIcon className="size-5" />
              )}
            </div>

            <div>
              <p className="font-semibold">
                {data.public ? "Public Resume" : "Private Resume"}
              </p>
              <p className="mt-1 text-xs opacity-80">
                {data.public
                  ? "Anyone with the link can view this resume."
                  : "Only you can access this resume."}
              </p>
            </div>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              data.public
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
            }`}
          >
            {data.public ? "Public" : "Private"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default SettingForm;
