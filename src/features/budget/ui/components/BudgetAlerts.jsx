import { Bell, AlertTriangle, CheckCircle2, Info } from "lucide-react";

const ALERT_STYLES = {
  error: {
    bg: "bg-red-50 border border-red-100",
    iconColor: "text-red-500",
    titleColor: "text-red-700",
    messageColor: "text-red-600",
  },
  warning: {
    bg: "bg-amber-50 border border-amber-100",
    iconColor: "text-amber-500",
    titleColor: "text-amber-700",
    messageColor: "text-amber-600",
  },
  success: {
    bg: "bg-teal-50 border border-teal-100",
    iconColor: "text-teal-600",
    titleColor: "text-teal-700",
    messageColor: "text-teal-600",
  },
};

const BudgetAlerts = ({ alerts, fmt }) => {
  // Build alert messages from enriched budgets
  const alertItems = alerts.map((b) => {
    const isOver = b.isOver;
    return {
      type: isOver ? "error" : "warning",
      Icon: isOver ? AlertTriangle : Info,
      title: isOver ? "Budget Exceeded" : "Approaching Limit",
      message: isOver
        ? `You've exceeded your ${b.name} budget by ${fmt(b.spent - b.limit)}.`
        : `${b.name} is at ${b.percentage}% — ${fmt(b.limit - b.spent)} remaining.`,
    };
  });

  return (
    <aside>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="mb-3 flex items-center gap-1.5">
          <Bell size={12} className="text-indigo-600" />
          <h2 className="text-sm font-semibold text-slate-700">Alerts</h2>
        </div>

        {alertItems.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-6">
            <CheckCircle2 size={22} className="text-teal-400" />
            <p className="text-[11px] font-medium text-slate-500">
              All budgets on track!
            </p>
            <p className="text-center text-[10px] text-slate-400">
              No alerts right now. Keep up the great work.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {alertItems.map((alert, i) => {
              const style = ALERT_STYLES[alert.type];
              return (
                <div key={i} className={`rounded-lg p-3 ${style.bg}`}>
                  <div className="flex gap-2">
                    <alert.Icon
                      size={12}
                      className={`mt-0.5 shrink-0 ${style.iconColor}`}
                    />
                    <div>
                      <p className={`text-[10px] font-semibold ${style.titleColor}`}>
                        {alert.title}
                      </p>
                      <p className={`mt-0.5 text-[9px] leading-relaxed ${style.messageColor}`}>
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
};

export default BudgetAlerts;
