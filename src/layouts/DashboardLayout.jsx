import { useState } from "react";
import { Typography, Card, Button, IconButton } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-black text-white p-6 transition-transform transform z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static w-64`}
      >
        <div className="flex justify-between items-center mb-8">
          <Typography variant="h5">Dashboard</Typography>
          <IconButton
            size="sm"
            color="white"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <HiX size={24} />
          </IconButton>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/overview">
                <Button fullWidth variant="text" className="text-white">
                  Overview
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/analytics">
                <Button fullWidth variant="text" className="text-white">
                  Analytics
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/reports">
                <Button fullWidth variant="text" className="text-white">
                  Reports
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <Button fullWidth variant="text" className="text-white">
                  Settings
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-6">
          <IconButton
            size="sm"
            color="black"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <HiMenuAlt3 size={24} />
          </IconButton>
          <Typography variant="h4" className="font-semibold">
            Welcome Back
          </Typography>
          <Button
            size="sm"
            variant="outlined"
            className="border-black text-black"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Card className="p-6 shadow-lg border border-gray-200">
            <Typography variant="h6" className="mb-2">
              Total Users
            </Typography>
            <Typography variant="h4" className="font-bold">
              1,234
            </Typography>
          </Card>

          {/* Card 2 */}
          <Card className="p-6 shadow-lg border border-gray-200">
            <Typography variant="h6" className="mb-2">
              Monthly Revenue
            </Typography>
            <Typography variant="h4" className="font-bold">
              $12,345
            </Typography>
          </Card>

          {/* Card 3 */}
          <Card className="p-6 shadow-lg border border-gray-200">
            <Typography variant="h6" className="mb-2">
              Active Projects
            </Typography>
            <Typography variant="h4" className="font-bold">
              87
            </Typography>
          </Card>
        </div>

        {/* Additional Section */}
        <div className="mt-10">
          <Typography variant="h5" className="mb-4">
            Recent Activities
          </Typography>
          <ul className="space-y-4">
            <li className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              <Typography>✔️ User John Doe updated their profile.</Typography>
            </li>
            <li className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              <Typography>✔️ Revenue for December increased by 15%.</Typography>
            </li>
            <li className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              <Typography>✔️ Project Alpha marked as completed.</Typography>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
