import { useState } from "react";
import { Typography, Button, IconButton } from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
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
          <ul className="space-y-6 text-center">
            {/* customer */}
            {role === "customer" && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-900 px-16 py-3 rounded-lg" : ""
                    }
                    to="/dashboard/overview"
                  >
                    Overview
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-900 px-16 py-3 rounded-lg" : ""
                    }
                    to="/dashboard/wishlist"
                  >
                    Wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-900 px-10 py-3 rounded-lg" : ""
                    }
                    to="/dashboard/propertyBought"
                  >
                    Property Bought
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-900 px-14 py-3 rounded-lg" : ""
                    }
                    to="/dashboard/reviews"
                  >
                    My Reviews
                  </NavLink>
                </li>
              </>
            )}

            {/* agent */}
            {role === "agent" && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-900 px-11 py-3 rounded-lg" : ""
                    }
                    to="/dashboard/agentOverview"
                  >
                    Agent Overview
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-900 px-14 py-3 rounded-lg" : ""
                    }
                    to="/dashboard/addProperty"
                  >
                    Add Property
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-900 px-10 py-3 rounded-lg" : ""
                    }
                    to="/dashboard/addedProperties"
                  >
                    Added Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-900 px-12 py-3 rounded-lg" : ""
                    }
                    to="/dashboard/soldProperties"
                  >
                    Sold Properties
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-900 px-6 py-3 rounded-lg" : ""
                    }
                    to="/dashboard/requestedProperties"
                  >
                    Requested Properties
                  </NavLink>
                </li>
              </>
            )}

            {/* admin */}
            {role === "admin" && (
              <>
                {/* admin */}
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-900 px-8 py-3 rounded-lg" : ""
                    }
                    to="/dashboard/adminOverview"
                  >
                    Admin Overview
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-900 px-8 py-3 rounded-lg" : ""
                    }
                    to="/dashboard/manageProperties"
                  >
                    Manage Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-900 px-12 py-3 rounded-lg" : ""
                    }
                    to="/dashboard/manageUsers"
                  >
                    Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-900 px-10 py-3 rounded-lg" : ""
                    }
                    to="/dashboard/manageReviews"
                  >
                    Manage Reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-900 px-8 py-3 rounded-lg" : ""
                    }
                    to="/dashboard/advertiseProperty"
                  >
                    Advertise Property
                  </NavLink>
                </li>
              </>
            )}

            {/* common */}
            <li className="border-t-2 pt-4">
              <Link to="/">
                <Button fullWidth variant="text" className="text-white">
                  Home
                </Button>
              </Link>
            </li>

            <li>
              <Link to="/properties">
                <Button fullWidth variant="text" className="text-white">
                  Properties
                </Button>
              </Link>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "bg-gray-900 px-16 py-3 rounded-lg" : ""
                }
                to="/dashboard/myProfile"
              >
                My Profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-3 bg-white md:hidden">
        {/* Top Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
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
          </div>
          <Button variant="gradient">Logout</Button>
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
