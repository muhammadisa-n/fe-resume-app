import { useEffect } from "react";
import { Navigate } from "react-router";
import { Sparkles } from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import { isSsoActive, getSsoLoginUrl } from "../config/sso";

const ProtectedRoute = ({ children }) => {
  const { isAuthentication, isCheckingAuth, isLoggingOut } = useAuthStore();

  useEffect(() => {
    if (!isCheckingAuth && !isLoggingOut && !isAuthentication && isSsoActive()) {
      window.location.assign(getSsoLoginUrl());
    }
  }, [isAuthentication, isCheckingAuth, isLoggingOut]);

  if (isCheckingAuth || isLoggingOut) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-slate-50 px-4 transition-colors dark:from-slate-950 dark:via-slate-950 dark:to-[#120b24]">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="h-20 w-20 rounded-full border-4 border-violet-200 border-t-[#764de1] animate-spin dark:border-slate-800 dark:border-t-violet-400" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#764de1] text-white shadow-lg shadow-violet-300/50 dark:shadow-violet-950/50">
                <Sparkles size={22} className="animate-pulse" />
              </div>
            </div>
          </div>

          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {isLoggingOut ? "Logging you out..." : "Checking your session..."}
          </h1>

          <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            {isLoggingOut
              ? "Please wait while we safely end your session."
              : "We are verifying your account to keep your dashboard secure."}
          </p>

          <div className="mt-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#764de1] animate-bounce" />
            <span className="h-2 w-2 rounded-full bg-[#764de1] animate-bounce [animation-delay:150ms]" />
            <span className="h-2 w-2 rounded-full bg-[#764de1] animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthentication) {
    if (isSsoActive()) return null;

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
