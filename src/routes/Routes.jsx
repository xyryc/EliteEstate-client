import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomeLayout from "../layouts/HomeLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import SignUp from "../pages/auth/SignUp/SignUp";
import Login from "../pages/auth/Login/Login";
import Profile from "../pages/dashboard/common/Profile";
import Wishlist from "../pages/dashboard/customer/Wishlist";
import PropertyBought from "../pages/dashboard/customer/PropertyBought";
import MyReviews from "../pages/dashboard/customer/MyReviews";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import AddProperty from "../pages/dashboard/agent/AddProperty";
import AddedProperties from "../pages/dashboard/agent/AddedProperties";
import SoldProperties from "../pages/dashboard/agent/SoldProperties";

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
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },

  // dashboard
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "myProfile",
        element: <Profile />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "propertyBought",
        element: <PropertyBought />,
      },
      {
        path: "reviews",
        element: <MyReviews />,
      },

      // agent role
      {
        path: "addProperty",
        element: <AddProperty />,
      },
      {
        path: "addedProperties",
        element: <AddedProperties />,
      },
      {
        path: "soldProperties",
        element: <SoldProperties />,
      },

      // admin role
      {
        path: "manageUsers",
        element: <ManageUsers />,
      },
    ],
  },
]);
