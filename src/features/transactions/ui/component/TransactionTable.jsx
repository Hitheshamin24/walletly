import React, { useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  getCategoryStyle,
  getAmountStyle,
} from "../../constants/categoryConstants";
import { useTransactionData } from "../../hooks/useTransactionHooks";

const TABLE_HEADERS = [
  { label: "Date", align: "left" },
  { label: "Description", align: "left" },
  { label: "Category", align: "left" },
  { label: "Account", align: "left" },
  { label: "Method", align: "left" },
  { label: "Amount", align: "right" },
  { label: "Actions", align: "center", width: "w-12" },
];

const ITEMS_PER_PAGE = 10;

const TransactionTable = ({
  transactions = [],
  setEditingTransaction,
  setShowTransactionModal,
}) => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { deleteTransaction } = useTransactionData();

  const totalPages = Math.max(1, Math.ceil(transactions.length / ITEMS_PER_PAGE));
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const startItem = transactions.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, transactions.length);

  return (
    <div className="overflow-visible rounded-lg border border-slate-200 bg-white shadow-[0_1px_4px_rgba(15,23,42,0.05)]">
      {/* Desktop Table */}
      <div className="hidden overflow-visible md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              {TABLE_HEADERS.map(({ label, align, width }) => (
                <th
                  key={label}
                  className={`${width ?? ""} px-4 py-3 text-${align} text-[9px] font-semibold uppercase tracking-widest text-slate-400`}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedTransactions.map((transaction, index) => (
              <tr
                key={`${transaction.transactionDate}-${transaction.transactionNote}-${index}`}
                className="group border-t border-slate-100/80 transition-colors duration-100 hover:bg-slate-50/60"
              >
                <td className="whitespace-nowrap px-4 py-3.5 text-[9px] font-medium text-slate-400">
                  {transaction.transactionDate}
                </td>

                <td className="px-4 py-3.5">
                  <p className="max-w-40 truncate text-[10px] font-semibold leading-tight text-slate-700 group-hover:text-slate-900">
                    {transaction.transactionNote}
                  </p>
                </td>

                <td className="px-4 py-3.5">
                  {(() => {
                    const cat = getCategoryStyle(
                      transaction.transactionCategory,
                    );
                    return (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[8px] font-semibold capitalize ${cat.badge}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full shrink-0 ${cat.dot}`}
                        />
                        {transaction.transactionCategory}
                      </span>
                    );
                  })()}
                </td>

                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[8px] font-medium text-slate-600">
                    {transaction.transactionAccount}
                  </span>
                </td>

                <td className="px-4 py-3.5 text-[8px] capitalize text-slate-500">
                  {transaction.paymentMethod}
                </td>

                <td className="px-4 py-3.5 text-right">
                  <span
                    className={`text-[10px] tabular-nums ${getAmountStyle(
                      transaction.transactionType,
                    )}`}
                  >
                    {transaction.transactionType === "income"
                      ? "+"
                      : transaction.transactionType === "expense"
                        ? "-"
                        : ""}
                    {transaction.amount}
                  </span>
                </td>

                <td className="relative px-4 py-3.5 text-center">
                  <button
                    type="button"
                    onClick={() => setOpenMenuIndex(openMenuIndex===index?null :index)}
                    className="rounded-md border border-transparent p-1 text-slate-400 transition hover:border-slate-200 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                  >
                    <MoreHorizontal size={13} />
                  </button>

                  {/* Actions Dropdown */}
                  {openMenuIndex === index && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setOpenMenuIndex(null)}
                      />
                      <div className="absolute right-3 top-8 z-20 w-24 rounded-lg border border-slate-200 bg-white py-1 shadow-md">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTransaction(transaction);
                            setShowTransactionModal(true);
                            setOpenMenuIndex(null);
                          }}
                          className="flex w-full items-center gap-1.5 px-2.5 py-1 text-[9px] font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                        >
                          <Pencil size={11} className="text-teal-600" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteTransaction(transaction);
                            setOpenMenuIndex(null);
                          }}
                          className="flex w-full items-center gap-1.5 px-2.5 py-1 text-[9px] font-medium text-red-500 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 size={11} className="text-red-500" />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y divide-slate-100 md:hidden">
        {paginatedTransactions.map((transaction, index) => (
          <div
            key={`${transaction.transactionDate}-${transaction.transactionNote}-${index}`}
            className="p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-slate-700">
                  {transaction.transactionNote}
                </p>
                <p className="mt-1 text-[9px] text-slate-400">
                  {transaction.transactionDate}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <span
                  className={`whitespace-nowrap text-[10px] font-semibold ${getAmountStyle(
                    transaction.transactionType,
                  )}`}
                >
                  {transaction.amount}
                </span>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenuIndex(openMenuIndex === index ? null : index)
                    }
                    className="rounded p-1 text-slate-400 hover:bg-slate-100"
                  >
                    <MoreHorizontal size={13} />
                  </button>

                  {openMenuIndex === index && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setOpenMenuIndex(null)}
                      />
                      <div className="absolute right-0 top-7 z-20 w-24 rounded-lg border border-slate-200 bg-white py-1 shadow-md">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTransaction(transaction);
                            setShowTransactionModal(true);
                            setOpenMenuIndex(null);
                          }}
                          className="flex w-full items-center gap-1.5 px-2.5 py-1 text-[9px] font-medium text-slate-700 hover:bg-slate-50"
                        >
                          <Pencil size={11} className="text-teal-600" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteTransaction(transaction);
                            setOpenMenuIndex(null);
                          }}
                          className="flex w-full items-center gap-1.5 px-2.5 py-1 text-[9px] font-medium text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={11} className="text-red-500" />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-[7px] font-semibold capitalize ${getCategoryStyle(
                  transaction.category || transaction.transactionCategory,
                )}`}
              >
                {transaction.category || transaction.transactionCategory}
              </span>
              <span className="text-[8px] text-slate-400">
                {transaction.account || transaction.transactionAccount}
              </span>
              <span className="text-[8px] text-slate-400">
                {transaction.method || transaction.paymentMethod}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <TransactionPagination
        currentPage={currentPage}
        totalPages={totalPages}
        startItem={startItem}
        endItem={endItem}
        total={transactions.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

/* ── Pagination ─────────────────────────────────────────────── */
const TransactionPagination = ({ currentPage, totalPages, startItem, endItem, total, onPageChange }) => {
  // Show max 3 page buttons centred around currentPage
  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, start + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[8px] text-slate-400">
        {total === 0 ? (
          "No transactions"
        ) : (
          <>
            Showing{" "}
            <span className="font-medium text-slate-600">
              {startItem} to {endItem}
            </span>{" "}
            of {total} results
          </>
        )}
      </p>

      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange((p) => Math.max(1, p - 1))}
          className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={11} />
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`flex h-6 w-6 items-center justify-center rounded text-[8px] font-semibold ${
              page === currentPage
                ? "bg-teal-700 text-white"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange((p) => Math.min(totalPages, p + 1))}
          className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight size={11} />
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
