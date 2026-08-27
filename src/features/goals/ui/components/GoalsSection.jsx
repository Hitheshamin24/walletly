import { Plus, Target, MoreVertical } from "lucide-react";

/* ── Individual goal card ─────────────────────────────────── */
const GoalCard = ({ goal }) => {
  const Icon = goal.icon;

  return (
    <div className="rounded-md border border-slate-200 bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-md ${goal.iconBg} ${goal.iconColor}`}
          >
            <Icon size={12} />
          </div>

          <div>
            <h3 className="text-[9px] font-semibold text-slate-800">
              {goal.title}
            </h3>
            <p className="text-[7px] text-slate-400">{goal.description}</p>
          </div>
        </div>

        <button type="button" className="text-slate-400 hover:text-slate-700">
          <MoreVertical size={12} />
        </button>
      </div>

      {/* Amounts */}
      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-[6px] font-medium text-slate-400">Current Saved</p>
          <p className="text-lg font-bold tracking-tight text-slate-900">
            {goal.current}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[7px] text-slate-400">of {goal.target}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-2">
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-teal-500"
            style={{ width: `${goal.percentage}%` }}
          />
        </div>

        <div className="mt-1 flex justify-end">
          <span className="text-[6px] font-medium text-slate-400">
            {goal.percentage}% Completed
          </span>
        </div>
      </div>

      <div className="my-3 border-t border-slate-100" />

      {/* Recent contributions */}
      <div>
        <p className="mb-2 text-[6px] font-bold uppercase tracking-wide text-slate-400">
          Recent Contributions
        </p>

        <div className="space-y-2">
          {goal.contributions.map(([name, date, amount]) => (
            <div
              key={`${name}-${date}`}
              className="flex items-center justify-between"
            >
              <div>
                <p className="text-[7px] font-medium text-slate-600">{name}</p>
                <p className="text-[6px] text-slate-400">{date}</p>
              </div>
              <span className="text-[7px] font-semibold text-slate-600">
                {amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Goals section (header + grid of cards) ───────────────── */
const GoalsSection = ({ goals }) => {
  return (
    <>
      {/* Section header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Target size={11} className="text-indigo-600" />
          <h2 className="text-[10px] font-semibold text-slate-700">
            Savings Goals
          </h2>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 rounded-md bg-blue-600 px-2 py-1 text-[7px] font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          <Plus size={8} />
          Create Goal
        </button>
      </div>

      {/* Goal cards grid */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {goals.map((goal) => (
          <GoalCard key={goal.title} goal={goal} />
        ))}
      </div>
    </>
  );
};

export default GoalsSection;
