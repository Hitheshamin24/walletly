/* ── Cash Flow bar chart ──────────────────────────────────── */
const CashFlowChart = ({ cashFlowData, currencySymbol }) => {
  const { months, chartMax, yLabels } = cashFlowData;

  return (
    <div className="rounded-md border border-slate-200 bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h2 className="text-[9px] font-bold text-slate-700">Cash Flow</h2>
          <p className="text-[6px] text-slate-400">Income vs expenses</p>
        </div>
      </div>

      <div className="relative h-40">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {yLabels.map((value) => (
            <div key={value} className="flex items-center gap-2">
              <span className="w-6 text-right text-[6px] text-slate-400">
                {value === 0 ? `${currencySymbol}0` : `${currencySymbol}${value >= 1000 ? (value / 1000) + 'k' : value}`}
              </span>
              <div className="h-px flex-1 border-t border-dashed border-slate-100" />
            </div>
          ))}
        </div>

        {/* Bars */}
        <div className="absolute bottom-4 left-8 right-1 top-0 flex items-end justify-around">
          {months.map((item) => (
            <div
              key={item.month}
              className="flex h-full flex-col items-center justify-end"
            >
              <div className="flex h-full items-end gap-0.5">
                <div
                  className="w-3 rounded-t-sm bg-teal-600 transition-all duration-500"
                  style={{ height: `${chartMax > 0 ? (item.income / chartMax) * 100 : 0}%` }}
                  title={`Income: ${item.income}`}
                />
                <div
                  className="w-3 rounded-t-sm bg-red-400 transition-all duration-500"
                  style={{ height: `${chartMax > 0 ? (item.expense / chartMax) * 100 : 0}%` }}
                  title={`Expense: ${item.expense}`}
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
};

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
      {categories.length === 0 ? (
         <div className="text-[9px] text-slate-400 flex items-center justify-center py-10">No expenses this month</div>
      ) : (
        categories.map((category) => (
          <div key={category.name}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[7px] font-medium text-slate-600 truncate w-24">
                {category.name}
              </span>
              <span className="text-[7px] font-semibold text-slate-500">
                {category.amount}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 mb-1">
              <div
                className={`h-full rounded-full transition-all duration-500 ${category.color}`}
                style={{ width: `${category.percentage}%` }}
              />
            </div>
            <div className="flex justify-between">
               <span className="text-[6px] text-slate-400">{category.percentage}% of total</span>
               <span className={`text-[6px] ${category.changeType === 'higher' ? 'text-red-500' : category.changeType === 'lower' ? 'text-teal-600' : 'text-slate-400'}`}>
                  {category.changeText}
               </span>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

/* ── Charts row (cash flow + category) ───────────────────── */
const ChartsRow = ({ cashFlowData, categories, currencySymbol }) => (
  <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.5fr)_minmax(220px,0.7fr)]">
    <CashFlowChart cashFlowData={cashFlowData} currencySymbol={currencySymbol} />
    <CategoryBreakdown categories={categories} />
  </div>
);

export default ChartsRow;
