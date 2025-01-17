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
import Payment from "../pages/dashboard/customer/Payment";
import ErrorPage from "../pages/shared/ErrorPage";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
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
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
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
        path: "propertyBought/pay/:id",
        element: (
          <PrivateRoute>
            <Payment />
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
          <AgentRoute>
            <AddProperty />
          </AgentRoute>
        ),
      },
      {
        path: "addedProperties",
        element: (
          <AgentRoute>
            <AddedProperties />
          </AgentRoute>
        ),
      },
      {
        path: "addedProperties/update/:id",
        element: (
          <AgentRoute>
            <UpdateProperty />
          </AgentRoute>
        ),
      },
      {
        path: "soldProperties",
        element: (
          <AgentRoute>
            <SoldProperties />
          </AgentRoute>
        ),
      },
      {
        path: "requestedProperties",
        element: (
          <AgentRoute>
            <RequestedProperties />
          </AgentRoute>
        ),
      },

      // admin routes
      {
        path: "manageProperties",
        element: (
          <AdminRoute>
            <ManageProperties />
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manageReviews",
        element: (
          <AdminRoute>
            <ManageReviews />
          </AdminRoute>
        ),
      },
    ],
  },
]);
