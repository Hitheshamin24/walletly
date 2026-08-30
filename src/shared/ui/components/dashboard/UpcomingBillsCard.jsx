import { CalendarDays, ArrowRight, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";
import { useDashboard } from "../../../hooks/useDashboard";
import { useRecurringHook } from "../../../../features/recurring/hooks/useRecurringHook";

const UpcomingBillsCard = () => {
  const navigate = useNavigate();
  const { fmt } = useDashboard();
  const { items } = useRecurringHook();

  // Show next 4 upcoming (non-paused), sorted by next date
  const upcoming = [...items]
    .filter((r) => !r.paused)
    .sort((a, b) => new Date(a.nextDate) - new Date(b.nextDate))
    .slice(0, 4);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Upcoming Bills</h3>
          <p className="text-[10px] text-slate-400">Next 30 days</p>
        </div>
        <CalendarDays size={15} className="text-slate-400" />
      </div>

      {upcoming.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-4 text-center">
          <CalendarDays size={20} className="text-slate-200" />
          <p className="text-[11px] text-slate-500">No upcoming bills</p>
          <button
            onClick={() => navigate("/main/recurring")}
            className="flex items-center gap-1 rounded-md bg-slate-50 px-3 py-1.5 text-[10px] font-medium text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            Set up Recurring <ArrowRight size={10} />
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {upcoming.map((bill) => (
            <div
              key={bill.id}
              className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                bill.isOverdue ? "bg-red-50" : bill.isDueSoon ? "bg-amber-50" : "bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                {(bill.isOverdue || bill.isDueSoon) && (
                  <AlertTriangle
                    size={10}
                    className={bill.isOverdue ? "shrink-0 text-red-400" : "shrink-0 text-amber-400"}
                  />
                )}
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-semibold text-slate-700">{bill.name}</p>
                  <p className={`text-[9px] ${bill.isOverdue ? "text-red-400" : "text-slate-400"}`}>
                    {bill.isOverdue ? "Overdue · " : ""}{bill.nextDateFormatted}
                    {!bill.isOverdue && ` · ${bill.daysUntil}d`}
                  </p>
                </div>
              </div>
              <span className={`shrink-0 text-[10px] font-semibold ${bill.type === "income" ? "text-teal-600" : "text-slate-700"}`}>
                {bill.type === "income" ? "+" : "-"}{fmt(bill.amount)}
              </span>
            </div>
          ))}

          <button
            onClick={() => navigate("/main/recurring")}
            className="flex w-full items-center justify-center gap-1 pt-1 text-[10px] text-teal-600 hover:underline cursor-pointer"
          >
            View all <ArrowRight size={10} />
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingBillsCard;
