import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Avatar,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { NavLink } from "react-router-dom";
import { HiOutlineHomeModern } from "react-icons/hi2";
import useAuth from "../../hooks/useAuth";

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      {" "}
      <NavLink to="/">
        <Typography variant="small" color="blue-gray" className="font-medium">
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            Home
          </ListItem>
        </Typography>
      </NavLink>
      <NavLink to="/properties">
        <Typography variant="small" color="blue-gray" className="font-medium">
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            Properties
          </ListItem>
        </Typography>
      </NavLink>
      <NavLink to="/dashboard/myProfile">
        <Typography variant="small" color="blue-gray" className="font-medium">
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            Dashboard
          </ListItem>
        </Typography>
      </NavLink>
    </List>
  );
}

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

  return (
    <Navbar className="mx-auto px-4 py-2 shadow-none">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography variant="h6" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
          <NavLink to="/" className="flex items-center gap-1 text-xl font-poppins">
            <HiOutlineHomeModern /> EliteEstate
          </NavLink>
        </Typography>

        <div className="hidden lg:block">
          <NavList />
        </div>

        {user ? (
          <div className="space-x-2">
            <Avatar
              title={user?.displayName}
              variant="circular"
              size="sm"
              alt={user?.displayName}
              className="border border-gray-900 p-0.5"
              src={user?.photoURL}
              referrerPolicy="no-referrer"
            />
            <Button size="sm" onClick={() => handleLogout()}>
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
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          {!user && (
            <>
              <NavLink to="/login">
                <Button
                  variant="outlined"
                  size="sm"
                  color="blue-gray"
                  fullWidth
                >
                  Log In
                </Button>
              </NavLink>
              <NavLink to="/signup">
                <Button variant="gradient" size="sm" fullWidth>
                  Sign Up
                </Button>
              </NavLink>
            </>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}
