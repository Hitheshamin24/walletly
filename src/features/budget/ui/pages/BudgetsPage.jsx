import { Home, ShoppingCart } from "lucide-react";
import BudgetHeader from "../components/BudgetHeader";
import CategoryBudgets from "../components/CategoryBudgets";
import SavingsGoals from "../components/SavingsGoals";
import BudgetAlerts from "../components/BudgetAlerts";

const budgets = [
  {
    name: "Housing",
    amount: "$1,850",
    limit: "$2,000",
    percentage: 92,
    remaining: "$150 remaining",
    icon: Home,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    progress: "bg-teal-500",
  },
  {
    name: "Groceries",
    amount: "$620",
    limit: "$500",
    percentage: 124,
    remaining: "$120 over limit",
    icon: ShoppingCart,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    progress: "bg-red-500",
  },
];

const goals = [
  {
    name: "Emergency Fund",
    saved: "$7,500",
    target: "$10,000",
    percentage: 75,
    date: "Oct 26, 2026",
  },
  {
    name: "Vacation",
    saved: "$1,500",
    target: "$5,000",
    percentage: 30,
    date: "Jun 15, 2026",
  },
];

const BudgetsPage = () => {
  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-800">
      <main className="px-4 py-4">
        <div className="mx-auto max-w-6xl">
          <BudgetHeader />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_205px]">
            {/* Left column */}
            <div>
              <CategoryBudgets budgets={budgets} />
              <SavingsGoals goals={goals} />
            </div>

            {/* Right column */}
            <BudgetAlerts />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BudgetsPage;