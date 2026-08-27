import { Plus, SlidersHorizontal } from "lucide-react";

const RecurringHeader = () => {
  return (
    <div className="mb-5 flex items-start justify-between">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Recurring Transactions
        </h1>
        <p className="mt-0.5 text-[9px] text-slate-500">
          Manage your subscriptions and scheduled payments.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex items-center gap-1 text-[9px] font-medium text-slate-500 hover:text-slate-800"
        >
          <SlidersHorizontal size={10} />
          Filter
        </button>

        <button
          type="button"
          className="flex items-center gap-1 rounded-md bg-teal-700 px-2.5 py-1.5 text-[9px] font-semibold text-white shadow-sm hover:bg-teal-800"
        >
          <Plus size={10} />
          Add Recurring
        </button>
      </div>
    </div>
  );
};

export default RecurringHeader;
