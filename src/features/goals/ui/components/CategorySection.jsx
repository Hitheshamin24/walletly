import { TrendingUp, TrendingDown } from "lucide-react";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const getMonthKey = (dateStr) => {
  if (!dateStr) return null;
  if (dateStr.includes("-")) {
    const [y, m] = dateStr.split("-");
    return `${y}-${m}`;
  }
  const [, m, y] = dateStr.split("/");
  return `${y}-${m.padStart(2, "0")}`;
};

const CATEGORY_COLORS = [
  "#0f766e", "#2563eb", "#7c3aed", "#d97706", "#e11d48", "#16a34a", "#0284c7",
];

const CategorySection = ({ fmt }) => {
  const { transactions } = useSelector((s) => s.transactions);

  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const { incomeByCategory, expenseByCategory, totalIncome, totalExpense } = useMemo(() => {
    const incMap = {};
    const expMap = {};
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((t) => {
      if (getMonthKey(t.transactionDate) !== thisMonth) return;
      const amt = Number(t.amount ?? 0);
      const cat = t.transactionCategory || "Other";

      if (t.transactionType === "income") {
        incMap[cat] = (incMap[cat] ?? 0) + amt;
        totalIncome += amt;
      } else if (t.transactionType === "expense") {
        expMap[cat] = (expMap[cat] ?? 0) + amt;
        totalExpense += amt;
      }
    });

    const incomeByCategory = Object.entries(incMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const expenseByCategory = Object.entries(expMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

    return { incomeByCategory, expenseByCategory, totalIncome, totalExpense };
  }, [transactions, thisMonth]);

  const monthLabel = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const renderRows = (rows, total, colorBase) =>
    rows.length === 0 ? (
      <p className="py-3 text-center text-[10px] text-slate-400">No data this month</p>
    ) : (
      rows.map(([name, amount], i) => {
        const pct = total > 0 ? Math.round((amount / total) * 100) : 0;
        return (
          <div key={name} className="flex items-center gap-3">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }}
            />
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 flex justify-between">
                <span className="truncate text-[10px] font-medium capitalize text-slate-600">{name}</span>
                <span className="ml-2 shrink-0 text-[10px] font-semibold text-slate-700">{fmt(amount)}</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
                  }}
                />
              </div>
            </div>
            <span className="w-8 shrink-0 text-right text-[9px] text-slate-400">{pct}%</span>
          </div>
        );
      })
    );

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Income */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <TrendingUp size={13} className="text-teal-600" />
            <h2 className="text-sm font-semibold text-slate-700">Income by Category</h2>
          </div>
          <span className="text-[9px] text-slate-400">{monthLabel}</span>
        </div>
        <p className="mb-3 text-xl font-bold text-teal-600">{fmt(totalIncome)}</p>
        <div className="space-y-3">{renderRows(incomeByCategory, totalIncome)}</div>
      </div>

      {/* Expenses */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <TrendingDown size={13} className="text-rose-500" />
            <h2 className="text-sm font-semibold text-slate-700">Expenses by Category</h2>
          </div>
          <span className="text-[9px] text-slate-400">{monthLabel}</span>
        </div>
        <p className="mb-3 text-xl font-bold text-rose-500">{fmt(totalExpense)}</p>
        <div className="space-y-3">{renderRows(expenseByCategory, totalExpense)}</div>
      </div>
    </div>
  );
};

export default CategorySection;
