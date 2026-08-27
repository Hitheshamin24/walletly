import { Bell, AlertTriangle, CheckCircle2 } from "lucide-react";

const alerts = [
  {
    type: "error",
    icon: AlertTriangle,
    title: "Budget Exceeded",
    message: "You have exceeded your Groceries budget by $120.",
  },
  {
    type: "success",
    icon: CheckCircle2,
    title: "Goal Completed!",
    message: 'Congratulations, you\'ve reached your "New Laptop" goal.',
  },
];

const ALERT_STYLES = {
  error: {
    bg: "bg-red-50",
    iconColor: "text-red-500",
    titleColor: "text-red-700",
    messageColor: "text-red-600",
  },
  success: {
    bg: "bg-teal-50",
    iconColor: "text-teal-600",
    titleColor: "text-teal-700",
    messageColor: "text-teal-600",
  },
};

const BudgetAlerts = () => {
  return (
    <aside>
      <div className="rounded-md border border-slate-200 bg-white p-2.5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="mb-3 flex items-center gap-1.5">
          <Bell size={10} className="text-indigo-600" />
          <h2 className="text-[9px] font-semibold text-slate-700">
            Recent Alerts
          </h2>
        </div>

        <div className="space-y-2">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            const style = ALERT_STYLES[alert.type];
            return (
              <div key={alert.title} className={`rounded-md p-2 ${style.bg}`}>
                <div className="flex gap-1.5">
                  <Icon
                    size={10}
                    className={`mt-0.5 shrink-0 ${style.iconColor}`}
                  />
                  <div>
                    <p className={`text-[7px] font-semibold ${style.titleColor}`}>
                      {alert.title}
                    </p>
                    <p className={`mt-0.5 text-[6px] leading-relaxed ${style.messageColor}`}>
                      {alert.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default BudgetAlerts;
