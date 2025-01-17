/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  console.log(role)

  if (isLoading) return <LoadingSpinner />;
  if (role === "admin") return children;

  return <Navigate to="/dashboard/myProfile" replace="true" />;
};

export default AdminRoute;
