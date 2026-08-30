import { CalendarDays, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const UpcomingBillsCard = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Upcoming Bills
          </h3>
          <p className="text-[10px] text-slate-400">Next 30 days</p>
        </div>
        <CalendarDays size={15} className="text-slate-400" />
      </div>

      <div className="flex flex-col items-center justify-center gap-3 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50">
          <CalendarDays size={18} className="text-slate-300" />
        </div>
        <div className="text-center">
          <p className="text-[11px] font-medium text-slate-500">
            Recurring Bills Coming Soon
          </p>
          <p className="text-[10px] text-slate-400">
            Set up recurring transactions to track upcoming bills
          </p>
        </div>
        <button
          onClick={() => navigate("/main/recurring")}
          className="flex items-center gap-1 rounded-md bg-slate-50 px-3 py-1.5 text-[10px] font-medium text-slate-600 hover:bg-slate-100 transition cursor-pointer"
        >
          Set up Recurring
          <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
};

export default UpcomingBillsCard;
