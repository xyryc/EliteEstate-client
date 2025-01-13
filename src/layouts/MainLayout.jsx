import { Outlet } from "react-router-dom";
import { CustomNavbar } from "../components/Shared/CustomNavbar";

const MainLayout = () => {
  return (
    <div>
      <CustomNavbar />

      <Outlet />
    </div>
  );
};

export default MainLayout;
