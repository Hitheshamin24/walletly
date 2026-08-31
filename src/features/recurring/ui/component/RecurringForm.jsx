import { useEffect } from "react";
import { X, Check } from "lucide-react";
import { useRecurringHook, useRecurringForm } from "../../hooks/useRecurringHook";

const CATEGORIES = [
  "Housing", "Rent", "Utilities", "Bills", "Food", "Groceries",
  "Transport", "Entertainment", "Shopping", "Health", "Education",
  "Salary", "Freelance", "Investment", "Other",
];

const COLORS = [
  { label: "Teal",   value: "#0f766e" },
  { label: "Blue",   value: "#2563eb" },
  { label: "Indigo", value: "#4f46e5" },
  { label: "Amber",  value: "#d97706" },
  { label: "Rose",   value: "#e11d48" },
  { label: "Violet", value: "#7c3aed" },
];

const RecurringForm = ({ onClose, itemToEdit }) => {
  const { createRecurring, editRecurring } = useRecurringHook();
  const { register, handleSubmit, reset, watch, setValue, handleError } = useRecurringForm();

  const selectedColor = watch("color");
  const selectedFrequency = watch("frequency");

  useEffect(() => {
    if (itemToEdit) {
      reset({
        name: itemToEdit.name,
        category: itemToEdit.category,
        amount: itemToEdit.amount,
        type: itemToEdit.type,
        frequency: itemToEdit.frequency,
        dayOfMonth: itemToEdit.dayOfMonth || "",
        color: itemToEdit.color || "#0f766e",
      });
    } else {
      reset({ type: "expense", frequency: "monthly", color: "#0f766e" });
    }
  }, [itemToEdit, reset]);

  const onSubmit = (data) => {
    if (itemToEdit) editRecurring(data, itemToEdit.id, onClose);
    else createRecurring(data, onClose);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-96 max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex h-11 items-center justify-between border-b border-slate-200 px-4">
          <h2 className="text-xs font-semibold text-slate-800">
            {itemToEdit ? "Edit Recurring" : "Add Recurring Transaction"}
          </h2>
          <button type="button" onClick={onClose} className="flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-slate-100">
            <X size={15} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit, handleError)} className="space-y-3 px-4 py-4">
          {/* Name */}
          <div>
            <label className="mb-1 block text-[10px] font-medium text-slate-700">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="e.g. Netflix Subscription"
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
            />
          </div>

          {/* Type + Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[10px] font-medium text-slate-700">Type</label>
              <select
                {...register("type", { required: true })}
                className="h-9 w-full rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-600 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-medium text-slate-700">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="h-9 w-full rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-600 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
              >
                <option value="">Select</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Amount + Frequency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[10px] font-medium text-slate-700">Amount</label>
              <input
                {...register("amount", {
                  required: "Amount is required",
                  min: { value: 0.01, message: "Must be > 0" },
                })}
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-medium text-slate-700">Frequency</label>
              <select
                {...register("frequency", { required: true })}
                className="h-9 w-full rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-600 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          {/* Day of month (only for monthly) */}
          {selectedFrequency === "monthly" && (
            <div>
              <label className="mb-1 block text-[10px] font-medium text-slate-700">
                Day of Month <span className="text-slate-400">(1–31)</span>
              </label>
              <input
                {...register("dayOfMonth")}
                type="number"
                min="1"
                max="31"
                placeholder="1"
                className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
              />
            </div>
          )}

          {/* Color */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-slate-700">Color</label>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setValue("color", c.value)}
                  title={c.label}
                  className={`h-6 w-6 rounded-full transition-all ${selectedColor === c.value ? "ring-2 ring-offset-2 ring-slate-400 scale-110" : "opacity-70 hover:opacity-100"}`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
            <input type="hidden" {...register("color")} />
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-slate-200 bg-slate-50 px-4 py-2.5">
          <button type="button" onClick={onClose} className="h-7 rounded-md border border-slate-300 bg-white px-4 text-[10px] font-medium text-slate-600 hover:bg-slate-100 transition">
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit, handleError)}
            className="flex h-7 items-center gap-1.5 rounded-md bg-teal-700 px-4 text-[10px] font-semibold text-white hover:bg-teal-800 transition cursor-pointer"
          >
            <Check size={12} />
            {itemToEdit ? "Update" : "Add Recurring"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecurringForm;
