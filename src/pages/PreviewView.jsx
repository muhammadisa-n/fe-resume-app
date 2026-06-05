import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import ResumePreview from "../components/ResumePreview";
import api from "../config/axios";
const PreviewView = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const getResumeData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/resume/public/${resumeId}`);
      setResumeData(response.data.resume);
    } catch (error) {
      console.error("Error fetching resume data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getResumeData();
  }, []);
  return resumeData ? (
    <div className="bg-slate-100">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          accentColor={resumeData.accentColor}
          template={resumeData.template}
        />
      </div>
    </div>
  ) : (
    <>
      {loading ? (
        <div className="min-h-screen bg-slate-100 flex justify-center items-center w-full">
          <p className="text-gray-500 text-lg">Loading resume...</p>
        </div>
      ) : (
        <div className="min-h-screen bg-slate-100 flex justify-center items-center w-full">
          <div className="flex flex-col items-center justify-center text-sm max-md:px-4">
            <h1 className="text-8xl md:text-9xl font-bold text-indigo-500">
              404
            </h1>
            <div className="h-1 w-16 rounded bg-indigo-500 my-5 md:my-7"></div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">
              Page Not Found
            </p>
            <p className="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Link
                to={"/"}
                className="bg-violet-800 hover:bg-black px-7 py-2.5 text-white rounded-md active:scale-95 transition-all"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreviewView;
