import { useEffect } from "react";
import { X, Check } from "lucide-react";
import { useGoalHook, useGoalForm } from "../../hooks/useGoalHook";

const COLORS = [
  { label: "Teal",   value: "#0f766e" },
  { label: "Blue",   value: "#2563eb" },
  { label: "Indigo", value: "#4f46e5" },
  { label: "Amber",  value: "#d97706" },
  { label: "Rose",   value: "#e11d48" },
  { label: "Violet", value: "#7c3aed" },
  { label: "Green",  value: "#16a34a" },
];

const GoalForm = ({ onClose, goalToEdit }) => {
  const { createGoal, editGoal } = useGoalHook();
  const { register, handleSubmit, reset, watch, setValue, handleError } = useGoalForm();

  const selectedColor = watch("color");

  useEffect(() => {
    if (goalToEdit) {
      reset({
        title: goalToEdit.title,
        targetAmount: goalToEdit.targetAmount,
        deadline: goalToEdit.deadline || "",
        color: goalToEdit.color || "#0f766e",
      });
    } else {
      reset({ color: "#0f766e" });
    }
  }, [goalToEdit, reset]);

  const onSubmit = (data) => {
    if (goalToEdit) editGoal(data, goalToEdit.id, onClose);
    else createGoal(data, onClose);
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
            {goalToEdit ? "Edit Goal" : "Create New Goal"}
          </h2>
          <button type="button" onClick={onClose} className="flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-slate-100">
            <X size={15} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit, handleError)} className="space-y-3 px-4 py-4">
          {/* Title */}
          <div>
            <label className="mb-1 block text-[10px] font-medium text-slate-700">Goal Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="e.g. Japan Trip 2025"
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
            />
          </div>

          {/* Target Amount */}
          <div>
            <label className="mb-1 block text-[10px] font-medium text-slate-700">Target Amount</label>
            <input
              {...register("targetAmount", {
                required: "Target amount is required",
                min: { value: 1, message: "Must be greater than 0" },
              })}
              type="number"
              min="1"
              step="0.01"
              placeholder="5000.00"
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
            />
          </div>

          {/* Initial saved — only on create */}
          {!goalToEdit && (
            <div>
              <label className="mb-1 block text-[10px] font-medium text-slate-700">
                Already Saved <span className="text-slate-400">(optional)</span>
              </label>
              <input
                {...register("initialSaved")}
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
              />
            </div>
          )}

          {/* Deadline */}
          <div>
            <label className="mb-1 block text-[10px] font-medium text-slate-700">
              Deadline <span className="text-slate-400">(optional)</span>
            </label>
            <input
              {...register("deadline")}
              type="date"
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
            />
          </div>

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
            {goalToEdit ? "Update Goal" : "Create Goal"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalForm;
