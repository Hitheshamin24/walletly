import React from "react";
import { Plus } from "lucide-react";

const AddAccountCard = () => {
  return (
    <button className="flex min-h-42.5 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-4 text-center transition hover:border-teal-400 hover:bg-teal-50/30">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-lg text-blue-500">
        <Plus size={24} strokeWidth={2} />
      </div>

      <h3 className="text-xs font-semibold text-slate-700">Add Account</h3>

      <p className="mt-1 max-w-32.5 text-[9px] leading-4 text-slate-400">
        Link a new bank, credit card, or investment portfolio.
      </p>
    </button>
  );
};

export default AddAccountCard;
