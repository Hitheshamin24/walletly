import React from "react";

const AccountCard = ({
  icon: Icon,
  iconBg,
  name,
  type,
  balance,
  balanceLabel = "Available Balance",
  badge,
  syncLabel = "↻ Synced 2m ago",
  actionLabel = "View Activity",
}) => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs ${iconBg}`}
          >
            {Icon && <Icon size={12} strokeWidth={2} />}
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-700">{name}</h3>

            <p className="text-[9px] text-slate-400">{type}</p>
          </div>
        </div>

        <button className="text-slate-400">⋮</button>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-[8px] uppercase text-slate-400">{balanceLabel}</p>

          <p className="mt-1 text-lg font-semibold text-slate-800">{balance}</p>
        </div>

        {badge && (
          <span className="rounded bg-teal-50 px-1.5 py-0.5 text-[8px] font-medium text-teal-600">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-4 flex justify-between border-t border-slate-100 pt-3">
        <button className="text-[8px] text-teal-700">{syncLabel}</button>

        <button className="text-[8px] text-slate-400">{actionLabel}</button>
      </div>
    </div>
  );
};

export default AccountCard;
