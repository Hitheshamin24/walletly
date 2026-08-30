import { Target, CalendarDays } from "lucide-react";

const GOAL_COLORS = {
  "Emergency Fund": "#0f766e",
  Vacation: "#3b82f6",
};
const DEFAULT_COLOR = "#6366f1";


const GoalCard = ({ goal }) => {
  const color = GOAL_COLORS[goal.name] ?? DEFAULT_COLOR;

  return (
    <div className="rounded-md border border-slate-200 bg-white p-2.5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-3">
        {/* Circular progress */}
        <div
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(${color} ${goal.percentage * 3.6}deg, #e5e7eb ${goal.percentage * 3.6}deg)`,
          }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
            <span className="text-[7px] font-bold text-slate-700">
              {goal.percentage}%
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          <h3 className="text-[8px] font-semibold text-slate-700">
            {goal.name}
          </h3>

          <p className="mt-0.5 text-[8px] font-bold text-slate-800">
            {goal.saved}
            <span className="font-normal text-slate-400"> / {goal.target}</span>
          </p>

          <div className="mt-1 flex items-center gap-1">
            <CalendarDays size={7} className="text-slate-400" />
            <span className="text-[6px] text-slate-400">{goal.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Savings goals section */
const SavingsGoals = ({ goals }) => {
  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Target size={10} className="text-amber-600" />
          <h2 className="text-[9px] font-semibold text-slate-700">
            Savings Goals
          </h2>
        </div>
        <button className="text-[7px] font-medium text-teal-600 hover:underline">
          See All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {goals.map((goal) => (
          <GoalCard key={goal.name} goal={goal} />
        ))}
      </div>
    </div>
  );
};

export default SavingsGoals;
