import { CreditCard, Home } from "lucide-react";
import RecurringHeader from "../component/RecurringHeader";
import RecurringSummary from "../component/RecurringSummary";
import RecurringTimeline from "../component/RecurringTimeline";

const recurringTransactions = [
  {
    name: "Netflix Subscription",
    frequency: "Monthly",
    nextDate: "Dec 15",
    amount: "$15.99",
    icon: CreditCard,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    name: "Apartment Rent",
    frequency: "Monthly",
    nextDate: "Dec 01",
    amount: "$1,200.00",
    icon: Home,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
];

const RecurringPage = () => {
  return (
    <div className="min-h-screen bg-[#f7f8fc] px-5 py-5 text-slate-800">
      <div className="mx-auto max-w-6xl">
        <RecurringHeader />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[190px_minmax(0,1fr)]">
          <RecurringSummary />
          <RecurringTimeline transactions={recurringTransactions} />
        </div>
      </div>
    </div>
  );
};

export default RecurringPage;