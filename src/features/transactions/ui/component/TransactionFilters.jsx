import { CalendarDays, ChevronDown, Search } from "lucide-react";

const TYPE_FILTERS = ["All", "Income", "Expenses", "Transfer"];

const TransactionFilters = () => {
  return (
    <div className="mb-4 rounded-lg border border-slate-200 bg-white p-2.5 shadow-[0_1px_4px_rgba(15,23,42,0.05)]">
      <div className="flex flex-wrap items-center gap-2">
        {/* Date */}
        <button
          type="button"
          className="flex h-7 items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 text-[9px] font-medium text-slate-600"
        >
          <CalendarDays size={11} />
          This Month
          <ChevronDown size={10} />
        </button>

        {/* Category */}
        <button
          type="button"
          className="flex h-7 items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 text-[9px] font-medium text-slate-600"
        >
          <span className="text-slate-400">≡</span>
          All Categories
          <ChevronDown size={10} />
        </button>

        {/* Account */}
        <button
          type="button"
          className="flex h-7 items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 text-[9px] font-medium text-slate-600"
        >
          <span className="text-slate-400">▤</span>
          All Accounts
          <ChevronDown size={10} />
        </button>

        {/* Search */}
        <div className="relative ml-auto w-full sm:w-40">
          <Search
            size={11}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="h-7 w-full rounded-md border border-slate-200 bg-slate-50 pl-7 pr-2 text-[9px] text-slate-600 outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20"
          />
        </div>
      </div>

      {/* Type filters */}
      <div className="mt-2 flex items-center gap-1.5">
        {TYPE_FILTERS.map((item, index) => (
          <button
            key={item}
            type="button"
            className={`rounded px-2.5 py-1 text-[8px] font-medium ${
              index === 0
                ? "bg-slate-100 text-slate-700"
                : "text-slate-400 hover:bg-slate-50"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransactionFilters;
