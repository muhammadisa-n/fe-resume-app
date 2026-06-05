import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import api from "../config/axios";
import {
  ArrowLeftIcon,
  ChevronLeft,
  ChevronRight,
  SaveIcon,
  ShareIcon,
  DownloadIcon,
} from "lucide-react";
import PersonalInfoForm from "../components/FormResume/PersonalInfoForm";
import SummaryForm from "../components/FormResume/SummaryForm";
import ExperienceForm from "../components/FormResume/ExperienceForm";
import EducationForm from "../components/FormResume/EducationForm";
import ProjectForm from "../components/FormResume/ProjectForm";
import SkillForm from "../components/FormResume/SkillForm";
import SettingForm from "../components/FormResume/SettingForm";
import ResumePreview from "../components/ResumePreview";
const ResumeBuilderView = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    summary: "",
    template: "classic",
    accentColor: "darkblue",
    education: [],
    experience: [],
    personalInfo: {},
    project: [],
    public: false,
    skills: [],
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info" },
    { id: "summary", name: "Summary" },
    { id: "experience", name: "Experience" },
    { id: "education", name: "Education" },
    { id: "projects", name: "Projects" },
    { id: "skills", name: "Skills" },
    { id: "setting", name: "Setting" },
  ];

  const activeSection = sections[activeSectionIndex];
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log(resumeData);
    try {
      const formData = new FormData();
      formData.append("resumeData", JSON.stringify(resumeData));
      removeBackground && formData.append("removeBackground", "yes");
      typeof resumeData.personalInfo.image === "object" &&
        formData.append("image", resumeData.personalInfo.image);
      const response = await api.put(`/resume/${resumeId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResumeData(response.data.resume);
      alert("Update Resume Berhasil");
    } catch (error) {
      console.log(error);
    }
  };
  const handleShare = () => {
    const urlShare = window.location.href.split("/app/")[0];
    const resumeUrl = urlShare + "/view/" + resumeId;
    if (navigator.share) {
      navigator.share({
        text: resumeData.title,
        url: resumeUrl,
      });
    } else {
      alert("Share Not Support");
    }
  };
  const handleDownloadOrPrint = () => {
    window.print();
  };
  const getResumeDataById = async () => {
    const response = await api.get(`/resume/${resumeId}`);
    setResumeData(response.data.resume);
  };
  useEffect(() => {
    getResumeDataById();
  }, []);

  return (
    <>
      {/* button back to get all resume */}
      <div className="max-w-7xl mx-auto px-4 py-7 ">
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" />
          Back To Dashboard
        </Link>
      </div>
      {/* kolom 1:  form kolom 2 previw */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8 ">
          {/* Form Input */}
          <div className="relative  lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              <div
                className="bg-[#764de1] h-4 transition-all duration-2000"
                style={{
                  width: `${
                    (activeSectionIndex * 100) / (sections.length - 1)
                  }%`,
                }}
              ></div>
              {/* Section Navigation or Pagination */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div>{/* nanti */}</div>
                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                      }
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      disabled={activeSectionIndex === 0}
                    >
                      <ChevronLeft className="size=4" />
                      Previous
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(prev + 1, sections.length - 1)
                      )
                    }
                    className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    <ChevronRight className="size=4" />
                    Next
                  </button>
                </div>
              </div>
              {/* form input */}
              <div className="space-y-6 ">
                <form onSubmit={handleSubmitForm}>
                  {activeSection.id === "personal" && (
                    <PersonalInfoForm
                      data={resumeData.personalInfo}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personalInfo: data,
                        }))
                      }
                      removeBackground={removeBackground}
                      setRemoveBackground={setRemoveBackground}
                    />
                  )}
                  {activeSection.id === "summary" && (
                    <SummaryForm
                      data={resumeData.summary}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          summary: data,
                        }))
                      }
                      setResumeData={setResumeData}
                    />
                  )}
                  {activeSection.id === "experience" && (
                    <ExperienceForm
                      data={resumeData.experience}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          experience: data,
                        }))
                      }
                      setResumeData={setResumeData}
                    />
                  )}
                  {activeSection.id === "education" && (
                    <EducationForm
                      data={resumeData.education}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          education: data,
                        }))
                      }
                      setResumeData={setResumeData}
                    />
                  )}
                  {activeSection.id === "projects" && (
                    <ProjectForm
                      data={resumeData.project}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          project: data,
                        }))
                      }
                      setResumeData={setResumeData}
                    />
                  )}
                  {activeSection.id === "skills" && (
                    <SkillForm
                      data={resumeData.skills}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          skills: data,
                        }))
                      }
                      setResumeData={setResumeData}
                    />
                  )}
                  {activeSection.id === "setting" && (
                    <SettingForm
                      data={resumeData}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          title: data.title,
                          template: data.template,
                          public: data.public,
                          accentColor: data.accentColor,
                        }))
                      }
                    />
                  )}
                  <button
                    type="submit"
                    className="bg-violet-300 text-violet-600 hover:bg-violet-400 transition-all rounded-lg px-6 py-4 mt-6 text-sm"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <SaveIcon className="size-7" /> Save
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 max-lg:mt-6 ">
            <div className="lg:col-span-7 max-lg:mt-6">
              <div className="relative w-full">
                <div className="absoulute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                  {resumeData.public && (
                    <button
                      className="flex items-center justify-center p-2 px-4 gap-2 bg-blue-200 text-sm  text-blue-600 rounded-lg"
                      type="button"
                      onClick={handleShare}
                    >
                      <ShareIcon className="size-4" /> Share
                    </button>
                  )}
                  <button
                    className="flex items-center justify-center p-2 px-4 gap-2 bg-purple-200 text-sm  text-purple-600 rounded-lg"
                    type="button"
                    onClick={handleDownloadOrPrint}
                  >
                    <DownloadIcon className="size-4" /> Download
                  </button>
                </div>
              </div>
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accentColor}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeBuilderView;
