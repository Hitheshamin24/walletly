import { Target } from "lucide-react";

const SAVED = 6400;
const GOAL = 10000;
const PERCENT = ((SAVED / GOAL) * 100).toFixed(0);

const SavingsGoalCard = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex items-center gap-2">
        <div className="rounded-md bg-amber-50 p-1.5 text-amber-600">
          <Target size={14} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Savings Goal</h3>
          <p className="text-[9px] text-slate-400">Emergency fund</p>
        </div>
      </div>

      <div className="mb-2 flex items-end justify-between">
        <span className="text-base font-bold text-slate-800">
          ${SAVED.toLocaleString()}
        </span>
        <span className="text-[9px] text-slate-400">
          of ${GOAL.toLocaleString()}
        </span>
      </div>

      <div className="h-2 rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-amber-500"
          style={{ width: `${PERCENT}%` }}
        />
      </div>

      <p className="mt-2 text-[9px] text-slate-400">{PERCENT}% complete</p>
    </div>
  );
};

export default SavingsGoalCard;
