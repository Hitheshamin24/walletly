import {
  ShoppingCart,
  Utensils,
  Car,
  Home,
  CircleDollarSign,
  ChevronRight,
} from "lucide-react";

const activities = [
  {
    icon: ShoppingCart,
    title: "Whole Foods Market",
    category: "Groceries",
    date: "Today, 10:42 AM",
    amount: "-$82.50",
    type: "expense",
  },
  {
    icon: Utensils,
    title: "The Coffee House",
    category: "Food & Dining",
    date: "Today, 08:15 AM",
    amount: "-$12.40",
    type: "expense",
  },
  {
    icon: CircleDollarSign,
    title: "Salary Deposit",
    category: "Income",
    date: "Yesterday",
    amount: "+$4,200.00",
    type: "income",
  },
  {
    icon: Car,
    title: "Chevron Gas Station",
    category: "Transportation",
    date: "Yesterday",
    amount: "-$54.20",
    type: "expense",
  },
  {
    icon: Home,
    title: "Rent Payment",
    category: "Housing",
    date: "Aug 24, 2026",
    amount: "-$1,200.00",
    type: "expense",
  },
];

const RecentActivityCard = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Recent Activity
          </h3>
          <p className="text-[10px] text-slate-400">Your latest transactions</p>
        </div>

        <button className="flex items-center gap-1 text-[10px] font-semibold text-teal-700">
          View All
          <ChevronRight size={12} />
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.title}
              className="flex items-center gap-3 py-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500">
                <Icon size={14} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold text-slate-700">
                  {activity.title}
                </p>
                <p className="text-[9px] text-slate-400">
                  {activity.category} · {activity.date}
                </p>
              </div>

              <span
                className={`text-[11px] font-semibold ${
                  activity.type === "income"
                    ? "text-emerald-600"
                    : "text-slate-700"
                }`}
              >
                {activity.amount}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivityCard;
