import { Outlet } from "react-router";
import Header from "../components/Dashboard/Header";
import { useAuthStore } from "../stores/authStore";
import { Navigate } from "react-router";
const MainLayout = () => {
  const { isAuthentication } = useAuthStore();
  return isAuthentication ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to={"/login"} replace />
  );
};

export default MainLayout;
