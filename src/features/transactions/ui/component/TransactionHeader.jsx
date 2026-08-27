import { Plus, Upload } from "lucide-react";

const TransactionHeader = () => {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-xl font-bold tracking-tight text-slate-900">
        Transactions
      </h1>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 text-[10px] font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          <Upload size={11} />
          Import/Export
        </button>

        <button
          type="button"
          className="flex h-8 items-center gap-1.5 rounded-md bg-teal-700 px-3 text-[10px] font-semibold text-white shadow-sm transition hover:bg-teal-800"
        >
          <Plus size={12} />
          Add Transaction
        </button>
      </div>
    </div>
  );
};

export default TransactionHeader;
