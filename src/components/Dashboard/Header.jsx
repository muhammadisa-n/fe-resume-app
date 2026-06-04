import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Menu, X, LogOut, Sparkles, Moon, Sun } from "lucide-react";

import { useAuthStore } from "../../stores/authStore";
import { useThemeStore } from "../../stores/themeStore";
import api from "../../config/axios";

const Header = () => {
  const { user, removeUserData, setIsLoggingOut } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await api.post("/auth/logout", {});
      toast.success("Logout berhasil. Sampai jumpa 👋");
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error("Session sudah berakhir.");
    } finally {
      navigate("/", { replace: true });

      setTimeout(() => {
        removeUserData();
        setIsLoggingOut(false);
      }, 0);
    }
  };
  return (
    <header className="sticky top-0 z-50 border-b border-violet-200/40 bg-white/80 backdrop-blur-xl shadow-sm transition-colors dark:border-white/5 dark:bg-slate-950/80 dark:shadow-none">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3 transition-all">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-[#764de1] text-white shadow-lg shadow-violet-300/50 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 dark:shadow-violet-950/50">
              <Sparkles
                size={18}
                className="transition-transform duration-300 group-hover:rotate-12"
              />

              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-400 ring-4 ring-white dark:ring-slate-950" />
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                Resume Builder
              </h2>

              <p className="text-xs text-slate-500 -mt-1 hidden sm:block dark:text-slate-400">
                Build your professional resume
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {/* User Profile */}
            <div className="flex items-center gap-3 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900">
              <div className="w-9 h-9 rounded-full bg-[#764de1] text-white flex items-center justify-center font-semibold shadow dark:shadow-violet-950/50">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              <div className="leading-tight">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Welcome back
                </p>

                <p className="font-medium text-slate-800 text-sm dark:text-slate-100">
                  {user?.name}
                </p>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-slate-700 transition hover:bg-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 rounded-full bg-[#764de1] hover:bg-[#6842cd] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-300/40 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer dark:shadow-violet-950/50"
            >
              <LogOut
                size={16}
                className="transition-transform group-hover:rotate-6"
              />
              Logout
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-violet-100 bg-violet-50 text-slate-700 transition hover:bg-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-80 pb-4" : "max-h-0"
          }`}
        >
          <div className="mt-3 rounded-3xl border border-violet-100 bg-white p-4 shadow-lg shadow-violet-100/50 transition-colors dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
            {/* User */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="w-11 h-11 rounded-full bg-[#764de1] text-white flex items-center justify-center font-semibold shadow dark:shadow-violet-950/50">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Logged in as
                </p>

                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  {user?.name}
                </p>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-2xl border border-violet-100 bg-violet-50 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-2xl bg-[#764de1] hover:bg-[#6842cd] px-5 py-3 text-sm font-medium text-white transition-all duration-300 active:scale-95 cursor-pointer shadow-lg shadow-violet-300/30 dark:shadow-violet-950/40"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
