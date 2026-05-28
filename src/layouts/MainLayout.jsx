import { Outlet } from "react-router";
import Header from "../components/Dashboard/Header";
const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <h1>Footer</h1>
    </>
  );
};

export default MainLayout;
