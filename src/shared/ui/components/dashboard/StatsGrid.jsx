import { Wallet, TrendingUp, TrendingDown, Target } from "lucide-react";
import { useDashboard } from "../../../hooks/useDashboard";

const StatsGrid = () => {
  const { stats, fmt } = useDashboard();

  const items = [
    {
      title: "Total Balance",
      value: fmt(stats.totalBalance),
      sub: "across all accounts",
      positive: true,
      icon: Wallet,
    },
    {
      title: "Income",
      value: fmt(stats.monthlyIncome),
      sub: "this month",
      positive: true,
      icon: TrendingUp,
    },
    {
      title: "Expenses",
      value: fmt(stats.monthlyExpense),
      sub: "this month",
      positive: stats.monthlyExpense === 0,
      icon: TrendingDown,
    },
    {
      title: "Savings",
      value: fmt(Math.max(0, stats.savings)),
      sub: "income − expenses",
      positive: stats.savings >= 0,
      icon: Target,
    },
  ];

  return (
    <section className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
      {items.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                {stat.title}
              </p>
              <div className="rounded-md bg-teal-50 p-1.5 text-teal-600">
                <Icon size={14} />
              </div>
            </div>

            <div className="flex items-end justify-between gap-2">
              <h3 className="text-xl font-bold tracking-tight text-slate-800">
                {stat.value}
              </h3>
              <span
                className={`text-[10px] font-semibold ${
                  stat.positive ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {stat.sub}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default StatsGrid;
