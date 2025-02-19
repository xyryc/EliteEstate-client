import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import useRole from "../hooks/useRole";
import { useEffect } from "react";

const DashboardLayout = () => {
  const [role, isLoading] = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (role === "admin") {
      navigate("/dashboard/adminOverview");
    } else if (role === "agent") {
      navigate("/dashboard/agentOverview");
    } else if (role === "customer") {
      navigate("/dashboard/overview");
    } else {
      navigate("/");
    }
  }, [role, navigate, isLoading]);

  return (
    <div className="relative min-h-screen md:flex bg-white">
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}

      <div className="p-5 flex-1">
        {/* Outlet for dynamic contents */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
