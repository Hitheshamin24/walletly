import { CalendarDays, TrendingDown, Bell } from "lucide-react";

const RecurringSummary = ({ summary, fmt }) => {
  const { totalMonthly, activeCount, dueSoon } = summary;

  const now = new Date();
  const monthName = now.toLocaleString("en-US", { month: "long" });

  return (
    <div className="space-y-4">
      {/* Monthly total card */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-teal-50 text-teal-600">
            <CalendarDays size={14} />
          </div>
          <div>
            <p className="text-[9px] font-semibold text-slate-600">Upcoming this</p>
            <p className="text-[9px] font-semibold text-slate-600">Month</p>
          </div>
        </div>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          {fmt(totalMonthly)}
        </h2>
        <p className="mt-0.5 text-[9px] text-slate-400">
          {activeCount} active recurring in {monthName}
        </p>
      </div>

      {/* Due soon */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-2">
          <div className={`flex h-7 w-7 items-center justify-center rounded-md ${dueSoon > 0 ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-400"}`}>
            <Bell size={13} />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-700">Due Soon</p>
            <p className="text-[9px] text-slate-400">Within 7 days</p>
          </div>
        </div>
        <p className={`mt-2 text-2xl font-bold ${dueSoon > 0 ? "text-amber-600" : "text-slate-300"}`}>
          {dueSoon}
        </p>
        <p className="text-[9px] text-slate-400">
          {dueSoon === 0 ? "No upcoming payments" : `${dueSoon} payment${dueSoon > 1 ? "s" : ""} coming up`}
        </p>
      </div>

      {/* Expense vs Income split */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-rose-50 text-rose-500">
            <TrendingDown size={13} />
          </div>
          <p className="text-[10px] font-semibold text-slate-700">Monthly Expenses</p>
        </div>
        <p className="text-xl font-bold text-rose-500">{fmt(summary.totalExpense)}</p>
        <p className="mt-0.5 text-[9px] text-slate-400">from recurring expenses</p>
      </div>
    </div>
  );
};

export default RecurringSummary;
