import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomeLayout from "../layouts/HomeLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import SignUp from "../pages/auth/SignUp/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
      },

      // login, sign up
      {
        path: "/login",
        // element: <Login/>
      },
      {
        path: "/signup",
        element: <SignUp/>
      },
    ],
  },

  // dashboard
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [],
  },
]);
