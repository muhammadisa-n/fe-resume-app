import { FileIcon, PaletteIcon, EyeIcon, EyeOffIcon } from "lucide-react";
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
  return (
    <>
      <h3 className="text-2xl font-bold text-gray-600">Setting</h3>
      <p className="text-sm text-gray-400">Setting Custom Template Resume</p>
      <div className="space-y-1 mt-5">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <FileIcon className="size-4" />
          File Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter your File name..."
          value={data.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-gray-500 rounded-lg focus:ring focus:ring-violet-500 focus:border-violet-500 transition-colors text-sm"
          required
        />
      </div>
      <div className="space-y-1 mt-5">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <PaletteIcon className="size-4" />
          Accent Color <span className="text-red-500">*</span>
        </label>
        <input
          type="color"
          value={data.accentColor || ""}
          onChange={(e) => handleChange("accentColor", e.target.value)}
          className="mt-1 w-full px-2 py-1 border rounded border-gray-500   h-10  text-sm"
          required
        />
      </div>
      <div className="space-y-1 mt-5">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
          Template <span className="text-red-500">*</span>
        </label>
        <select
          defaultValue={data.template}
          onChange={(e) => handleChange("template", e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-gray-500 rounded-lg  transition-colors text-sm"
        >
          <option value="classic">Classic</option>
          <option value="modern">Modern</option>
        </select>
      </div>
      <div className="space-y-1 mt-5">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
          Visibility
        </label>
        <button
          onClick={handleVisibility}
          className="bg-violet-300 text-violet-600 hover:bg-violet-400 transition-all rounded-lg px-6 py-4 mt-1 flex justify-center items-center text-sm"
        >
          {data.public ? (
            <EyeIcon className="size-4" />
          ) : (
            <EyeOffIcon className="size-4" />
          )}
          {data.public ? "Public" : "Private"}
        </button>
      </div>
    </>
  );
};

export default SettingForm;
