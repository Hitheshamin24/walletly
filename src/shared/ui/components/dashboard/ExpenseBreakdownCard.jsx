import { useDashboard } from "../../../hooks/useDashboard";

const DOT_COLORS = [
  "bg-indigo-600",
  "bg-teal-500",
  "bg-amber-500",
  "bg-orange-500",
  "bg-slate-300",
];

// Build a conic-gradient string from category percentages
const buildGradient = (slices) => {
  const colors = ["#4f46e5", "#14b8a6", "#f59e0b", "#f97316", "#cbd5e1"];
  let deg = 0;
  const parts = slices.map(([, amount], i) => {
    const color = colors[i] ?? "#cbd5e1";
    return { color, amount };
  });
  const total = parts.reduce((s, p) => s + p.amount, 0) || 1;
  const segments = parts.map((p) => {
    const start = deg;
    const end = deg + (p.amount / total) * 360;
    deg = end;
    return `${p.color} ${start.toFixed(1)}deg ${end.toFixed(1)}deg`;
  });
  return `conic-gradient(${segments.join(", ")})`;
};

const ExpenseBreakdownCard = () => {
  const { expenseBreakdown, fmt } = useDashboard();
  const { categories, total } = expenseBreakdown;

  const isEmpty = categories.length === 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-800">
          Expense Breakdown
        </h3>
        <p className="text-[10px] text-slate-400">This month</p>
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center gap-2 py-6 text-slate-300">
          <div className="h-24 w-24 rounded-full border-4 border-dashed border-slate-100" />
          <p className="text-[11px] text-slate-400">No expenses this month</p>
        </div>
      ) : (
        <>
          {/* Donut chart */}
          <div className="flex justify-center py-2">
            <div
              className="relative h-36 w-36 rounded-full"
              style={{ background: buildGradient(categories) }}
            >
              <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white">
                <span className="text-[9px] text-slate-400">Total</span>
                <strong className="text-base font-bold text-slate-800">
                  {fmt(total)}
                </strong>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-3 space-y-2">
            {categories.map(([name, amount], index) => {
              const pct = total > 0 ? ((amount / total) * 100).toFixed(0) : 0;
              return (
                <div
                  key={name}
                  className="flex items-center justify-between text-[10px]"
                >
                  <span className="flex items-center gap-2 text-slate-500 capitalize">
                    <span className={`h-2 w-2 rounded-full ${DOT_COLORS[index] ?? "bg-slate-300"}`} />
                    {name}
                  </span>
                  <span className="font-medium text-slate-600">{pct}%</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseBreakdownCard;
