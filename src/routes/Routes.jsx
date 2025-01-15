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
import ManageProperties from "../pages/dashboard/admin/ManageProperties";
import ManageReviews from "../pages/dashboard/admin/ManageReviews";
import UpdateProperty from "../pages/dashboard/agent/UpdateProperty";
import RequestedProperties from "../pages/dashboard/agent/RequestedProperties";
import Properties from "../pages/properties/Properties";
import Details from "../pages/properties/Details";
import MakeOffer from "../pages/dashboard/customer/MakeOffer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
      },
      {
        path: "properties",
        element: <Properties />,
      },
      {
        path: "/properties/details/:id",
        element: <Details />,
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
        path: "wishlist/offer/:id",
        element: <MakeOffer />,
      },
      {
        path: "propertyBought",
        element: <PropertyBought />,
      },
      {
        path: "reviews",
        element: <MyReviews />,
      },

      // agent routes
      {
        path: "addProperty",
        element: <AddProperty />,
      },
      {
        path: "addedProperties",
        element: <AddedProperties />,
      },
      {
        path: "addedProperties/update/:id",
        element: <UpdateProperty />,
      },
      {
        path: "soldProperties",
        element: <SoldProperties />,
      },
      {
        path: "requestedProperties",
        element: <RequestedProperties />,
      },

      // admin routes
      {
        path: "manageProperties",
        element: <ManageProperties />,
      },
      {
        path: "manageUsers",
        element: <ManageUsers />,
      },
      {
        path: "manageReviews",
        element: <ManageReviews />,
      },
    ],
  },
]);
