const MONTHS = [
  { month: "Mar", income: 3200, expense: 2200 },
  { month: "Apr", income: 4100, expense: 2600 },
  { month: "May", income: 3500, expense: 1900 },
  { month: "Jun", income: 4700, expense: 2500 },
  { month: "Jul", income: 3900, expense: 2100 },
  { month: "Aug", income: 5200, expense: 3100 },
];

const Y_LABELS = [5000, 4000, 3000, 2000, 1000, 0];
const MAX_VALUE = 5200;

const CashFlowCard = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Cash Flow</h3>
          <p className="text-[10px] text-slate-400">Last 6 months</p>
        </div>

        <button className="rounded-md border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-500">
          Last 6 Months
        </button>
      </div>

      {/* Legend */}
      <div className="mb-4 flex justify-end gap-4 text-[9px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-teal-600" />
          Income
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-red-400" />
          Expenses
        </span>
      </div>

      {/* Chart */}
      <div className="relative h-52">
        {/* Y-axis grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {Y_LABELS.map((value) => (
            <div
              key={value}
              className="flex items-center gap-2 text-[9px] text-slate-400"
            >
              <span className="w-6 text-right">
                {value === 0 ? "$0" : `$${value / 1000}k`}
              </span>
              <div className="h-px flex-1 border-t border-dashed border-slate-100" />
            </div>
          ))}
        </div>

        {/* Bars */}
        <div className="absolute bottom-5 left-9 right-0 top-0 flex items-end justify-around">
          {MONTHS.map((item) => (
            <div
              key={item.month}
              className="flex h-full w-12 flex-col items-center justify-end"
            >
              <div className="flex h-full items-end gap-1">
                <div
                  className="w-2 rounded-t-sm bg-teal-600"
                  style={{ height: `${(item.income / MAX_VALUE) * 100}%` }}
                />
                <div
                  className="w-2 rounded-t-sm bg-red-400"
                  style={{ height: `${(item.expense / MAX_VALUE) * 100}%` }}
                />
              </div>
              <span className="mt-2 text-[9px] text-slate-400">
                {item.month}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CashFlowCard;
