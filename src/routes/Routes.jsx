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
import AdvertiseProperty from "../pages/dashboard/admin/AdvertiseProperty";
import CustomerRoute from "./CustomerRoute";
import CusotmerOverview from "../pages/dashboard/customer/CusotmerOverview";
import AdminOverview from "../pages/dashboard/admin/AdminOverview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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

      // customer route
      {
        path: "overview",
        element: (
          <PrivateRoute>
            <CustomerRoute>
              <CusotmerOverview />
            </CustomerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <PrivateRoute>
            <CustomerRoute>
              <Wishlist />
            </CustomerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "wishlist/offer/:id",
        element: (
          <PrivateRoute>
            <CustomerRoute>
              <MakeOffer />
            </CustomerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "propertyBought",
        element: (
          <PrivateRoute>
            <CustomerRoute>
              <PropertyBought />
            </CustomerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "propertyBought/pay/:id",
        element: (
          <PrivateRoute>
            <CustomerRoute>
              <Payment />
            </CustomerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "reviews",
        element: (
          <PrivateRoute>
            <CustomerRoute>
              <MyReviews />
            </CustomerRoute>
          </PrivateRoute>
        ),
      },

      // agent routes
      {
        path: "addProperty",
        element: (
          <PrivateRoute>
            <AgentRoute>
              <AddProperty />
            </AgentRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "addedProperties",
        element: (
          <PrivateRoute>
            <AgentRoute>
              <AddedProperties />
            </AgentRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "addedProperties/update/:id",
        element: (
          <PrivateRoute>
            <AgentRoute>
              <UpdateProperty />
            </AgentRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "soldProperties",
        element: (
          <PrivateRoute>
            <AgentRoute>
              <SoldProperties />
            </AgentRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "requestedProperties",
        element: (
          <PrivateRoute>
            <AgentRoute>
              <RequestedProperties />
            </AgentRoute>
          </PrivateRoute>
        ),
      },

      // admin routes
      {
        path: "adminOverview",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminOverview />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manageProperties",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageProperties />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manageReviews",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageReviews />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "advertiseProperty",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdvertiseProperty />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
