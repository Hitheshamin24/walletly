import { Navigate, Outlet } from "react-router";
import { useAuthHook } from "../../auth/hooks/useAuthHook";

const ProtectedMain = () => {
  const { isAuthenticated } = useAuthHook();

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedMain;
