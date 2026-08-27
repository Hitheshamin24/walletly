import { Utensils, Wallet, CreditCard } from "lucide-react";
import AnalyticsHeader from "../components/AnalyticsHeader";
import AIInsightBanner from "../components/AIInsightBanner";
import SummaryCards from "../components/SummaryCards";
import ChartsRow from "../components/ChartsRow";
import BalanceDistribution from "../components/BalanceDistribution";

const summaryCards = [
  {
    title: "HIGHEST EXPENSE",
    name: "Food & Dining",
    amount: "$850",
    icon: Utensils,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    title: "TOP INCOME",
    name: "Salary",
    amount: "$4,500",
    icon: Wallet,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    title: "AVG. / DAY",
    name: "Spending Rate",
    amount: "$102",
    icon: CreditCard,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-500",
  },
];

const categories = [
  { name: "Housing", amount: "$1,850", percentage: 59, color: "bg-teal-600" },
  { name: "Food", amount: "$850", percentage: 27, color: "bg-red-400" },
  { name: "Transport", amount: "$420", percentage: 14, color: "bg-blue-500" },
  { name: "Entertainment", amount: "$210", percentage: 7, color: "bg-orange-400" },
];

const balanceItems = [
  { name: "Savings", amount: "$13,200", percentage: "55%", color: "bg-teal-500" },
  { name: "Bank Rent", amount: "$7,200", percentage: "30%", color: "bg-indigo-500" },
  { name: "Wallet", amount: "$3,600", percentage: "15%", color: "bg-amber-400" },
];

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-[#f7f8fc] px-4 py-4 text-slate-800 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <AnalyticsHeader />
        <AIInsightBanner />
        <SummaryCards cards={summaryCards} />
        <ChartsRow categories={categories} />
        <BalanceDistribution balanceItems={balanceItems} />
      </div>
    </div>
  );
};

export default AnalyticsPage;