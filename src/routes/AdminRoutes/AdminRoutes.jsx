import React from "react";
import { Navigate, useLocation } from "react-router"; 
import Loading from "../../components/loading/Loading";
import useAuth from "../../hooks/useAuth/useAuth";
import useUserRole from "../../hooks/useUserRole/useUserRole";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isRoleLoading } = useUserRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return <Loading></Loading>
  }

  if (!user || role !== "admin") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoutes;
