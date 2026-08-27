import React, { useEffect } from "react";
import {
  X,
  Landmark,
  PiggyBank,
  CreditCard,
  TrendingUp,
  Check,
} from "lucide-react";
import { useAccountHook } from "../../hooks/useAccountsHook";

const AccountForm = ({ onClose, accountToEdit }) => {
  const {
    register,
    setValue,
    watch,
    handleAccounts,
    handleSubmit,
    handleError,
    reset,
  } = useAccountHook();

  const selectedType = watch("accountType");
  const selectedCurrency = watch("currency");

  useEffect(() => {
    if (accountToEdit) {
      reset({
        accountType: accountToEdit.accountType,
        accountName: accountToEdit.accountName,
        bank: accountToEdit.bank,
        accountNo: accountToEdit.accountNo,
        initialBalance:
          accountToEdit.initialBalance || accountToEdit.currentBalance,
        color: accountToEdit.color,
        currency: accountToEdit.currency,
      });
    } else {
      reset({
        accountType: "bank",
        accountName: "",
        bank: "",
        accountNo: "",
        initialBalance: "",
        color: "#3B82F6",
      });
    }
  }, [accountToEdit, reset]);
  const onSubmit = (data) => {
    handleAccounts(data, accountToEdit, onClose);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-97.5 max-w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex h-11 items-center justify-between border-b border-slate-200 px-4">
          <div className="flex items-center gap-2">
            <img
              src="/walletlyLogo.png"
              alt="Walletly"
              className="h-4 w-4 object-contain"
            />
            <h2 className="text-xs font-semibold text-slate-800">
              {accountToEdit ? "Edit Account" : "Add New Account"}
            </h2>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="flex h-6 w-6 items-center justify-center rounded text-base leading-none text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Form Content */}
        <form
          onSubmit={handleSubmit(onSubmit, handleError)}
          id="account-form"
          className="px-4 py-3"
        >
          {/* Account Type Tabs */}
          <div className="mb-3 grid grid-cols-4 rounded-md bg-blue-50 p-0.5">
            <button
              type="button"
              onClick={() => setValue("accountType", "bank")}
              className={`flex h-7 items-center justify-center gap-1 rounded text-[10px] transition ${
                selectedType === "bank"
                  ? "bg-white font-semibold text-teal-700 shadow-sm"
                  : "font-medium text-slate-500 hover:bg-white/60"
              }`}
            >
              <Landmark size={11} strokeWidth={2} />
              Bank
            </button>

            <button
              type="button"
              onClick={() => setValue("accountType", "wallet")}
              className={`flex h-7 items-center justify-center gap-1 rounded text-[10px] transition ${
                selectedType === "wallet"
                  ? "bg-white font-semibold text-teal-700 shadow-sm"
                  : "font-medium text-slate-500 hover:bg-white/60"
              }`}
            >
              <PiggyBank size={11} strokeWidth={2} />
              Wallet
            </button>

            <button
              type="button"
              onClick={() => setValue("accountType", "credit")}
              className={`flex h-7 items-center justify-center gap-1 rounded text-[10px] transition ${
                selectedType === "credit"
                  ? "bg-white font-semibold text-teal-700 shadow-sm"
                  : "font-medium text-slate-500 hover:bg-white/60"
              }`}
            >
              <CreditCard size={11} strokeWidth={2} />
              Credit
            </button>

            <button
              type="button"
              onClick={() => setValue("accountType", "invest")}
              className={`flex h-7 items-center justify-center gap-1 rounded text-[10px] transition ${
                selectedType === "invest"
                  ? "bg-white font-semibold text-teal-700 shadow-sm"
                  : "font-medium text-slate-500 hover:bg-white/60"
              }`}
            >
              <TrendingUp size={11} strokeWidth={2} />
              Invest
            </button>
          </div>

          {/* Account Name */}
          <div className="mb-3">
            <label className="mb-1 block text-[10px] font-medium text-slate-700">
              {selectedType === "wallet" ? "Wallet name" : "Account Name"}
            </label>
            <input
              {...register("accountName", {
                required: "Account Name is required",
              })}
              type="text"
              placeholder="e.g. Chase Main Checking"
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
            />
          </div>

          {/* Institution & Last 4 Digits */}
          {selectedType !== "wallet" && (
            <div className="mb-3 grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-[10px] font-medium text-slate-700">
                  Bank / Institution
                </label>
                <input
                  {...register("bank", {
                    required: "bank Name is required",
                  })}
                  type="text"
                  placeholder="e.g. SBI Bank"
                  className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[10px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-medium text-slate-700">
                  Last 4 Digits
                </label>
                <input
                  {...register("accountNo", {
                    required: "Account No is required",

                    pattern: {
                      value: /^\d{4}$/,
                      message: "Account number must be exactly 4 digits",
                    },
                  })}
                  type="text"
                  maxLength={4}
                  placeholder="4920"
                  className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[10px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
                />
              </div>
            </div>
          )}

          {/* Starting Balance */}
          <div className="mb-3">
            <label className="mb-1 block text-[10px] font-medium text-slate-700">
              Starting Balance
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                {selectedCurrency || "$"}
              </span>
              <input
                {...register("initialBalance", {
                  required: "Initial balance is required",
                })}
                type="number"
                placeholder="0.00"
                className="h-9 w-full rounded-md border border-slate-200 bg-white pl-7 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
              />
            </div>
          </div>

          {/* Color & Currency */}
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[10px] font-medium text-slate-700">
                Card Color
              </label>
              <select
                {...register("color", {
                  required: "select color ",
                })}
                className="h-9 w-full rounded-md border border-slate-200 bg-white px-2 text-[10px] text-slate-600 outline-none transition focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
              >
                <option value="#3B82F6">Blue</option>
                <option value="#14B8A6">Teal</option>
                <option value="#6366F1">Indigo</option>
                <option value="#EF4444">Red</option>
                <option value="#F59E0B">Amber</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-[10px] font-medium text-slate-700">
                Currency
              </label>
              <select
                {...register("currency", {
                  required: "select currency ",
                })}
                className="h-9 w-full rounded-md border border-slate-200 bg-white px-2 text-[10px] text-slate-600 outline-none transition focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
              >
                <option value={"$"}>USD ($)</option>
                <option value={"€"}>EUR (€)</option>
                <option value={"£"}>GBP (£)</option>
                <option value={"₹"}>INR (₹)</option>
              </select>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-slate-200 bg-slate-50 px-4 py-2.5">
          <button
            type="button"
            onClick={onClose}
            className="h-7 rounded-md border border-slate-300 bg-white px-4 text-[10px] font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="account-form"
            className="flex h-7 items-center gap-1.5 rounded-md bg-teal-700 px-4 text-[10px] font-semibold text-white transition hover:bg-teal-800"
          >
            <Check size={13} strokeWidth={2.5} /> Save Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountForm;
