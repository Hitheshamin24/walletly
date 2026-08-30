import { useState } from "react";
import { X, Check, PlusCircle } from "lucide-react";
import { useGoalHook } from "../../hooks/useGoalHook";

const ContributeModal = ({ goal, onClose, fmt }) => {
  const { contribute } = useGoalHook();
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const remaining = goal.target - goal.saved;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-80 max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex h-11 items-center justify-between border-b border-slate-200 px-4">
          <div>
            <h2 className="text-xs font-semibold text-slate-800">Add Contribution</h2>
            <p className="text-[9px] text-slate-400">{goal.title}</p>
          </div>
          <button onClick={onClose} className="flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-slate-100">
            <X size={15} />
          </button>
        </div>

        <div className="space-y-3 px-4 py-4">
          <div className="rounded-lg bg-slate-50 p-3 text-center">
            <p className="text-[9px] text-slate-400">Remaining to goal</p>
            <p className="text-lg font-bold text-slate-800">{fmt(remaining)}</p>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-teal-500"
                style={{ width: `${goal.percentage}%`, backgroundColor: goal.color }}
              />
            </div>
            <p className="mt-1 text-[9px] text-slate-400">{goal.percentage}% complete</p>
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-medium text-slate-700">Amount</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-medium text-slate-700">
              Note <span className="text-slate-400">(optional)</span>
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Monthly transfer"
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-200 bg-slate-50 px-4 py-2.5">
          <button onClick={onClose} className="h-7 rounded-md border border-slate-300 bg-white px-4 text-[10px] font-medium text-slate-600 hover:bg-slate-100 transition">
            Cancel
          </button>
          <button
            onClick={() => contribute(goal.id, amount, note, onClose)}
            className="flex h-7 items-center gap-1.5 rounded-md bg-teal-700 px-4 text-[10px] font-semibold text-white hover:bg-teal-800 transition cursor-pointer"
          >
            <Check size={12} />
            Add {amount ? fmt(amount) : ""}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContributeModal;
