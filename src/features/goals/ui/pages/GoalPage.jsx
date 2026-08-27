import { Wallet, TrendingUp, House, Utensils, Car, Plane } from "lucide-react";
import GoalHeader from "../components/GoalHeader";
import CategorySection from "../components/CategorySection";
import GoalsSection from "../components/GoalsSection";

const incomeCategories = [
  {
    name: "Salary",
    description: "Primary Income",
    amount: "$5,200.00",
    icon: Wallet,
  },
  {
    name: "Investments",
    description: "Dividends & Returns",
    amount: "$450.00",
    icon: TrendingUp,
  },
];

const expenseCategories = [
  {
    name: "Housing",
    description: "Limit: $2,000",
    amount: "$1,850.00",
    icon: House,
    color: "text-red-500",
    bg: "bg-red-50",
    progress: "92%",
    progressColor: "bg-red-500",
  },
  {
    name: "Food & Dining",
    description: "Limit: $600",
    amount: "$640.00",
    icon: Utensils,
    color: "text-red-500",
    bg: "bg-red-50",
    progress: "100%",
    progressColor: "bg-red-500",
  },
  {
    name: "Transportation",
    description: "Limit: $400",
    amount: "$320.00",
    icon: Car,
    color: "text-red-500",
    bg: "bg-red-50",
    progress: "80%",
    progressColor: "bg-teal-500",
  },
];

const goals = [
  {
    title: "Japan Trip 2025",
    description: "Deadline: Oct 2025",
    current: "$3,200",
    target: "$5,000",
    percentage: 64,
    icon: Plane,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    contributions: [
      ["Auto-transfer", "Aug 1", "+$200"],
      ["Bonus allocation", "Jul 15", "+$500"],
    ],
  },
  {
    title: "House Down Payment",
    description: "Deadline: Dec 2026",
    current: "$15,500",
    target: "$40,000",
    percentage: 38,
    icon: House,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    contributions: [
      ["Auto-transfer", "Aug 1", "+$500"],
      ["Tax Refund", "Apr 20", "+$2,100"],
    ],
  },
];

const GoalPage = () => {
  return (
    <div className="min-h-screen bg-[#f7f8fc] px-4 py-4 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <GoalHeader />
        <CategorySection
          incomeCategories={incomeCategories}
          expenseCategories={expenseCategories}
        />
        <GoalsSection goals={goals} />
      </div>
    </div>
  );
};

export default GoalPage;