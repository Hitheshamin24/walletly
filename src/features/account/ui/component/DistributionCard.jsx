import React, { useMemo } from "react";
import { useAccountHook } from "../../hooks/useAccountsHook";

const DistributionCard = () => {
  const { accounts } = useAccountHook();

  const distribution = useMemo(() => {
    let total = 0;
    const typeTotals = {
       bank: 0,
       wallet: 0,
       credit: 0
    };

    accounts.forEach(acc => {
       const bal = Math.abs(Number(acc.currentBalance ?? 0));
       total += bal;
       typeTotals[acc.accountType || "bank"] += bal;
    });

    const getPct = (val) => total > 0 ? Math.round((val / total) * 100) : 0;

    return {
       bank: { pct: getPct(typeTotals.bank), name: "Checking & Savings", color: "bg-teal-600" },
       wallet: { pct: getPct(typeTotals.wallet), name: "Wallets", color: "bg-blue-500" },
       credit: { pct: getPct(typeTotals.credit), name: "Credit Cards", color: "bg-red-500" },
    };
  }, [accounts]);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-slate-700">Distribution</h3>
        <span className="text-slate-400">⋮</span>
      </div>

      <div className="space-y-3">
        {Object.entries(distribution).map(([key, data]) => (
          <div key={key}>
            <div className="mb-1 flex justify-between text-[9px]">
              <span className="text-slate-500">{data.name}</span>
              <span className="font-medium text-slate-600">{data.pct}%</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className={`h-full ${data.color} transition-all duration-500`} style={{ width: `${data.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistributionCard;
