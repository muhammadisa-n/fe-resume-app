import { useState } from "react";
import {
  User2Icon,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate, Navigate, Link } from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "../stores/authStore";
import api from "../config/axios";
import { isSsoActive, getSsoLoginUrl } from "../config/sso";

const LoginView = () => {
  const [state, setState] = useState("login");
  const [disable, setDisable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setUserData, isAuthentication } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);

    try {
      if (state === "login") {
        const { data } = await api.post("/auth/login", formData);
        setUserData(data.user);
        toast.success("Login berhasil. Selamat datang kembali!");
        navigate("/app", { replace: true });
      } else {
        const { data } = await api.post("/auth/register", formData);
        setUserData(data.user);
        toast.success("Akun berhasil dibuat. Selamat datang!");
        navigate("/app", { replace: true });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Terjadi kesalahan.");
    } finally {
      setDisable(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isAuthentication) return <Navigate to="/app" replace />;

  if (isSsoActive()) {
    window.location.href = getSsoLoginUrl();
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-slate-50 flex items-center justify-center px-4 transition-colors dark:from-slate-950 dark:via-slate-950 dark:to-[#120b24]">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#764de1] text-white shadow-lg shadow-violet-300/50 dark:shadow-violet-950/50">
            <Sparkles size={21} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Resume Builder
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Build your professional resume
            </p>
          </div>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-violet-100 bg-white p-7 shadow-xl shadow-violet-100/60 transition-colors dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-violet-950/20"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {state === "login" ? "Welcome Back" : "Create Account"}
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {state === "login"
                ? "Sign in to manage your resumes."
                : "Create your account and start building."}
            </p>
          </div>

          <div className="mt-7 space-y-4">
            {state !== "login" && (
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-[#764de1] focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-[#764de1] dark:focus-within:bg-slate-900 dark:focus-within:ring-violet-950/50">
                <User2Icon size={18} className="text-[#764de1]" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>
            )}

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-[#764de1] focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-[#764de1] dark:focus-within:bg-slate-900 dark:focus-within:ring-violet-950/50">
              <Mail size={18} className="text-[#764de1]" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-[#764de1] focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-[#764de1] dark:focus-within:bg-slate-900 dark:focus-within:ring-violet-950/50">
              <Lock size={18} className="text-[#764de1]" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-slate-400 transition-colors hover:text-[#764de1] dark:text-slate-500 dark:hover:text-violet-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={disable}
            className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#764de1] px-5 py-3 font-medium text-white shadow-lg shadow-violet-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6842cd] active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none disabled:hover:translate-y-0 dark:shadow-violet-950/50 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
          >
            {disable
              ? "Processing..."
              : state === "login"
              ? "Login"
              : "Sign up"}

            {!disable && (
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            )}
          </button>

          <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
            {state === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() =>
                setState((prev) => (prev === "login" ? "register" : "login"))
              }
              className="font-medium text-[#764de1] hover:underline dark:text-violet-300"
            >
              {state === "login" ? "Create account" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </main>
  );
};

export default LoginView;
