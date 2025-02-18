import { Outlet } from "react-router-dom";
import { CustomNavbar } from "../components/Shared/CustomNavbar";
import { Footer } from "../components/Shared/Footer";
import ScrollToTop from "../components/Shared/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="font-poppins">
      <div className="h-14">
        <CustomNavbar />
      </div>

      <ScrollToTop />
      <div className="min-h-screen">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
