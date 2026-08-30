import { Target, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const SavingsGoalCard = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex items-center gap-2">
        <div className="rounded-md bg-amber-50 p-1.5 text-amber-600">
          <Target size={14} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Savings Goals</h3>
          <p className="text-[9px] text-slate-400">Track your targets</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50">
          <Target size={18} className="text-amber-300" />
        </div>
        <div className="text-center">
          <p className="text-[11px] font-medium text-slate-500">
            Goals Feature Coming Soon
          </p>
          <p className="text-[10px] text-slate-400">
            Create savings goals and track your progress
          </p>
        </div>
        <button
          onClick={() => navigate("/main/goals")}
          className="flex items-center gap-1 rounded-md bg-amber-50 px-3 py-1.5 text-[10px] font-medium text-amber-700 hover:bg-amber-100 transition cursor-pointer"
        >
          View Goals
          <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
};

export default SavingsGoalCard;
