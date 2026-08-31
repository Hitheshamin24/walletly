import React, { useEffect } from "react";
import { X, Check } from "lucide-react";
import { useTransactionContext } from "../../context/TransactionFormContext";
import { useTransactionForm } from "../../../features/transactions/hooks/useTransactionHooks";
import { useAccountHook } from "../../../features/account/hooks/useAccountsHook";
const TransactionForm = () => {
  const { setShowTransactionModal, editingTransaction, setEditingTransaction } =
    useTransactionContext();
  const { accounts } = useAccountHook();

  const {
    register,
    handleSubmit,
    handleTransaction,
    handleErrors,
    setValue,
    watch,
    reset,
  } = useTransactionForm();
  const selectedType = watch("transactionType");
  const selectedAccount = watch("transactionAccount");

  const account = accounts?.find((val) => val.id === selectedAccount);
  const handleTypeChange = (type) => {
    setValue("transactionType", type);
    setValue("transactionCategory", "");
  };
  const onClose = () => {
    setShowTransactionModal(false);
    setEditingTransaction(null);
  };
  const onSubmit = (data) => {
    handleTransaction(data, editingTransaction, onClose);
  };

  useEffect(() => {
    if (editingTransaction) {
      reset(editingTransaction);
    } else {
      reset({
        transactionType: "income",
        transactionDate: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000,
        )
          .toISOString()
          .split("T")[0],
      });
    }
  }, [editingTransaction, reset]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-97.5 max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex h-12 items-center justify-between border-b border-slate-200 px-4">
          <div className="flex items-center gap-2">
            <img
              src="/walletlyLogo.png"
              alt="Walletly"
              className="h-5 w-5 object-contain"
            />

            <div>
              <h2 className="text-xs font-semibold text-slate-800">
                {editingTransaction ? "Update Transaction" : "New Transaction"}
              </h2>
              <p className="text-[9px] text-slate-400">
                {editingTransaction
                  ? "Update a financial transaction"
                  : "Add a new financial transaction"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form
          id="transaction-form"
          onSubmit={handleSubmit(onSubmit, handleErrors)}
          className="px-4 py-4"
        >
          {/* Transaction Type */}
          <div className="mb-4">
            <label className="mb-1.5 block text-[10px] font-medium text-slate-700">
              Transaction Type
            </label>

            <div className="grid grid-cols-3 gap-1 rounded-lg bg-slate-100 p-1">
              {/* Expense */}
              <button
                onClick={() => handleTypeChange("expense")}
                type="button"
                className={`h-8 rounded-md text-[10px] font-medium transition-all ${
                  selectedType === "expense"
                    ? "bg-white text-red-500 shadow-sm"
                    : "text-slate-500 hover:bg-white/70"
                }`}
              >
                Expense
              </button>

              {/* Income */}
              <button
                onClick={() => handleTypeChange("income")}
                type="button"
                className={`h-8 rounded-md text-[10px] font-medium transition-all ${
                  selectedType === "income"
                    ? "bg-white text-emerald-600 shadow-sm"
                    : "text-slate-500 hover:bg-white/70"
                }`}
              >
                Income
              </button>

              {/* Transfer */}
              <button
                onClick={() => handleTypeChange("transfer")}
                type="button"
                className={`h-8 rounded-md text-[10px] font-medium transition-all ${
                  selectedType === "transfer"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:bg-white/70"
                }`}
              >
                Transfer
              </button>
            </div>
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label className="mb-1.5 block text-[10px] font-medium text-slate-700">
              Amount
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                {account?.currency || "$"}
              </span>

              <input
                {...register("amount", {
                  required: "Amount is required",
                })}
                type="text"
                placeholder="0.00"
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-7 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10"
              />
            </div>
          </div>

          {/* Category + Payment Method */}
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Category */}
            <div>
              <label className="mb-1 block text-[10px] font-medium text-slate-700">
                Category
              </label>

              <select
                {...register("transactionCategory", {
                  required: "Category is required",
                })}
                className="h-9 w-full rounded-md border border-slate-200 bg-white px-2 text-[10px] text-slate-500 outline-none transition focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
              >
                <option value="">Select category</option>

                {selectedType === "expense" && (
                  <>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="shopping">Shopping</option>
                    <option value="bills">Bills & Utilities</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="health">Health</option>
                    <option value="education">Education</option>
                    <option value="rent">Rent</option>
                    <option value="other">Other</option>
                  </>
                )}

                {selectedType === "income" && (
                  <>
                    <option value="salary">Salary</option>
                    <option value="freelance">Freelance</option>
                    <option value="business">Business</option>
                    <option value="interest">Interest</option>
                    <option value="investment">Investment</option>
                    <option value="gift">Gift</option>
                    <option value="refund">Refund</option>
                    <option value="other">Other</option>
                  </>
                )}

                {selectedType === "transfer" && (
                  <>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="upi_transfer">UPI Transfer</option>
                    <option value="cash_withdrawal">Cash Withdrawal</option>
                    <option value="cash_deposit">Cash Deposit</option>
                    <option value="account_transfer">Account Transfer</option>
                    <option value="other">Other</option>
                  </>
                )}
              </select>
            </div>

            {/* Payment Method */}
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-slate-700">
                Payment Method
              </label>

              <select
                {...register("paymentMethod", {
                  required: "Payment method is required",
                })}
                className="h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-[10px] text-slate-600 outline-none transition hover:border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10"
              >
                <option value="">Select method</option>
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
                <option value="netbanking">Net Banking</option>
                <option value="card">Debit / Credit Card</option>
              </select>
            </div>
          </div>

          {/* Date + Account */}
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Date */}
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-slate-700">
                Date
              </label>

              <input
                {...register("transactionDate", {
                  required: "Date is required",
                })}
                type="date"
                className="h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-[10px] text-slate-600 outline-none transition hover:border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10"
              />
            </div>

            {/* Account */}
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-slate-700">
                Account
              </label>

              <select
                {...register("transactionAccount", {
                  required: "Account is required",
                })}
                className="h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-[10px] text-slate-600 outline-none transition hover:border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10"
              >
                {accounts?.map((val) => (
                  <option key={val.id} value={val.id}>
                    {val.accountName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-slate-700">
              Notes{" "}
              <span className="font-normal text-slate-400">(Optional)</span>
            </label>

            <textarea
              {...register("transactionNote")}
              placeholder="Add details or tags..."
              rows={2}
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-[10px] text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-slate-200 bg-slate-50 px-4 py-3">
          <button
            onClick={() => setShowTransactionModal(false)}
            type="button"
            className="h-8 rounded-md border border-slate-300 bg-white px-4 text-[10px] font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="transaction-form"
            className="flex h-8 items-center gap-1.5 rounded-md bg-teal-700 px-4 text-[10px] font-semibold text-white transition hover:bg-teal-800"
          >
            <Check size={13} strokeWidth={2.5} />
            {editingTransaction ? "Update Transaction" : "Save Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
