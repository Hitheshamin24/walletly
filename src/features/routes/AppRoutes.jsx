import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import LoginPage from "../auth/ui/pages/LoginPage";
import RegisterPage from "../auth/ui/pages/RegisterPage";
import AuthLayout from "../../app/layouts/AuthLayout";
import MainLayout from "../../app/layouts/MainLayout";
import ProtectedPublic from "./protected/ProtectedPublic";
import ProtectedMain from "./protected/ProtectedMain";
import DashboardPage from "../../shared/ui/pages/DashboardPage";
import TransactionPage from "../transactions/ui/page/TransactionPage";
import AccountsPage from "../account/ui/pages/AccountsPage";
import BudgetsPage from "../budget/ui/pages/BudgetsPage";
import GoalPage from "../goals/ui/pages/GoalPage";
import RecurringPage from "../recurring/ui/pages/RecurringPage";
import AnalyticsPage from "../analytics/ui/pages/AnalyticsPage";

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
          children: [
            {
              index: true,
              element: <Navigate to={"/main/dashboard"} />,
            },
            {
              path: "dashboard",
              element: <DashboardPage />,
            },
            {
              path: "transactions",
              element: <TransactionPage />,
            },
            {
              path: "accounts",
              element: <AccountsPage />,
            },
            {
              path: "budgets",
              element: <BudgetsPage />,
            },
            {
              path: "goals",
              element: <GoalPage />,
            },
            {
              path: "analytics",
              element: <AnalyticsPage />,
            },
            {
              path: "recurring",
              element: <RecurringPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
