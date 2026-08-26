import React from "react";
import { X, Landmark, Wallet, Check } from "lucide-react";
import { useTransactionContext } from "../../context/TransactionFormContext";

const TransactionForm = () => {
    const {setShowTransactionModal}=useTransactionContext()
  return (
    <div onClick={()=>setShowTransactionModal(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
      <div onClick={(e)=>e.stopPropagation()} className="w-97.5 max-w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl">

        {/* Header */}
        <div className="flex h-11 items-center justify-between border-b border-slate-200 px-4">
          <div className="flex items-center gap-2">
            <img
              src="/walletlyLogo.png"
              alt="Walletly"
              className="h-4 w-4 object-contain"
            />

            <h2 className="text-xs font-semibold text-slate-800">
              New Transaction
            </h2>
          </div>

          <button
          onClick={()=>setShowTransactionModal(false)}
            type="button"
            className="flex h-6 w-6 items-center justify-center rounded text-base leading-none text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Form Content */}
        <div className="px-4 py-3">

          {/* Transaction Type */}
          <div className="mb-3 grid grid-cols-3 rounded-md bg-blue-50 p-0.5">
            <button
              type="button"
              className="h-7 rounded  text-[10px] font-semibold bg-white text-red-500 shadow-sm"
            >
              Expense
            </button>

            <button
              type="button"
              className="h-7 rounded text-[10px] font-medium text-slate-500 transition hover:bg-white/60"
            >
              Income
            </button>

            <button
              type="button"
              className="h-7 rounded text-[10px] font-medium text-slate-500 transition hover:bg-white/60"
            >
              Transfer
            </button>
          </div>

          {/* Amount */}
          <div className="mb-3">
            <label className="mb-1 block text-[10px] font-medium text-slate-700">
              Amount
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                $
              </span>

              <input
                type="text"
                placeholder="0.00"
                className="h-10 w-full rounded-md border border-slate-200 bg-white pl-7 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
              />
            </div>
          </div>

          {/* Category + Date */}
          <div className="mb-3 grid grid-cols-2 gap-3">

            {/* Category */}
            <div>
              <label className="mb-1 block text-[10px] font-medium text-slate-700">
                Category
              </label>

              <select className="h-9 w-full rounded-md border border-slate-200 bg-white px-2 text-[10px] text-slate-500 outline-none transition focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20">
                <option>Select category</option>
                <option>Food</option>
                <option>Transport</option>
                <option>Shopping</option>
                <option>Bills</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="mb-1 block text-[10px] font-medium text-slate-700">
                Date
              </label>

              <input
                type="date"
                className="h-9 w-full rounded-md border border-slate-200 bg-white px-2 text-[10px] text-slate-500 outline-none transition focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
              />
            </div>

          </div>

          {/* Account */}
          <div className="mb-3">
            <label className="mb-1 block text-[10px] font-medium text-slate-700">
              Account
            </label>

            <select className="h-9 w-full rounded-md border border-slate-200 bg-white px-2 text-[10px] text-slate-600 outline-none transition focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20">
              <option><Landmark className="inline w-3 h-3 mr-1" /> Main Checking (...4920)</option>
              <option><Landmark className="inline w-3 h-3 mr-1" /> Savings Account</option>
              <option><Wallet className="inline w-3 h-3 mr-1" /> Cash</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1 block text-[10px] font-medium text-slate-700">
              Notes{" "}
              <span className="font-normal text-slate-400">
                (Optional)
              </span>
            </label>

            <textarea
              placeholder="Add details or tags..."
              rows="2"
              className="w-full resize-none rounded-md border border-slate-200 bg-white px-2 py-2 text-[10px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-slate-200 bg-slate-50 px-4 py-2.5">

          <button
            type="button"
            className="h-7 rounded-md border border-slate-300 bg-white px-4 text-[10px] font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            className="h-7 rounded-md bg-teal-700 px-4 text-[10px] font-semibold text-white transition hover:bg-teal-800 flex items-center gap-1.5"
          >
            <Check size={13} strokeWidth={2.5} /> Save Transaction
          </button>

        </div>

      </div>
    </div>
  );
};

export default TransactionForm;