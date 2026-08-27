import { Wallet, TrendingUp, TrendingDown, Target } from "lucide-react";

const stats = [
  {
    title: "Total Balance",
    value: "$24,500",
    change: "+12.5%",
    positive: true,
    icon: Wallet,
  },
  {
    title: "Income",
    value: "$5,200",
    change: "+8.2%",
    positive: true,
    icon: TrendingUp,
  },
  {
    title: "Expenses",
    value: "$3,100",
    change: "-4.5%",
    positive: true,
    icon: TrendingDown,
  },
  {
    title: "Savings",
    value: "$2,100",
    change: "+15.3%",
    positive: true,
    icon: Target,
  },
];

const StatsGrid = () => {
  return (
    <section className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
      {stats.map((stat) => {
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
                {stat.change}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default StatsGrid;
