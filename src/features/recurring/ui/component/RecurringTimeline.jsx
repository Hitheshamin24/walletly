import { CalendarDays, ChevronRight, List } from "lucide-react";

const RecurringTimeline = ({ transactions }) => {
  return (
    <div>
      {/* Timeline header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-50 text-amber-600">
            <CalendarDays size={12} />
          </div>
          <h2 className="text-xs font-bold text-slate-800">Timeline</h2>
        </div>

        {/* View switcher */}
        <div className="flex overflow-hidden rounded-md border border-slate-200 bg-white">
          <button
            type="button"
            className="flex items-center gap-1 border-r border-slate-200 bg-slate-50 px-2 py-1 text-[7px] font-semibold text-slate-700"
          >
            <List size={9} />
            List
          </button>

          <button
            type="button"
            className="flex items-center gap-1 px-2 py-1 text-[7px] font-medium text-slate-400 hover:bg-slate-50"
          >
            <CalendarDays size={9} />
            Calendar
          </button>
        </div>
      </div>

      {/* Timeline items */}
      <div className="space-y-2">
        {transactions.map((transaction) => {
          const Icon = transaction.icon;
          return (
            <div
              key={transaction.name}
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:shadow-sm"
            >
              {/* Icon */}
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${transaction.iconBg} ${transaction.iconColor}`}
              >
                <Icon size={13} />
              </div>

              {/* Details */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-[9px] font-semibold text-slate-700">
                  {transaction.name}
                </p>

                <div className="mt-0.5 flex items-center gap-1">
                  <span className="text-[7px] text-slate-400">
                    {transaction.frequency}
                  </span>
                  <span className="text-[7px] text-slate-300">•</span>
                  <span className="text-[7px] text-slate-400">
                    Next {transaction.nextDate}
                  </span>
                </div>
              </div>

              {/* Amount + chevron */}
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-semibold text-slate-700">
                  {transaction.amount}
                </span>

                <button
                  type="button"
                  className="text-slate-300 hover:text-slate-600"
                >
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecurringTimeline;
