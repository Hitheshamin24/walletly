const PERIODS = ["Weekly", "Monthly", "Yearly"];
const ACTIVE_INDEX = 1;

const AnalyticsHeader = () => {
  return (
    <div className="mb-3 flex items-start justify-between">
      <div>
        <h1 className="text-lg font-bold tracking-tight text-slate-900">
          Analytics & Reports
        </h1>
        <p className="text-[8px] text-slate-500">
          Understand your spending patterns and financial health.
        </p>
      </div>

      {/* Period selector */}
      <div className="flex overflow-hidden rounded border border-slate-200 bg-white">
        {PERIODS.map((period, index) => (
          <button
            key={period}
            className={`px-2 py-1 text-[7px] font-medium ${
              index === ACTIVE_INDEX
                ? "bg-teal-50 text-teal-700"
                : "text-slate-400 hover:bg-slate-50"
            }`}
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsHeader;
