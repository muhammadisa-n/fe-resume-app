import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { toast } from "sonner";
import {
  Sparkles,
  ArrowLeft,
  User2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  RefreshCw,
  Shield,
} from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import { isSsoActive } from "../config/sso";
import api from "../config/axios";

const ProfileView = () => {
  const { user, updateUser } = useAuthStore();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    setIsSaving(true);
    try {
      const { data } = await api.put("/auth/profile", { name: name.trim() });
      updateUser(data.user);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSyncProfile = async () => {
    setIsSyncing(true);
    try {
      const { data } = await api.get("/auth/sync-profile");
      updateUser(data.user);
      setName(data.user.name);
      toast.success("Profile synced from SSO");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to sync profile");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All password fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    setIsChangingPassword(true);
    try {
      await api.put("/auth/password", { oldPassword, newPassword });
      toast.success("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-slate-50 transition-colors dark:from-slate-950 dark:via-slate-950 dark:to-[#120b24]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/app"
            className="group flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#764de1] transition-colors dark:text-slate-400 dark:hover:text-violet-300"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </Link>

          <Link to="/" className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#764de1]" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Resume Builder</span>
          </Link>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-5 gap-6">
          {/* Left: Profile Card */}
          <div className="col-span-2">
            <div className="rounded-3xl border border-violet-100 bg-white p-8 shadow-xl shadow-violet-100/60 transition-colors dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-violet-950/20">
              <div className="flex flex-col items-center text-center">
                {user?.image_url ? (
                  <img
                    src={user.image_url}
                    alt={user.name}
                    className="w-28 h-28 rounded-full object-cover ring-4 ring-violet-100 shadow-lg dark:ring-slate-700"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-[#764de1] text-white flex items-center justify-center text-4xl font-bold shadow-lg shadow-violet-300/40 dark:shadow-violet-950/50">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}

                <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-slate-100">
                  {user?.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {user?.email}
                </p>

                <button
                    type="button"
                    onClick={handleSyncProfile}
                    disabled={isSyncing || !isSsoActive()}
                    className="mt-6 flex items-center gap-2 rounded-2xl border border-violet-200 bg-violet-50 px-5 py-2.5 text-sm font-medium text-[#764de1] transition-all duration-300 hover:bg-violet-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-violet-300 dark:hover:bg-slate-700"
                  >
                    <RefreshCw size={16} className={isSyncing ? "animate-spin" : ""} />
                    Sync from SSO
                  </button>
              </div>
            </div>
          </div>

          {/* Right: Forms */}
          <div className="col-span-3 space-y-6">
            {/* Update Profile */}
            <div className="rounded-3xl border border-violet-100 bg-white p-8 shadow-xl shadow-violet-100/60 transition-colors dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-violet-950/20">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-6 dark:text-slate-200">
                <User2 size={20} className="text-[#764de1]" />
                Update Profile
              </h3>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5 dark:text-slate-400">
                    Full Name
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-[#764de1] focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-[#764de1] dark:focus-within:bg-slate-900 dark:focus-within:ring-violet-950/50">
                    <User2 size={18} className="text-[#764de1]" />

                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5 dark:text-slate-400">
                    Email
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
                    <Mail size={18} className="text-slate-400" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full rounded-2xl bg-[#764de1] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-violet-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6842cd] active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none disabled:hover:translate-y-0 dark:shadow-violet-950/50 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>

            {/* Change Password */}
            <div className="rounded-3xl border border-violet-100 bg-white p-8 shadow-xl shadow-violet-100/60 transition-colors dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-violet-950/20">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-6 dark:text-slate-200">
                <Shield size={20} className="text-[#764de1]" />
                Change Password
              </h3>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5 dark:text-slate-400">
                    Current Password
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-[#764de1] focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-[#764de1] dark:focus-within:bg-slate-900 dark:focus-within:ring-violet-950/50">
                    <Lock size={18} className="text-[#764de1]" />

                    <input
                      type={showOldPassword ? "text" : "password"}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Enter current password"
                      autoComplete="off"
                      className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                    />

                    <button
                      type="button"
                      onClick={() => setShowOldPassword((prev) => !prev)}
                      className="text-slate-400 transition-colors hover:text-[#764de1] dark:text-slate-500 dark:hover:text-violet-300"
                    >
                      {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5 dark:text-slate-400">
                    New Password
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-[#764de1] focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-[#764de1] dark:focus-within:bg-slate-900 dark:focus-within:ring-violet-950/50">
                    <Lock size={18} className="text-[#764de1]" />

                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      autoComplete="off"
                      className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                    />

                    <button
                      type="button"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className="text-slate-400 transition-colors hover:text-[#764de1] dark:text-slate-500 dark:hover:text-violet-300"
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5 dark:text-slate-400">
                    Confirm New Password
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-[#764de1] focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-[#764de1] dark:focus-within:bg-slate-900 dark:focus-within:ring-violet-950/50">
                    <Lock size={18} className="text-[#764de1]" />

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      autoComplete="off"
                      className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="text-slate-400 transition-colors hover:text-[#764de1] dark:text-slate-500 dark:hover:text-violet-300"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="w-full rounded-2xl bg-[#764de1] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-violet-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6842cd] active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none disabled:hover:translate-y-0 dark:shadow-violet-950/50 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
                >
                  {isChangingPassword ? "Changing..." : "Change Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileView;
