import { useState } from "react";

const Feature = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className="pt-64 bg-white dark:bg-slate-950" id="features">
      <div className="text-center">
        <span className="text-xs text-zinc-900 bg-slate-200 rounded-full px-6 py-2">
          FEATURES
        </span>
        <h1 className="text-4xl md:text-[40px] font-medium text-zinc-900 mt-6 dark:text-slate-100">
          Everything You Need to Stand Out
        </h1>
        <p className="text-base text-zinc-600 max-w-md mx-auto mt-3 dark:text-slate-400">
          "From smart templates to real-time editing and instant downloads, our
          resume builder equips you with powerful tools to craft a resume that
          gets noticed by recruiters"
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center">
        <img
          className="max-w-2xl w-full xl:-ml-32"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
          alt=""
        />
        <div
          className="px-4 md:px-0"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div
            className={
              "flex items-center justify-center gap-6 max-w-md group cursor-pointer"
            }
          >
            <div
              className={`p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300  flex gap-4 rounded-xl transition-colors ${
                !isHover ? "border-violet-300 bg-violet-100" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 stroke-violet-600"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
              </svg>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700 dark:text-slate-100">
                  Real-Time Resume Preview
                </h3>
                <p className="text-sm text-slate-600 max-w-xs dark:text-slate-400">
                  See every change instantly as you edit your resume, so you can
                  refine your layout, wording, and details with confidence.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
            <div className="p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300 flex gap-4 rounded-xl transition-colors dark:group-hover:bg-slate-800 dark:group-hover:border-violet-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 stroke-green-600"
              >
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
              </svg>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700 dark:text-slate-100">
                  Modern Templates
                </h3>
                <p className="text-sm text-slate-600 max-w-xs dark:text-slate-400">
                  Choose clean, modern, and recruiter-friendly resume templates
                  designed to help your profile look polished and professional.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
            <div className="p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300 flex gap-4 rounded-xl transition-colors dark:group-hover:bg-slate-800 dark:group-hover:border-violet-700">
              <svg
                className="size-6 stroke-orange-600"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 15V3" />
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="m7 10 5 5 5-5" />
              </svg>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700 dark:text-slate-100">
                  Instant Export
                </h3>
                <p className="text-sm text-slate-600 max-w-xs dark:text-slate-400">
                  Download your finished resume quickly and use it right away
                  for job applications, portfolios, or career opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

      * {
          font-family: 'Poppins', sans-serif;
      }
  `}</style>
    </div>
  );
};

export default Feature;
