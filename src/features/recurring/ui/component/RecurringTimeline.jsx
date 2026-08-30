import { CalendarDays, Pencil, Trash2, Pause, Play, AlertTriangle, RepeatIcon } from "lucide-react";

const FREQUENCY_LABELS = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
};

const RecurringTimeline = ({ items, onEdit, onDelete, onPauseResume, fmt }) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 py-16">
        <RepeatIcon size={30} className="text-slate-200" />
        <div className="text-center">
          <p className="text-[12px] font-medium text-slate-500">No recurring transactions yet</p>
          <p className="text-[10px] text-slate-400">Add subscriptions and scheduled payments to track them here</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-50 text-amber-600">
            <CalendarDays size={12} />
          </div>
          <h2 className="text-sm font-bold text-slate-800">Timeline</h2>
        </div>
        <span className="text-[10px] text-slate-400">{items.length} item{items.length !== 1 ? "s" : ""}</span>
      </div>

      <div className="space-y-2">
        {[...items]
          .sort((a, b) => new Date(a.nextDate) - new Date(b.nextDate))
          .map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition hover:shadow-md ${
                item.paused
                  ? "border-slate-100 opacity-60"
                  : item.isOverdue
                  ? "border-red-200"
                  : item.isDueSoon
                  ? "border-amber-200"
                  : "border-slate-200"
              }`}
            >
              {/* Color dot */}
              <div
                className="h-9 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.paused ? "#cbd5e1" : (item.color ?? "#0f766e") }}
              />

              {/* Details */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-[11px] font-semibold text-slate-700">{item.name}</p>
                  {item.paused && (
                    <span className="rounded bg-slate-100 px-1 py-0.5 text-[8px] font-medium text-slate-500">Paused</span>
                  )}
                  {item.isOverdue && !item.paused && (
                    <span className="flex items-center gap-0.5 rounded bg-red-50 px-1 py-0.5 text-[8px] font-medium text-red-500">
                      <AlertTriangle size={8} /> Overdue
                    </span>
                  )}
                  {item.isDueSoon && !item.isOverdue && !item.paused && (
                    <span className="rounded bg-amber-50 px-1 py-0.5 text-[8px] font-medium text-amber-600">Due soon</span>
                  )}
                </div>

                <div className="mt-0.5 flex items-center gap-1 text-[9px] text-slate-400">
                  <span className="capitalize">{item.category}</span>
                  <span>•</span>
                  <span>{FREQUENCY_LABELS[item.frequency]}</span>
                  <span>•</span>
                  <span className={item.isOverdue ? "font-medium text-red-400" : item.isDueSoon ? "font-medium text-amber-500" : ""}>
                    Next: {item.nextDateFormatted}
                    {!item.isOverdue && !item.paused && ` (${item.daysUntil}d)`}
                  </span>
                </div>
              </div>

              {/* Amount */}
              <div className="shrink-0 text-right">
                <p className={`text-sm font-bold ${item.type === "income" ? "text-teal-600" : "text-slate-800"}`}>
                  {item.type === "income" ? "+" : "-"}{fmt(item.amount)}
                </p>
                <p className="text-[9px] capitalize text-slate-400">{item.type}</p>
              </div>

              {/* Action buttons */}
              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={() => onPauseResume(item.id)}
                  title={item.paused ? "Resume" : "Pause"}
                  className={`flex h-6 w-6 items-center justify-center rounded transition cursor-pointer ${item.paused ? "text-teal-500 hover:bg-teal-50" : "text-slate-400 hover:bg-slate-100"}`}
                >
                  {item.paused ? <Play size={11} /> : <Pause size={11} />}
                </button>
                <button
                  onClick={() => onEdit(item)}
                  title="Edit"
                  className="flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-slate-100 transition cursor-pointer"
                >
                  <Pencil size={11} />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  title="Delete"
                  className="flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-red-50 hover:text-red-500 transition cursor-pointer"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecurringTimeline;
