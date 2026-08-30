import { Target, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useDashboard } from "../../../hooks/useDashboard";
import { useGoalHook } from "../../../../features/goals/hooks/useGoalHook";

const SavingsGoalCard = () => {
  const navigate = useNavigate();
  const { fmt } = useDashboard();
  const { goals, totalSaved, totalTarget, completedCount } = useGoalHook();

  const hasGoals = goals.length > 0;
  const overallPct = totalTarget > 0 ? Math.min(Math.round((totalSaved / totalTarget) * 100), 100) : 0;

  // Top 2 active (non-completed) goals to display
  const activeGoals = goals.filter((g) => !g.isCompleted).slice(0, 2);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-amber-50 p-1.5 text-amber-600">
            <Target size={14} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Savings Goals</h3>
            <p className="text-[9px] text-slate-400">
              {hasGoals ? `${completedCount}/${goals.length} completed` : "Track your targets"}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/main/goals")}
          className="flex items-center gap-1 text-[10px] text-teal-600 hover:underline cursor-pointer"
        >
          View All <ArrowRight size={10} />
        </button>
      </div>

      {!hasGoals ? (
        <div className="flex flex-col items-center gap-2 py-3 text-center">
          <Target size={24} className="text-amber-200" />
          <p className="text-[11px] text-slate-500">No goals yet</p>
          <button
            onClick={() => navigate("/main/goals")}
            className="flex items-center gap-1 rounded-md bg-amber-50 px-3 py-1.5 text-[10px] font-medium text-amber-700 hover:bg-amber-100 transition cursor-pointer"
          >
            Create a Goal <ArrowRight size={10} />
          </button>
        </div>
      ) : (
        <>
          {/* Overall */}
          <div className="mb-3">
            <div className="mb-1 flex justify-between text-[10px]">
              <span className="text-slate-500">Overall: {fmt(totalSaved)}</span>
              <span className="text-slate-400">of {fmt(totalTarget)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-500"
                style={{ width: `${overallPct}%` }}
              />
            </div>
            <p className="mt-1 text-right text-[9px] text-slate-400">{overallPct}%</p>
          </div>

          {/* Active goals */}
          <div className="space-y-2">
            {activeGoals.map((g) => (
              <div key={g.id} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: g.color ?? "#0f766e" }}
                />
                <span className="min-w-0 flex-1 truncate text-[10px] text-slate-600">{g.title}</span>
                <span className="text-[10px] font-semibold text-slate-700">{g.percentage}%</span>
              </div>
            ))}
            {completedCount > 0 && (
              <div className="flex items-center gap-1.5 text-[10px] text-teal-600">
                <CheckCircle2 size={11} />
                {completedCount} goal{completedCount > 1 ? "s" : ""} completed!
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SavingsGoalCard;
