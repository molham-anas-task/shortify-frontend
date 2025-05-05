import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { JSX } from "react";

const ProtectedRoute: React.FC<{
  children: JSX.Element;
}> = ({ children }: { children: JSX.Element }) => {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
