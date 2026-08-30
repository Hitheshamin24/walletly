import { useState } from "react";
import RecurringHeader from "../component/RecurringHeader";
import RecurringSummary from "../component/RecurringSummary";
import RecurringTimeline from "../component/RecurringTimeline";
import RecurringForm from "../component/RecurringForm";
import { useRecurringHook } from "../../hooks/useRecurringHook";
import { useDashboard } from "../../../../shared/hooks/useDashboard";

const RecurringPage = () => {
  const { items, summary, deleteRecurring, pauseResume } = useRecurringHook();
  const { fmt } = useDashboard();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const openAdd = () => { setEditingItem(null); setIsFormOpen(true); };
  const openEdit = (item) => { setEditingItem(item); setIsFormOpen(true); };
  const closeForm = () => { setIsFormOpen(false); setEditingItem(null); };

  return (
    <div className="min-h-screen bg-[#f7f8fc] px-5 py-5 text-slate-800">
      <div className="mx-auto max-w-6xl">
        <RecurringHeader onAdd={openAdd} />

        {/* Summary strip */}
        <div className="mb-5 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Total Items</p>
            <p className="mt-1 text-xl font-bold text-slate-800">{items.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Monthly Total</p>
            <p className="mt-1 text-xl font-bold text-slate-800">{fmt(summary.totalMonthly)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Due This Week</p>
            <p className={`mt-1 text-xl font-bold ${summary.dueSoon > 0 ? "text-amber-600" : "text-slate-300"}`}>
              {summary.dueSoon}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[210px_minmax(0,1fr)]">
          {/* Left sidebar */}
          <RecurringSummary summary={summary} fmt={fmt} />

          {/* Main timeline */}
          <RecurringTimeline
            items={items}
            onEdit={openEdit}
            onDelete={deleteRecurring}
            onPauseResume={pauseResume}
            fmt={fmt}
          />
        </div>
      </div>

      {isFormOpen && <RecurringForm itemToEdit={editingItem} onClose={closeForm} />}
    </div>
  );
};

export default RecurringPage;