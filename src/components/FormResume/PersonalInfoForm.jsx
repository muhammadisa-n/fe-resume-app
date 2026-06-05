import {
  User,
  Mail,
  BriefcaseBusiness,
  Phone,
  MapPin,
  Link2,
  Globe,
  Upload,
  ImagePlus,
  Sparkles,
} from "lucide-react";

function PersonalInfoForm({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const inputClass =
    "mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#764de1] focus:bg-white focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#764de1] dark:focus:bg-slate-900 dark:focus:ring-violet-950/50";

  const labelClass =
    "flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300";

  const iconClass = "size-4 text-[#764de1] dark:text-violet-300";

  const fields = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name...",
      icon: User,
      required: true,
    },
    {
      name: "jobTitle",
      label: "Job Title",
      type: "text",
      placeholder: "Enter your job title...",
      icon: BriefcaseBusiness,
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email...",
      icon: Mail,
      required: true,
    },
    {
      name: "phone",
      label: "Phone",
      type: "tel",
      placeholder: "Enter your phone number...",
      icon: Phone,
      required: true,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "Enter your address...",
      icon: MapPin,
      required: true,
    },
    {
      name: "linkedIn_url",
      label: "LinkedIn",
      type: "url",
      placeholder: "Enter your LinkedIn URL...",
      icon: Link2,
      required: false,
    },
    {
      name: "portfolio_url",
      label: "Website / Portfolio",
      type: "url",
      placeholder: "Enter your website URL...",
      icon: Globe,
      required: false,
    },
  ];

  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-medium text-[#764de1] dark:border-violet-900/50 dark:bg-violet-950/30 dark:text-violet-300">
          <Sparkles size={14} />
          Personal Details
        </div>

        <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Personal Information
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Add your basic profile information so recruiters can easily recognize
          and contact you.
        </p>
      </div>

      {/* Image Upload */}
      <div className="rounded-3xl border border-violet-100 bg-violet-50/40 p-4 dark:border-slate-800 dark:bg-slate-800/40">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <label className="group relative cursor-pointer">
              {data.image ? (
                <div className="relative">
                  <img
                    className="h-20 w-20 rounded-3xl object-cover ring-4 ring-white shadow-lg shadow-violet-100 transition-all duration-300 group-hover:scale-105 group-hover:opacity-80 dark:ring-slate-900 dark:shadow-violet-950/30"
                    alt="user-image"
                    src={
                      typeof data.image === "string"
                        ? data.image
                        : URL.createObjectURL(data.image)
                    }
                  />

                  <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-slate-950/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ImagePlus className="text-white" size={22} />
                  </div>
                </div>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-dashed border-violet-300 bg-white text-[#764de1] shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-[#764de1] group-hover:bg-violet-50 dark:border-slate-700 dark:bg-slate-900 dark:text-violet-300 dark:group-hover:bg-slate-800">
                  <Upload size={25} />
                </div>
              )}

              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleChange("image", file);
                }}
              />
            </label>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                Profile Photo
              </h4>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Upload a clear photo for your resume profile.
              </p>

              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                JPG, JPEG, or PNG supported.
              </p>
            </div>
          </div>

          {typeof data.image === "object" && (
            <div className="rounded-2xl border border-violet-100 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Remove Background
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Clean up uploaded image.
                  </p>
                </div>

                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    onChange={() => setRemoveBackground((prev) => !prev)}
                    checked={removeBackground}
                  />

                  <div className="h-7 w-12 rounded-full bg-slate-300 transition-colors duration-300 peer-checked:bg-[#764de1] dark:bg-slate-700" />

                  <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 peer-checked:translate-x-5" />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fields */}
      <div className="grid gap-5 md:grid-cols-2">
        {fields.map((field) => {
          const Icon = field.icon;

          return (
            <div key={field.name} className="space-y-1">
              <label className={labelClass}>
                <Icon className={iconClass} />
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>

              <input
                type={field.type}
                placeholder={field.placeholder}
                value={data[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className={inputClass}
                required={field.required}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PersonalInfoForm;
