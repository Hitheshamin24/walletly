import { Plus } from "lucide-react";

const GoalHeader = ({ onNewGoal }) => {
  return (
    <div className="mb-4 flex items-start justify-between">
      <div>
        <h1 className="text-lg font-bold tracking-tight text-slate-900">
          Savings Goals
        </h1>
        <p className="text-[11px] text-slate-500">
          Set targets, track progress, and achieve your financial milestones.
        </p>
      </div>

      <button
        onClick={onNewGoal}
        className="flex h-8 items-center gap-1.5 rounded-md bg-teal-700 px-3 text-[11px] font-semibold text-white shadow-sm hover:bg-teal-800 transition cursor-pointer"
      >
        <Plus size={12} strokeWidth={2.5} />
        Create Goal
      </button>
    </div>
  );
};

export default GoalHeader;
