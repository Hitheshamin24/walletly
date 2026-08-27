const Y_LABELS = [5000, 4000, 3000, 2000, 1000, 0];
const MAX_VALUE = 5000;

const MONTHS = [
  { month: "Mar", income: 2300, expense: 1200 },
  { month: "Apr", income: 3200, expense: 1800 },
  { month: "May", income: 2700, expense: 1400 },
  { month: "Jun", income: 4100, expense: 2200 },
  { month: "Jul", income: 3000, expense: 1900 },
  { month: "Aug", income: 4500, expense: 2500 },
];

/* ── Cash Flow bar chart ──────────────────────────────────── */
const CashFlowChart = () => (
  <div className="rounded-md border border-slate-200 bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
    <div className="mb-2 flex items-center justify-between">
      <div>
        <h2 className="text-[9px] font-bold text-slate-700">Cash Flow</h2>
        <p className="text-[6px] text-slate-400">Income vs expenses</p>
      </div>
      <button className="text-[7px] font-medium text-teal-600">Details</button>
    </div>

    <div className="relative h-40">
      {/* Grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {Y_LABELS.map((value) => (
          <div key={value} className="flex items-center gap-2">
            <span className="w-6 text-right text-[6px] text-slate-400">
              {value === 0 ? "$0" : `$${value / 1000}k`}
            </span>
            <div className="h-px flex-1 border-t border-dashed border-slate-100" />
          </div>
        ))}
      </div>

      {/* Bars */}
      <div className="absolute bottom-4 left-8 right-1 top-0 flex items-end justify-around">
        {MONTHS.map((item) => (
          <div
            key={item.month}
            className="flex h-full flex-col items-center justify-end"
          >
            <div className="flex h-full items-end gap-0.5">
              <div
                className="w-3 rounded-t-sm bg-teal-600"
                style={{ height: `${(item.income / MAX_VALUE) * 100}%` }}
              />
              <div
                className="w-3 rounded-t-sm bg-red-400"
                style={{ height: `${(item.expense / MAX_VALUE) * 100}%` }}
              />
            </div>
            <span className="mt-1.5 text-[6px] text-slate-400">
              {item.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Category breakdown bars ──────────────────────────────── */
const CategoryBreakdown = ({ categories }) => (
  <div className="rounded-md border border-slate-200 bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
    <div className="mb-3">
      <h2 className="text-[9px] font-bold text-slate-700">
        Category vs Last Month
      </h2>
      <p className="text-[6px] text-slate-400">Spending comparison</p>
    </div>

    <div className="space-y-3">
      {categories.map((category) => (
        <div key={category.name}>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[7px] font-medium text-slate-600">
              {category.name}
            </span>
            <span className="text-[7px] font-semibold text-slate-500">
              {category.amount}
            </span>
          </div>
          <div className="h-1 rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${category.color}`}
              style={{ width: `${category.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ── Charts row (cash flow + category) ───────────────────── */
const ChartsRow = ({ categories }) => (
  <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.5fr)_minmax(220px,0.7fr)]">
    <CashFlowChart />
    <CategoryBreakdown categories={categories} />
  </div>
);

export default ChartsRow;
