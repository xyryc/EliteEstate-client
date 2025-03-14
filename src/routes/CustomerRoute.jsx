/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";


const CustomerRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;
  if (role === "customer") return children;

  return <Navigate to="/dashboard/myProfile" replace="true" />;
};

export default CustomerRoute;
