import {
  User,
  Mail,
  BriefcaseBusiness,
  Phone,
  MapPin,
  Link2,
  Globe,
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
  return (
    <>
      <h3 className="text-2xl font-bold text-gray-600">Personal Information</h3>
      <p className="text-sm text-gray-400">
        Get Started with personal information
      </p>
      <div className="flex items-center gap-2">
        <label>
          {data.image ? (
            <img
              className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80"
              alt="user-image"
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
            />
          ) : (
            <div className="inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer ">
              <User className="size-10 p-2.5 border rounded-full" />
              Upload User Image
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>
        {typeof data.image === "object" && (
          <div className="flex flex-col gap-4 pl-4 text-sm">
            <p>Remove Background</p>
            <label className="relative inline-flex cursor-pointer items-center gap-3 text-gray-900">
              <input
                type="checkbox"
                className="peer sr-only"
                onChange={() => setRemoveBackground((prev) => !prev)}
                checked={removeBackground}
              />
              <div className="peer h-7 w-12 rounded-full bg-slate-300 ring-offset-1 transition-colors duration-200 peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-500"></div>
              <span className="dot absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
            </label>
          </div>
        )}
      </div>

      <div className="space-y-1 mt-5">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <User className="size-4" />
          FullName <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter your Full name..."
          value={data["fullName"] || ""}
          onChange={(e) => handleChange("fullName", e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-gray-500 rounded-lg focus:ring focus:ring-violet-500 focus:border-violet-500 transition-colors text-sm"
          required
        />
      </div>
      <div className="space-y-1 mt-5">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <BriefcaseBusiness className="size-4" />
          Job Title<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter your Job Title..."
          value={data["jobTitle"] || ""}
          onChange={(e) => handleChange("jobTitle", e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-gray-500 rounded-lg focus:ring focus:ring-violet-500 focus:border-violet-500 transition-colors text-sm"
          required
        />
      </div>
      <div className="space-y-1 mt-5">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <Mail className="size-4" />
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          placeholder="Enter your Email..."
          value={data["email"] || ""}
          onChange={(e) => handleChange("email", e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-gray-500 rounded-lg focus:ring focus:ring-violet-500 focus:border-violet-500 transition-colors text-sm"
          required
        />
      </div>

      <div className="space-y-1 mt-5">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <Phone className="size-4" />
          Phone<span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          placeholder="Enter your Phone Number  ..."
          value={data["phone"] || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-gray-500 rounded-lg focus:ring focus:ring-violet-500 focus:border-violet-500 transition-colors text-sm"
          required
        />
      </div>
      <div className="space-y-1 mt-5">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <MapPin className="size-4" />
          Address<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter your Address  ..."
          value={data["address"] || ""}
          onChange={(e) => handleChange("address", e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-gray-500 rounded-lg focus:ring focus:ring-violet-500 focus:border-violet-500 transition-colors text-sm"
          required
        />
      </div>
      <div className="space-y-1 mt-5">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <Link2 className="size-4" />
          LinkedIn<span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          placeholder="Enter your LinkedIn Url  ..."
          value={data["linkedIn_url"] || ""}
          onChange={(e) => handleChange("linkedIn_url", e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-gray-500 rounded-lg focus:ring focus:ring-violet-500 focus:border-violet-500 transition-colors text-sm"
        />
      </div>
      <div className="space-y-1 mt-5">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <Globe className="size-4" />
          Website
        </label>
        <input
          type="url"
          placeholder="Enter your Website Url  ..."
          value={data["portfolio_url"] || ""}
          onChange={(e) => handleChange("portfolio_url", e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-gray-500 rounded-lg focus:ring focus:ring-violet-500 focus:border-violet-500 transition-colors text-sm"
        />
      </div>
    </>
  );
}

export default PersonalInfoForm;
