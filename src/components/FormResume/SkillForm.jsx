import { useState } from "react";
import { Plus, X } from "lucide-react";
const SkillForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    const skill = newSkill.trim();

    if (skill && !data.includes(skill)) {
      onChange([...data, skill]);
      setNewSkill("");
    }
  };
  const removeSkill = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-2xl font-bold text-gray-600">Skill</h3>
        <p className="text-sm text-gray-400">Add your skill</p>
      </div>
      <div className="flex gap-2 ">
        <input
          type="text"
          placeholder="Enter Your Skill example Javascript"
          className="flex-1 px-3 py-2 text-sm "
          onChange={(e) => setNewSkill(e.target.value)}
          value={newSkill}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="flex items-center gap-2 px-4 py-2  text-sm bg-violet-500 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="size-4" /> Add
        </button>
      </div>
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-sm"
            >
              {skill}
              <button
                className="ml-1 hover:bg-violet-200 rounded-full p-0.5 transition-colors"
                type="button"
              >
                <X onClick={() => removeSkill(index)} className="w-3 h-3 " />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <>
          <p>No Skill added yet.</p>
        </>
      )}
    </div>
  );
};

export default SkillForm;
