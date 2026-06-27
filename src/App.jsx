import { Route, Routes } from "react-router";
import { useEffect } from "react";

import HomeView from "./pages/HomeView";
import LoginView from "./pages/LoginView";
import DashboardView from "./pages/DashboardView";
import PreviewView from "./pages/PreviewView";
import ResumeBuilderView from "./pages/ResumeBuilderView";
import ProfileView from "./pages/ProfileView";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./middleware/ProtectedRoute";
import { useAuthStore } from "./stores/authStore";

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <p className="text-slate-500 dark:text-slate-400">
          Checking authentication...
        </p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/view/:resumeId" element={<PreviewView />} />

      <Route
        path="app"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardView />} />
        <Route path="builder/:resumeId" element={<ResumeBuilderView />} />
        <Route path="profile" element={<ProfileView />} />
      </Route>
    </Routes>
  );
}

export default App;
