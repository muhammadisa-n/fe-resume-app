import { Link } from "react-router";
import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { useThemeStore } from "../stores/themeStore";
import { Menu, X, Sparkles, ArrowRight, Moon, Sun } from "lucide-react";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthentication } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <>
      <nav className="h-20 bg-white dark:bg-slate-950">
        <div className="fixed left-0 top-0 right-0 z-100 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-violet-200/40 bg-white/80 backdrop-blur-xl shadow-sm transition-all dark:border-transparent dark:bg-slate-950/80 dark:shadow-none">
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-[#764de1] text-white shadow-lg shadow-violet-300/50 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 dark:shadow-violet-950/50">
              <Sparkles
                size={19}
                className="transition-transform duration-300 group-hover:rotate-12"
              />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-400 ring-4 ring-white dark:ring-slate-950" />
            </div>

            <div className="leading-tight">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Resume Builder
              </h2>
              <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400">
                Build your professional resume
              </p>
            </div>
          </Link>

          <div className="hidden sm:flex items-center gap-4 md:gap-8 max-md:text-sm text-gray-800 dark:text-slate-200">
            <a
              href="#"
              onClick={() => scrollTo(0, 0)}
              className="relative font-medium transition hover:text-[#764de1] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#764de1] after:transition-all hover:after:w-full"
            >
              Home
            </a>

            <a
              href="#features"
              className="relative font-medium transition hover:text-[#764de1] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#764de1] after:transition-all hover:after:w-full"
            >
              Features
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-slate-700 transition hover:bg-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthentication ? (
              <Link
                to="/app"
                className="group max-sm:hidden inline-flex items-center gap-2 cursor-pointer px-6 py-2.5 bg-[#764de1] hover:bg-[#6842cd] transition-all duration-300 text-white rounded-full shadow-lg shadow-violet-300/40 hover:-translate-y-0.5 active:scale-95 dark:shadow-violet-950/50"
              >
                Back To Dashboard
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            ) : (
              <Link
                to="/login"
                className="group max-sm:hidden inline-flex items-center gap-2 cursor-pointer px-6 py-2.5 bg-[#764de1] hover:bg-[#6842cd] transition-all duration-300 text-white rounded-full shadow-lg shadow-violet-300/40 hover:-translate-y-0.5 active:scale-95 dark:shadow-violet-950/50"
              >
                Login
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            )}

            <button
              onClick={() => setMenuOpen(true)}
              className="sm:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-violet-100 bg-violet-50 text-slate-700 transition hover:bg-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <Menu size={23} />
            </button>
          </div>
        </div>

        <div
          className={`sm:hidden fixed inset-0 ${
            menuOpen ? "w-full opacity-100" : "w-0 opacity-0"
          } overflow-hidden bg-white/95 backdrop-blur-xl shadow-xl z-[200] text-sm transition-all duration-300 dark:bg-slate-950/95`}
        >
          <div className="flex flex-col items-center justify-center h-full text-xl font-semibold gap-7 p-4">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute right-6 top-6 flex items-center justify-center w-11 h-11 rounded-xl border border-violet-100 bg-violet-50 text-slate-700 transition hover:bg-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <X size={23} />
            </button>

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="group flex flex-col items-center gap-3 mb-4"
            >
              <div className="relative flex items-center justify-center w-16 h-16 rounded-3xl bg-[#764de1] text-white shadow-lg shadow-violet-300/50 transition-all duration-300 group-hover:scale-105 dark:shadow-violet-950/50">
                <Sparkles size={26} />
                <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-emerald-400 ring-4 ring-white dark:ring-slate-950" />
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Resume Builder
                </h2>
                <p className="text-sm font-normal text-slate-500 dark:text-slate-400">
                  Build your professional resume
                </p>
              </div>
            </Link>

            <a
              href="#"
              onClick={() => {
                scrollTo(0, 0);
                setMenuOpen(false);
              }}
              className="text-slate-700 transition hover:text-[#764de1] dark:text-slate-200"
            >
              Home
            </a>

            <a
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="text-slate-700 transition hover:text-[#764de1] dark:text-slate-200"
            >
              Features
            </a>

            {isAuthentication ? (
              <Link
                to="/app"
                onClick={() => setMenuOpen(false)}
                className="group mt-2 inline-flex items-center gap-2 cursor-pointer px-8 py-3 bg-[#764de1] hover:bg-[#6842cd] transition-all duration-300 text-white rounded-full shadow-lg shadow-violet-300/40 active:scale-95 dark:shadow-violet-950/50"
              >
                Back To Dashboard
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="group mt-2 inline-flex items-center gap-2 cursor-pointer px-8 py-3 bg-[#764de1] hover:bg-[#6842cd] transition-all duration-300 text-white rounded-full shadow-lg shadow-violet-300/40 active:scale-95 dark:shadow-violet-950/50"
              >
                Login
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            )}
          </div>
        </div>
      </nav>

      <section className="rethink relative min-h-[calc(100vh-5rem)] bg-gradient-to-b from-white via-white to-violet-50 text-gray-800 transition-colors dark:from-slate-950 dark:via-slate-950 dark:to-[#120b24] dark:text-slate-100">
        <div className="flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 pt-44 md:pt-52">
          <h1 className="text-4xl md:text-6xl font-semibold max-w-lg md:max-w-2xl text-center leading-tight md:leading-tight">
            Build Your{" "}
            <span className="relative bg-gradient-to-r from-purple-700 to-[#764de1] bg-clip-text text-transparent">
              Professional Resume
              <div className="z-10 absolute bottom-0 left-0 w-full scale-120">
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradient_arc.svg"
                  alt="gradient"
                />
              </div>
            </span>{" "}
            <span className="relative bg-gradient-to-r from-[#764de1] to-indigo-600 bg-clip-text text-transparent">
              In
            </span>{" "}
            Minutes.
          </h1>

          <p className="max-w-xl text-center text-base my-7 text-slate-600 dark:text-slate-300">
            Create a stunning, job-winning resume effortlessly with our
            intuitive builder. Choose from modern templates, customize your
            content, and export your resume in just a few clicks — no design
            skills required.
          </p>

          {isAuthentication ? (
            <Link
              to="/app"
              className="group inline-flex items-center gap-2 bg-[#764de1] hover:bg-[#6842cd] text-white p-3 px-6 rounded-full cursor-pointer shadow-lg shadow-violet-300/40 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 dark:shadow-violet-950/50"
            >
              Back To Dashboard
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          ) : (
            <Link
              to="/login"
              className="group inline-flex items-center gap-2 bg-[#764de1] hover:bg-[#6842cd] text-white p-3 px-6 rounded-full cursor-pointer shadow-lg shadow-violet-300/40 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 dark:shadow-violet-950/50"
            >
              Login
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>
      </section>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?&family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap');

          .rethink {
            font-family: 'Rethink Sans', sans-serif;
          }
        `}
      </style>
    </>
  );
};

export default Hero;
