import React from "react";
import { useAuthHook } from "../../auth/hooks/useAuthHook";
import { Navigate, Outlet } from "react-router";

const ProtectedPublic = () => {
  const { isAuthenticated } = useAuthHook();
  if (isAuthenticated) {
    return <Navigate to={"/main"} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedPublic;
