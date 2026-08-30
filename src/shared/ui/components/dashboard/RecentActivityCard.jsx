import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useDashboard } from "../../../hooks/useDashboard";
import { getCategoryStyle, getAmountStyle } from "../../../../features/transactions/constants/categoryConstants";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  if (dateStr.includes("/")) {
    const [d, m, y] = dateStr.split("/");
    return new Date(`${y}-${m}-${d}`).toLocaleDateString("en-US", {
      month: "short", day: "numeric",
    });
  }
  const [y, m, d] = dateStr.split("-");
  return new Date(`${y}-${m}-${d}`).toLocaleDateString("en-US", {
    month: "short", day: "numeric",
  });
};

const RecentActivityCard = () => {
  const { recentActivity, fmt } = useDashboard();
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Recent Activity
          </h3>
          <p className="text-[10px] text-slate-400">Your latest transactions</p>
        </div>

        <button
          onClick={() => navigate("/main/transactions")}
          className="flex items-center gap-1 text-[10px] font-semibold text-teal-700 hover:underline cursor-pointer"
        >
          View All
          <ChevronRight size={12} />
        </button>
      </div>

      {recentActivity.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-slate-300">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
          </svg>
          <p className="text-[11px] text-slate-400">No transactions yet</p>
          <p className="text-[10px] text-slate-300">Your recent transactions will appear here</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {recentActivity.map((t) => {
            const dotStyle = getCategoryStyle(t.transactionCategory);
            const amtStyle = getAmountStyle(t.transactionType);
            const sign = t.transactionType === "income" ? "+" : t.transactionType === "expense" ? "-" : "";
            return (
              <div key={t.id} className="flex items-center gap-3 py-3">
                {/* Category dot */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${dotStyle.badge}`}
                >
                  <span className={`h-2 w-2 rounded-full ${dotStyle.dot}`} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-semibold text-slate-700">
                    {t.transactionNote || t.transactionCategory || "Transaction"}
                  </p>
                  <p className="text-[9px] text-slate-400">
                    {t.transactionCategory} · {formatDate(t.transactionDate)}
                  </p>
                </div>

                <span className={`text-[11px] ${amtStyle}`}>
                  {sign}{fmt(t.amount)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentActivityCard;
