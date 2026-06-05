import { Plus, BriefcaseBusiness, Trash2 } from "lucide-react";
const ExperienceForm = ({ data, onChange }) => {
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
  };
  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };
  const updateChangeExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  return (
    <div className="space-y-6">
      {/* text info and  button add */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-600">Experiences</h3>
          <p className="text-sm text-gray-400">Add your job experience</p>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className="flex items-center p-2 gap-2 text-sm bg-violet-100 text-[#764de1] rounded-lg hover:bg-violet-300 transition-colors"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <BriefcaseBusiness className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No work experience added yet</p>
          <p>Click "Add Experience"</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-center">
                <h4>Experience # {index + 1}</h4>
                <button
                  onClick={() => removeExperience(index)}
                  type="button"
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              {/* Input field */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company Name"
                  className="px-3 py-2 text-sm border rounded-lg border-gray-500"
                  value={experience.company || ""}
                  onChange={(e) =>
                    updateChangeExperience(index, "company", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Position"
                  className="px-3 py-2 text-sm border rounded-lg border-gray-500"
                  value={experience.position || ""}
                  onChange={(e) =>
                    updateChangeExperience(index, "position", e.target.value)
                  }
                />
                <input
                  type="month"
                  placeholder="Start Date"
                  className="px-3 py-2 text-sm border rounded-lg border-gray-500"
                  value={experience.startDate || ""}
                  onChange={(e) =>
                    updateChangeExperience(index, "startDate", e.target.value)
                  }
                />
                <input
                  type="month"
                  placeholder="End Date"
                  disabled={experience.isCurrent}
                  className="px-3 py-2 text-sm border rounded-lg border-gray-500"
                  value={experience.endDate || ""}
                  onChange={(e) =>
                    updateChangeExperience(index, "endDate", e.target.value)
                  }
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={experience.isCurrent || false}
                  className=" text-blue-600 border border-gray-300 rounded focus:ring-blue-500"
                  value={experience.endDate || ""}
                  onChange={(e) =>
                    updateChangeExperience(
                      index,
                      "isCurrent",
                      e.target.checked ? true : false
                    )
                  }
                />
                <span className="text-sm text-gray-700">Currently working</span>
              </label>
              <div className="space-y-2 mt-2">
                <textarea
                  value={experience.description || ""}
                  onChange={(e) =>
                    updateChangeExperience(index, "description", e.target.value)
                  }
                  rows={7}
                  className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-violet-500 outline-none transition-colors resize-none"
                  placeholder="Enter your description..."
                ></textarea>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
