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
import PrivateRoute from "./PrivateRoute";

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
        element: (
          <PrivateRoute>
            <Properties />
          </PrivateRoute>
        ),
      },
      {
        path: "/properties/details/:id",
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "myProfile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "wishlist/offer/:id",
        element: (
          <PrivateRoute>
            <MakeOffer />
          </PrivateRoute>
        ),
      },
      {
        path: "propertyBought",
        element: (
          <PrivateRoute>
            <PropertyBought />
          </PrivateRoute>
        ),
      },
      {
        path: "reviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },

      // agent routes
      {
        path: "addProperty",
        element: (
          <PrivateRoute>
            <AddProperty />
          </PrivateRoute>
        ),
      },
      {
        path: "addedProperties",
        element: (
          <PrivateRoute>
            <AddedProperties />
          </PrivateRoute>
        ),
      },
      {
        path: "addedProperties/update/:id",
        element: (
          <PrivateRoute>
            <UpdateProperty />
          </PrivateRoute>
        ),
      },
      {
        path: "soldProperties",
        element: (
          <PrivateRoute>
            <SoldProperties />
          </PrivateRoute>
        ),
      },
      {
        path: "requestedProperties",
        element: (
          <PrivateRoute>
            <RequestedProperties />
          </PrivateRoute>
        ),
      },

      // admin routes
      {
        path: "manageProperties",
        element: (
          <PrivateRoute>
            <ManageProperties />
          </PrivateRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "manageReviews",
        element: (
          <PrivateRoute>
            <ManageReviews />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
