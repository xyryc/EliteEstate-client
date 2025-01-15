import { useState } from "react";
import { Typography, Button, IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import useRole from "../../hooks/useRole";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const [role] = useRole();

  return (
    <div className="flex md:h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-black text-white p-6 transition-transform transform z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static w-64`}
      >
        <div className="flex justify-between items-center mb-8 text-center">
          <Typography variant="h4">EliteEstate Dashboard</Typography>
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
            {/* common */}
            <li>
              <Link to="/dashboard/myProfile">
                <Button fullWidth variant="text" className="text-white">
                  My Profile
                </Button>
              </Link>
            </li>

            {role === "customer" && (
              <>
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
              </>
            )}

            {role === "agent" && (
              <>
                <li>
                  <Link to="/dashboard/addProperty">
                    <Button fullWidth variant="text" className="text-white">
                      Add Property
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/addedProperties">
                    <Button fullWidth variant="text" className="text-white">
                      Added Properties
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/soldProperties">
                    <Button fullWidth variant="text" className="text-white">
                      Sold Properties
                    </Button>
                  </Link>
                </li>

                <li>
                  <Link to="/dashboard/requestedProperties">
                    <Button fullWidth variant="text" className="text-white">
                      Requested Properties
                    </Button>
                  </Link>
                </li>
              </>
            )}

            {role === "admin" && (
              <>
                {/* admin */}
                <li>
                  <Link to="/dashboard/manageProperties">
                    <Button fullWidth variant="text" className="text-white">
                      Manage Properties
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manageUsers">
                    <Button fullWidth variant="text" className="text-white">
                      Manage Users
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manageReviews">
                    <Button fullWidth variant="text" className="text-white">
                      Manage Reviews
                    </Button>
                  </Link>
                </li>
              </>
            )}



            <li className="border-t-2 pt-4">
              <Link to="/">
                <Button fullWidth variant="text" className="text-white">
                  Home
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-3 bg-white md:hidden">
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
            EliteEstate
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
