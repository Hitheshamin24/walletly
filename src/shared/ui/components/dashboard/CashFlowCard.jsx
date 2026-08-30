import { useDashboard } from "../../../hooks/useDashboard";

const CashFlowCard = () => {
  const { cashFlow } = useDashboard();

  const maxValue = Math.max(
    ...cashFlow.map((m) => Math.max(m.income, m.expense)),
    1,
  );

  const yLabels = [maxValue, maxValue * 0.75, maxValue * 0.5, maxValue * 0.25, 0];

  const fmtY = (v) => {
    if (v === 0) return "$0";
    if (v >= 1000) return `$${(v / 1000).toFixed(1)}k`;
    return `$${Math.round(v)}`;
  };

  const isEmpty = cashFlow.every((m) => m.income === 0 && m.expense === 0);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Cash Flow</h3>
          <p className="text-[10px] text-slate-400">Last 6 months</p>
        </div>
        <span className="rounded-md border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-500">
          Last 6 Months
        </span>
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

      {isEmpty ? (
        <div className="flex h-52 flex-col items-center justify-center gap-2 text-slate-300">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 3v18h18" /><path d="M18 12l-5-5-4 4-3-3" />
          </svg>
          <p className="text-[11px] text-slate-400">No transactions yet</p>
          <p className="text-[10px] text-slate-300">Add transactions to see cash flow</p>
        </div>
      ) : (
        /* Chart */
        <div className="relative h-52">
          {/* Y-axis grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {yLabels.map((value, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[9px] text-slate-400"
              >
                <span className="w-8 text-right">{fmtY(value)}</span>
                <div className="h-px flex-1 border-t border-dashed border-slate-100" />
              </div>
            ))}
          </div>

          {/* Bars */}
          <div className="absolute bottom-5 left-10 right-0 top-0 flex items-end justify-around">
            {cashFlow.map((item) => (
              <div
                key={item.month}
                className="flex h-full w-12 flex-col items-center justify-end"
              >
                <div className="flex h-full items-end gap-1">
                  <div
                    className="w-3 rounded-t-sm bg-teal-600 transition-all duration-500"
                    style={{ height: `${(item.income / maxValue) * 100}%`, minHeight: item.income > 0 ? "4px" : "0" }}
                    title={`Income: $${item.income.toFixed(2)}`}
                  />
                  <div
                    className="w-3 rounded-t-sm bg-red-400 transition-all duration-500"
                    style={{ height: `${(item.expense / maxValue) * 100}%`, minHeight: item.expense > 0 ? "4px" : "0" }}
                    title={`Expense: $${item.expense.toFixed(2)}`}
                  />
                </div>
                <span className="mt-2 text-[9px] text-slate-400">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CashFlowCard;
