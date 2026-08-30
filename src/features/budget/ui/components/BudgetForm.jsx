import { useEffect } from "react";
import { X, Check } from "lucide-react";
import { useBudgetHook, useBudgetForm } from "../../hooks/useBudgetHook";

const CATEGORIES = [
  "Food", "Groceries", "Transport", "Housing", "Rent", "Bills",
  "Utilities", "Entertainment", "Shopping", "Health", "Education",
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

const BudgetForm = ({ onClose, budgetToEdit }) => {
  const { createBudget, editBudget } = useBudgetHook();
  const { register, handleSubmit, reset, watch, setValue, errors, handleError } =
    useBudgetForm();

  const selectedColor = watch("color");

  useEffect(() => {
    if (budgetToEdit) {
      reset({
        name: budgetToEdit.name,
        category: budgetToEdit.category,
        limit: budgetToEdit.limit,
        color: budgetToEdit.color ?? "#0f766e",
      });
    } else {
      reset({ color: "#0f766e" });
    }
  }, [budgetToEdit, reset]);

  const onSubmit = (data) => {
    if (budgetToEdit) {
      editBudget(data, budgetToEdit.id, onClose);
    } else {
      createBudget(data, onClose);
    }
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
            {budgetToEdit ? "Edit Budget" : "Set New Budget"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center rounded text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={15} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit, handleError)} className="px-4 py-4 space-y-3">
          {/* Budget Name */}
          <div>
            <label className="mb-1 block text-[10px] font-medium text-slate-700">
              Budget Name
            </label>
            <input
              {...register("name", { required: "Budget name is required" })}
              placeholder="e.g. Monthly Groceries"
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-1 block text-[10px] font-medium text-slate-700">
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-600 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Monthly Limit */}
          <div>
            <label className="mb-1 block text-[10px] font-medium text-slate-700">
              Monthly Limit
            </label>
            <input
              {...register("limit", {
                required: "Limit is required",
                min: { value: 1, message: "Limit must be greater than 0" },
              })}
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
            />
          </div>

          {/* Color */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-slate-700">
              Color
            </label>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setValue("color", c.value)}
                  title={c.label}
                  className={`h-6 w-6 rounded-full transition-all ${
                    selectedColor === c.value
                      ? "ring-2 ring-offset-2 ring-slate-400 scale-110"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
            <input type="hidden" {...register("color")} />
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
            form=""
            onClick={handleSubmit(onSubmit, handleError)}
            className="flex h-7 items-center gap-1.5 rounded-md bg-teal-700 px-4 text-[10px] font-semibold text-white transition hover:bg-teal-800"
          >
            <Check size={12} />
            {budgetToEdit ? "Update Budget" : "Create Budget"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetForm;
