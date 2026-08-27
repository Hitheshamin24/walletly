import React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useAccountHook } from "../../hooks/useAccountsHook";

const NetWorthCard = () => {
  const { calculateTotal } = useAccountHook();
  const { totalCurrency, keys, profitPercentage } = calculateTotal();
  const isProfit = profitPercentage >= 0;
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase text-slate-500">
            Total Available Balance
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {keys.map((val) => {
              const amount = Number(totalCurrency[val]) || 0;
              const isPositive = amount > 0;
              const isNegative = amount < 0;

              return (
                <div key={val} className="flex items-baseline gap-1">
                  <span className="text-sm font-medium text-slate-500">
                    {val}
                  </span>

                  <h2
                    className={`text-2xl font-semibold tracking-tight ${
                      isNegative
                        ? "text-red-500"
                        : isPositive
                          ? "text-emerald-600"
                          : "text-slate-800"
                    }`}
                  >
                    {isPositive && "+"}
                    {isNegative && "-"}
                    {Math.abs(amount).toLocaleString()}
                  </h2>
                </div>
              );
            })}
          </div>
        </div>

        <span
          className={`flex items-center gap-1 rounded px-2 py-1 text-[9px] font-medium ${
            isProfit
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-500"
          }`}
        >
          {isProfit ? (
            <TrendingUp size={10} strokeWidth={2.5} />
          ) : (
            <TrendingDown size={10} strokeWidth={2.5} />
          )}
          {profitPercentage}%
        </span>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-3">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-[9px] text-slate-400">Assets</p>
            <p className="mt-1 text-xs font-semibold text-slate-700">
              $156,200.00
            </p>
          </div>

          <div>
            <p className="text-[9px] text-slate-400">Liabilities</p>
            <p className="mt-1 text-xs font-semibold text-slate-700">
              -$13,350.00
            </p>
          </div>

          <div>
            <p className="text-[9px] text-slate-400">Last Updated</p>
            <p className="mt-1 text-xs font-semibold text-slate-700">
              Just now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetWorthCard;
