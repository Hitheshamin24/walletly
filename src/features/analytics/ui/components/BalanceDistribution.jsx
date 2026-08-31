const BalanceDistribution = ({ distribution }) => {
  const { totalBalance, balanceItems, gradientStr } = distribution;

  return (
    <div className="mt-3 rounded-md border border-slate-200 bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-3">
        <h2 className="text-[9px] font-bold text-slate-700">
          Balance Distribution
        </h2>
        <p className="text-[6px] text-slate-400">
          Current balance across accounts
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        {/* Donut */}
        <div
          className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
          style={{ background: gradientStr }}
        >
          <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-white px-1">
            <span className="text-[6px] text-slate-400">Total</span>
            <span className="text-[10px] font-bold text-slate-800 text-center w-full break-all leading-tight">
               {totalBalance >= 1000000 ? (totalBalance/1000000).toFixed(1) + "M" : totalBalance >= 1000 ? (totalBalance/1000).toFixed(1) + "k" : Number(totalBalance).toFixed(0)}
            </span>
          </div>
        </div>

        {/* Account breakdown */}
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3">
          {balanceItems.map((item) => (
            <div
              key={item.name}
              className="rounded-md border border-slate-100 bg-slate-50 p-2.5"
            >
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[7px] font-medium text-slate-500 truncate w-24">
                  {item.name}
                </span>
              </div>

              <p className="mt-1 text-[10px] font-bold text-slate-800">
                {item.amount}
              </p>
              <p className="text-[6px] text-slate-400">
                {item.percentage} of balance
              </p>
            </div>
          ))}
          {balanceItems.length === 0 && (
             <div className="text-[9px] text-slate-400 flex items-center justify-center col-span-3">No accounts added yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BalanceDistribution;
