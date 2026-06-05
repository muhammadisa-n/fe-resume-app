import { Plus, School2, Trash2 } from "lucide-react";
const EducationForm = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation = {
      intitutionName: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: false,
      gpa: "",
    };
    onChange([...data, newEducation]);
  };
  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };
  const updateChangeEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  return (
    <div className="space-y-6">
      {/* text info and  button add */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-600">Educations</h3>
          <p className="text-sm text-gray-400">Add your history education</p>
        </div>
        <button
          type="button"
          onClick={addEducation}
          className="flex items-center p-2 gap-2 text-sm bg-violet-100 text-[#764de1] rounded-lg hover:bg-violet-300 transition-colors"
        >
          <Plus className="size-4" />
          Add Education
        </button>
      </div>
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <School2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No Education added yet</p>
          <p>Click "Add Education"</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-center">
                <h4>Education # {index + 1}</h4>
                <button
                  onClick={() => removeEducation(index)}
                  type="button"
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              {/* Input field */}
              <div className="grid gap-3">
                <input
                  type="text"
                  placeholder="Institute Name"
                  className="px-3 py-2 text-sm border rounded-lg border-gray-500"
                  value={education.intitutionName || ""}
                  onChange={(e) =>
                    updateChangeEducation(
                      index,
                      "intitutionName",
                      e.target.value
                    )
                  }
                />
                <input
                  type="text"
                  placeholder="Degree"
                  className="px-3 py-2 text-sm border rounded-lg border-gray-500"
                  value={education.degree || ""}
                  onChange={(e) =>
                    updateChangeEducation(index, "degree", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Field Of Study"
                  className="px-3 py-2 text-sm border rounded-lg border-gray-500"
                  value={education.fieldOfStudy || ""}
                  onChange={(e) =>
                    updateChangeEducation(index, "fieldOfStudy", e.target.value)
                  }
                />
                <input
                  type="month"
                  placeholder="Start Date"
                  className="px-3 py-2 text-sm border rounded-lg border-gray-500"
                  value={education.startDate || ""}
                  onChange={(e) =>
                    updateChangeEducation(index, "startDate", e.target.value)
                  }
                />
                <input
                  type="month"
                  placeholder="End Date"
                  className="px-3 py-2 text-sm border rounded-lg border-gray-500"
                  value={education.endDate || ""}
                  onChange={(e) =>
                    updateChangeEducation(index, "endDate", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="GPA"
                  className="px-3 py-2 text-sm border rounded-lg border-gray-500"
                  value={education.gpa || ""}
                  onChange={(e) =>
                    updateChangeEducation(index, "gpa", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
