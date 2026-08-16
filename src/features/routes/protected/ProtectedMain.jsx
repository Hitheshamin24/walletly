import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthHook } from "../../auth/hooks/useAuthHook";
import { addUser } from "../../auth/state/authSlice";

const ProtectedMain = () => {
  const { dispatch, hydrateUser, selector } = useAuthHook();
  useEffect(() => {
    const currentUser = hydrateUser();
    dispatch(addUser(currentUser));
  }, []);

  if (!selector) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedMain;
