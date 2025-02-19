import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Tooltip,
  Collapse,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { HiOutlineHomeModern } from "react-icons/hi2";
import useAuth from "../../hooks/useAuth";

export function CustomNavbar() {
  const { user, logOut } = useAuth();

  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleLogout = () => {
    logOut();
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <NavLink to="/">
        <Typography
          as="span"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          Home
        </Typography>
      </NavLink>
      <NavLink to="/properties">
        <Typography
          as="span"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          Properties
        </Typography>
      </NavLink>

      <NavLink to="/dashboard">
        <Typography
          as="span"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          Dashboard
        </Typography>
      </NavLink>
    </ul>
  );

  return (
    <Navbar className="fixed top-0 z-10 h-max max-w-full rounded-none py-2 lg:px-8 shadow-none">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography variant="h6" className="mr-4 cursor-pointer py-1.5">
          <NavLink
            to="/"
            className="flex items-center gap-1 text-xl font-poppins"
          >
            <HiOutlineHomeModern /> EliteEstate
          </NavLink>
        </Typography>

        <div className="hidden lg:block">{navList}</div>

        {user ? (
          <div className="space-x-2 flex items-center">
            <Tooltip content={user?.displayName} placement="left">
              <Avatar
                variant="circular"
                size="sm"
                alt={user?.displayName}
                className="border border-gray-900 p-0.5"
                src={user?.photoURL}
                referrerPolicy="no-referrer"
              />
            </Tooltip>
            <Button size="sm" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        ) : (
          <div className="hidden gap-2 lg:flex">
            <NavLink to="/login">
              <Button variant="text" size="sm" color="blue-gray">
                Log In
              </Button>
            </NavLink>
            <NavLink to="/signup">
              <Button variant="gradient" size="sm">
                Sign Up
              </Button>
            </NavLink>
          </div>
        )}

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        {navList}
        {!user && (
          <div className="flex flex-col gap-2">
            <NavLink to="/login">
              <Button fullWidth variant="text" size="sm">
                Log In
              </Button>
            </NavLink>
            <NavLink to="/signup">
              <Button fullWidth variant="gradient" size="sm">
                Sign Up
              </Button>
            </NavLink>
          </div>
        )}
      </Collapse>
    </Navbar>
  );
}
