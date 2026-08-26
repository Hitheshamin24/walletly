import React from "react";

const DistributionCard = () => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-slate-700">Distribution</h3>

        <span className="text-slate-400">⋮</span>
      </div>

      <div className="space-y-3">
        <div>
          <div className="mb-1 flex justify-between text-[9px]">
            <span className="text-slate-500">Checking & Savings</span>
            <span className="font-medium text-slate-600">65%</span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[65%] bg-teal-600" />
          </div>
        </div>

        <div>
          <div className="mb-1 flex justify-between text-[9px]">
            <span className="text-slate-500">Investments</span>
            <span className="font-medium text-slate-600">25%</span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[25%] bg-blue-500" />
          </div>
        </div>

        <div>
          <div className="mb-1 flex justify-between text-[9px]">
            <span className="text-slate-500">Credit Cards</span>
            <span className="font-medium text-slate-600">10%</span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[10%] bg-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributionCard;
