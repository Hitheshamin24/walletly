import React from "react";
import { useAuthHook } from "../../features/auth/hooks/useAuthHook";

const MainLayout = () => {
  const { logoutUser } = useAuthHook();
  return (
    <div>
      MainLayout <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default MainLayout;
