import { Plus, Workflow, Trash2 } from "lucide-react";
const ProjectForm = ({ data, onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };
    onChange([...data, newProject]);
  };
  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };
  const updateChangeProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  return (
    <div className="space-y-6">
      {/* text info and  button add */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-600">Projects</h3>
          <p className="text-sm text-gray-400">Add your project</p>
        </div>
        <button
          type="button"
          onClick={addProject}
          className="flex items-center p-2 gap-2 text-sm bg-violet-100 text-[#764de1] rounded-lg hover:bg-violet-300 transition-colors"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Workflow className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No project added yet</p>
          <p>Click "Add Project"</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-center">
                <h4>Project # {index + 1}</h4>
                <button
                  onClick={() => removeProject(index)}
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
                  placeholder="Name"
                  className="px-3 py-2 text-sm border rounded-lg border-gray-500"
                  value={project.name || ""}
                  onChange={(e) =>
                    updateChangeProject(index, "name", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Type"
                  className="px-3 py-2 text-sm border rounded-lg border-gray-500"
                  value={project.type || ""}
                  onChange={(e) =>
                    updateChangeProject(index, "type", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2 mt-2">
                <textarea
                  value={project.description || ""}
                  onChange={(e) =>
                    updateChangeProject(index, "description", e.target.value)
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

export default ProjectForm;
