import { CalendarDays } from "lucide-react";

const BUDGET_PERCENT = 63;

const RecurringSummary = () => {
  return (
    <div className="rounded-lg bg-transparent">
      <div className="mb-1 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-50 text-teal-600">
          <CalendarDays size={13} />
        </div>

        <div>
          <p className="text-[9px] font-semibold text-slate-600">
            Upcoming this
          </p>
          <p className="text-[9px] font-semibold text-slate-600">Month</p>
        </div>
      </div>

      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
        $1,450.00
      </h2>

      <p className="mt-1 text-[8px] text-slate-400">
        4 payments remaining in November
      </p>

      {/* Budget progress */}
      <div className="mt-8">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[7px] font-medium text-slate-500">
            Budget utilized
          </span>
          <span className="text-[7px] font-medium text-teal-600">
            {BUDGET_PERCENT}%
          </span>
        </div>

        <div className="h-1 rounded-full bg-slate-200">
          <div
            className="h-1 rounded-full bg-teal-600"
            style={{ width: `${BUDGET_PERCENT}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default RecurringSummary;
