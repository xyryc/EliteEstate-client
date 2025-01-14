import { useState } from "react";
import { Typography, Button, IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex sm:h-screen">
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
              <Link to="/dashboard/myProfile">
                <Button fullWidth variant="text" className="text-white">
                  My Profile
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/wishlist">
                <Button fullWidth variant="text" className="text-white">
                  Wishlist
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/propertyBought">
                <Button fullWidth variant="text" className="text-white">
                  Property Bought
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/reviews">
                <Button fullWidth variant="text" className="text-white">
                  My Reviews
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-3 bg-white sm:hidden">
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
          <Button variant="outlined" className="border-black text-black">
            Logout
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
