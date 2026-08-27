const expenseCategories = [
  { name: "Housing", value: "35%", amount: "$1,085" },
  { name: "Food", value: "25%", amount: "$775" },
  { name: "Transport", value: "15%", amount: "$465" },
  { name: "Bills", value: "10%", amount: "$310" },
  { name: "Other", value: "15%", amount: "$465" },
];

const DOT_COLORS = [
  "bg-indigo-600",
  "bg-teal-500",
  "bg-amber-500",
  "bg-orange-500",
  "bg-slate-300",
];

const ExpenseBreakdownCard = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-800">
          Expense Breakdown
        </h3>
        <p className="text-[10px] text-slate-400">This month</p>
      </div>

      {/* Donut chart */}
      <div className="flex justify-center py-2">
        <div
          className="relative h-36 w-36 rounded-full"
          style={{
            background:
              "conic-gradient(#4f46e5 0deg 126deg, #14b8a6 126deg 216deg, #f59e0b 216deg 270deg, #f97316 270deg 306deg, #cbd5e1 306deg 360deg)",
          }}
        >
          <div className="absolute inset-5.5 flex flex-col items-center justify-center rounded-full bg-white">
            <span className="text-[9px] text-slate-400">Total</span>
            <strong className="text-base font-bold text-slate-800">
              $3,100
            </strong>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 space-y-2">
        {expenseCategories.map((category, index) => (
          <div
            key={category.name}
            className="flex items-center justify-between text-[10px]"
          >
            <span className="flex items-center gap-2 text-slate-500">
              <span className={`h-2 w-2 rounded-full ${DOT_COLORS[index]}`} />
              {category.name}
            </span>
            <span className="font-medium text-slate-600">{category.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseBreakdownCard;
