import React from "react";
import { Pencil, Link } from "lucide-react";

const PageHeader = () => {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-slate-800">Accounts</h1>

        <p className="mt-1 text-xs text-slate-500">
          Manage your linked bank accounts, credit cards, and wallets.
        </p>
      </div>

      <div className="flex gap-2">
        <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50 flex items-center gap-1">
          <Pencil size={11} strokeWidth={2} /> Edit
        </button>

        <button className="rounded-md bg-teal-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-teal-800 flex items-center gap-1">
          <Link size={11} strokeWidth={2} /> Link Bank
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
