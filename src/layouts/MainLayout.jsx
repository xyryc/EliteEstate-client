import { Outlet } from "react-router-dom";
import { CustomNavbar } from "../components/Shared/CustomNavbar";
import { Footer } from "../components/Shared/Footer";

const MainLayout = () => {
  return (
    <div className="font-poppins">
      <CustomNavbar />

    <div className="min-h-screen">
    <Outlet />
    </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
