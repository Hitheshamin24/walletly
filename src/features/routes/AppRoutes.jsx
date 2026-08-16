import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import LoginPage from "../auth/ui/pages/LoginPage";
import RegisterPage from "../auth/ui/pages/RegisterPage";
import AuthLayout from "../../app/layouts/AuthLayout";
import MainLayout from "../../app/layouts/MainLayout";
import ProtectedPublic from "./protected/ProtectedPublic";
import ProtectedMain from "./protected/ProtectedMain";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedPublic />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              index: true,
              element: <Navigate to={"login"} />,
            },
            {
              path: "login",

              element: <LoginPage />,
            },
            {
              path: "register",
              element: <RegisterPage />,
            },
          ],
        },
      ],
    },
    {
      path: "/main",
      element: <ProtectedMain />,
      children: [
        {
          path: "",
          element: <MainLayout />,
        },
      ],
    },
  ]);


  return <RouterProvider router={router} />;
};

export default AppRoutes;
