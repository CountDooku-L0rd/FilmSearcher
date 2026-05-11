import type React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: React.ReactNode;
}) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
