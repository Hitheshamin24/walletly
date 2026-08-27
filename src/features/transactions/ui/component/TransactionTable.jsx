import { MoreHorizontal } from "lucide-react";

const CATEGORY_STYLES = {
  "Food & Dining": "bg-orange-100 text-orange-700",
  Income: "bg-emerald-100 text-emerald-700",
  Transfer: "bg-blue-100 text-blue-700",
  Entertainment: "bg-purple-100 text-purple-700",
  Transportation: "bg-amber-100 text-amber-700",
};

const getCategoryStyle = (category) =>
  CATEGORY_STYLES[category] ?? "bg-slate-100 text-slate-600";

const getAmountStyle = (type) => {
  if (type === "income") return "text-emerald-600";
  if (type === "expense") return "text-red-400";
  return "text-slate-600";
};

const TABLE_HEADERS = [
  { label: "Date", align: "left" },
  { label: "Description", align: "left" },
  { label: "Category", align: "left" },
  { label: "Account", align: "left" },
  { label: "Method", align: "left" },
  { label: "Amount", align: "right" },
  { label: "Actions", align: "center", width: "w-12" },
];

const TransactionTable = ({ transactions }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_1px_4px_rgba(15,23,42,0.05)]">
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-50/70">
              {TABLE_HEADERS.map(({ label, align, width }) => (
                <th
                  key={label}
                  className={`${width ?? ""} px-3 py-2.5 text-${align} text-[8px] font-bold uppercase tracking-wide text-slate-500`}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={`${transaction.date}-${transaction.description}`}
                className="border-t border-slate-100 transition hover:bg-slate-50/70"
              >
                <td className="whitespace-nowrap px-3 py-3 text-[9px] font-medium text-slate-500">
                  {transaction.date}
                </td>

                <td className="px-3 py-3">
                  <p className="max-w-36 text-[9px] font-semibold leading-tight text-slate-700">
                    {transaction.description}
                  </p>
                </td>

                <td className="px-3 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[7px] font-semibold ${getCategoryStyle(transaction.category)}`}
                  >
                    {transaction.category}
                  </span>
                </td>

                <td className="px-3 py-3">
                  <p className="text-[9px] font-medium text-slate-600">
                    {transaction.account}
                  </p>
                </td>

                <td className="px-3 py-3 text-[9px] text-slate-500">
                  {transaction.method}
                </td>

                <td className="px-3 py-3 text-right">
                  <span
                    className={`text-[9px] font-semibold ${getAmountStyle(transaction.type)}`}
                  >
                    {transaction.amount}
                  </span>
                </td>

                <td className="px-3 py-3 text-center">
                  <button
                    type="button"
                    className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <MoreHorizontal size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y divide-slate-100 md:hidden">
        {transactions.map((transaction) => (
          <div
            key={`${transaction.date}-${transaction.description}`}
            className="p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-slate-700">
                  {transaction.description}
                </p>
                <p className="mt-1 text-[9px] text-slate-400">
                  {transaction.date}
                </p>
              </div>

              <span
                className={`whitespace-nowrap text-[10px] font-semibold ${getAmountStyle(transaction.type)}`}
              >
                {transaction.amount}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-[7px] font-semibold ${getCategoryStyle(transaction.category)}`}
              >
                {transaction.category}
              </span>
              <span className="text-[8px] text-slate-400">
                {transaction.account}
              </span>
              <span className="text-[8px] text-slate-400">
                {transaction.method}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <TransactionPagination />
    </div>
  );
};

/* ── Pagination ─────────────────────────────────────────────── */
import { ChevronLeft, ChevronRight } from "lucide-react";

const TransactionPagination = () => (
  <div className="flex flex-col gap-3 border-t border-slate-100 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
    <p className="text-[8px] text-slate-400">
      Showing <span className="font-medium text-slate-600">1 to 5</span> of 124
      results
    </p>

    <div className="flex items-center gap-1">
      <button
        type="button"
        className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50"
      >
        <ChevronLeft size={11} />
      </button>

      {[1, 2, 3].map((page) => (
        <button
          key={page}
          type="button"
          className={`flex h-6 w-6 items-center justify-center rounded text-[8px] font-semibold ${
            page === 1
              ? "bg-teal-700 text-white"
              : "text-slate-500 hover:bg-slate-50"
          }`}
        >
          {page}
        </button>
      ))}

      <span className="px-1 text-[8px] text-slate-400">...</span>

      <button
        type="button"
        className="flex h-6 w-6 items-center justify-center rounded text-[8px] text-slate-500 hover:bg-slate-50"
      >
        25
      </button>

      <button
        type="button"
        className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50"
      >
        <ChevronRight size={11} />
      </button>
    </div>
  </div>
);

export default TransactionTable;
