import React from "react";
import { TrendingUp } from "lucide-react";

const NetWorthCard = () => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase text-slate-500">
            Total Net Worth
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-slate-800">
            $142,850.00
          </h2>
        </div>

        <span className="rounded bg-teal-50 px-2 py-1 text-[9px] font-medium text-teal-600 flex items-center gap-1">
          <TrendingUp size={10} strokeWidth={2} /> +2.4%
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
