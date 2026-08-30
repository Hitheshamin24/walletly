import { useState } from "react";
import GoalHeader from "../components/GoalHeader";
import CategorySection from "../components/CategorySection";
import GoalsSection from "../components/GoalsSection";
import GoalForm from "../components/GoalForm";
import ContributeModal from "../components/ContributeModal";
import { useGoalHook } from "../../hooks/useGoalHook";
import { useDashboard } from "../../../../shared/hooks/useDashboard";

const GoalPage = () => {
  const { goals, completedCount, totalSaved, totalTarget, deleteGoal } = useGoalHook();
  const { fmt } = useDashboard();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [contributingGoal, setContributingGoal] = useState(null);

  const openNew = () => { setEditingGoal(null); setIsFormOpen(true); };
  const openEdit = (goal) => { setEditingGoal(goal); setIsFormOpen(true); };
  const closeForm = () => { setIsFormOpen(false); setEditingGoal(null); };
  const openContribute = (goal) => setContributingGoal(goal);
  const closeContribute = () => setContributingGoal(null);

  const overallPct = totalTarget > 0 ? Math.min(Math.round((totalSaved / totalTarget) * 100), 100) : 0;

  return (
    <div className="min-h-screen bg-[#f7f8fc] px-4 py-5 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <GoalHeader onNewGoal={openNew} />

        {/* Summary strip */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Total Goals</p>
            <p className="mt-1 text-xl font-bold text-slate-800">{goals.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Total Saved</p>
            <p className="mt-1 text-xl font-bold text-teal-600">{fmt(totalSaved)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Completed</p>
            <p className="mt-1 text-xl font-bold text-indigo-600">
              {completedCount}/{goals.length}
            </p>
          </div>
        </div>

        {/* Overall progress */}
        {goals.length > 0 && (
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">Overall Progress</p>
              <p className="text-[11px] text-slate-400">
                {fmt(totalSaved)} of {fmt(totalTarget)}
              </p>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-teal-500 transition-all duration-500"
                style={{ width: `${overallPct}%` }}
              />
            </div>
            <p className="mt-1.5 text-right text-[10px] text-slate-400">{overallPct}% of all goals</p>
          </div>
        )}

        {/* Category breakdown from real transactions */}
        <CategorySection fmt={fmt} />

        {/* Goals list */}
        <GoalsSection
          goals={goals}
          onEdit={openEdit}
          onDelete={deleteGoal}
          onContribute={openContribute}
          onNew={openNew}
          fmt={fmt}
        />
      </div>

      {isFormOpen && <GoalForm goalToEdit={editingGoal} onClose={closeForm} />}
      {contributingGoal && (
        <ContributeModal goal={contributingGoal} onClose={closeContribute} fmt={fmt} />
      )}
    </div>
  );
};

export default GoalPage;