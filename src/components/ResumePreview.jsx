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
    <div className="w-full bg-gray-100">
      <div
        id="resume-preview"
        className="border border-gray-200 print:shadow-none print:border-none"
      >
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
