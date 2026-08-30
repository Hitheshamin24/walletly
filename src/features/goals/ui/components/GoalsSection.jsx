import { Target, Pencil, Trash2, PlusCircle, CalendarDays, CheckCircle2 } from "lucide-react";

const GoalCard = ({ goal, onEdit, onDelete, onContribute, fmt }) => {
  const isCompleted = goal.isCompleted;

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className={`rounded-xl border bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition hover:shadow-md ${isCompleted ? "border-teal-200" : "border-slate-200"}`}>
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Color dot / completed check */}
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full`}
            style={{ backgroundColor: isCompleted ? "#0f766e" : (goal.color ?? "#0f766e") + "20" }}
          >
            {isCompleted
              ? <CheckCircle2 size={14} className="text-teal-600" />
              : <Target size={13} style={{ color: goal.color ?? "#0f766e" }} />
            }
          </div>
          <div>
            <h3 className="text-[12px] font-semibold text-slate-800">{goal.title}</h3>
            {goal.deadline && (
              <p className="flex items-center gap-1 text-[9px] text-slate-400">
                <CalendarDays size={8} />
                {formatDate(goal.deadline)}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={() => onContribute(goal)} title="Add contribution" className="flex h-6 w-6 items-center justify-center rounded text-teal-500 hover:bg-teal-50 transition cursor-pointer">
            <PlusCircle size={13} />
          </button>
          <button onClick={() => onEdit(goal)} title="Edit" className="flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-slate-100 transition cursor-pointer">
            <Pencil size={11} />
          </button>
          <button onClick={() => onDelete(goal.id)} title="Delete" className="flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-red-50 hover:text-red-500 transition cursor-pointer">
            <Trash2 size={11} />
          </button>
        </div>
      </div>

      {/* Amounts */}
      <div className="mb-2 flex items-end justify-between">
        <div>
          <p className="text-[9px] text-slate-400">Saved</p>
          <p className="text-lg font-bold text-slate-800">{fmt(goal.saved)}</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-slate-400">Target</p>
          <p className="text-sm font-semibold text-slate-500">{fmt(goal.target)}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-1 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${goal.percentage}%`,
            backgroundColor: isCompleted ? "#0f766e" : (goal.color ?? "#0f766e"),
          }}
        />
      </div>
      <div className="flex justify-between text-[9px]">
        <span className={isCompleted ? "font-semibold text-teal-600" : "text-slate-400"}>
          {isCompleted ? "🎉 Goal Achieved!" : `${fmt(goal.target - goal.saved)} to go`}
        </span>
        <span className="font-medium text-slate-500">{goal.percentage}%</span>
      </div>

      {/* Recent contributions */}
      {goal.contributions?.length > 0 && (
        <div className="mt-3 border-t border-slate-100 pt-3">
          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
            Recent
          </p>
          <div className="space-y-1.5">
            {goal.contributions.slice(0, 2).map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-medium text-slate-600">{c.note}</p>
                  <p className="text-[9px] text-slate-400">{c.date}</p>
                </div>
                <span className="text-[10px] font-semibold text-teal-600">+{fmt(c.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const GoalsSection = ({ goals, onEdit, onDelete, onContribute, onNew, fmt }) => {
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Target size={13} className="text-indigo-600" />
          <h2 className="text-sm font-semibold text-slate-700">Savings Goals</h2>
        </div>
        <span className="text-[10px] text-slate-400">
          {goals.filter((g) => g.isCompleted).length}/{goals.length} completed
        </span>
      </div>

      {goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 py-12">
          <Target size={28} className="text-slate-200" />
          <div className="text-center">
            <p className="text-[12px] font-medium text-slate-500">No goals yet</p>
            <p className="text-[10px] text-slate-400">Create a savings goal to start tracking progress</p>
          </div>
          <button
            onClick={onNew}
            className="rounded-md bg-teal-700 px-4 py-1.5 text-[10px] font-semibold text-white hover:bg-teal-800 transition cursor-pointer"
          >
            Create First Goal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={onEdit}
              onDelete={onDelete}
              onContribute={onContribute}
              fmt={fmt}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default GoalsSection;
