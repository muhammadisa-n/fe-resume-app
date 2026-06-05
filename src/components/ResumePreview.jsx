import ModernTemplate from "./ResumeTemplates/ModernTemplate";
import ClassicTemplate from "./ResumeTemplates/ClassicTemplate";
import "../assets/print.css";

const ResumePreview = ({ data, template, accentColor }) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "classic":
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full rounded-3xl border border-violet-100 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 print:border-none print:bg-white print:p-0 print:shadow-none">
      <div className="mb-3 flex items-center justify-between px-1 print:hidden">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Live Preview
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Template: {template}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-slate-100 p-3 dark:bg-slate-950 print:rounded-none print:bg-white print:p-0">
        <div
          id="resume-preview"
          className="mx-auto overflow-hidden border border-slate-200 bg-white shadow-sm print:border-none print:shadow-none"
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
