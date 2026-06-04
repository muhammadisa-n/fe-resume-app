import { Outlet } from "react-router";
import Header from "../components/Dashboard/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;
