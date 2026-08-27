import { CalendarDays } from "lucide-react";

const bills = [
  { name: "Rent", date: "Sep 01", amount: "$1,200" },
  { name: "Netflix", date: "Sep 03", amount: "$15.99" },
  { name: "Electricity", date: "Sep 05", amount: "$84.50" },
  { name: "Internet", date: "Sep 08", amount: "$59.99" },
];

const UpcomingBillsCard = () => {
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

      <div className="space-y-2">
        {bills.map((bill) => (
          <div
            key={bill.name}
            className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
          >
            <div>
              <p className="text-[10px] font-semibold text-slate-700">
                {bill.name}
              </p>
              <p className="text-[9px] text-slate-400">{bill.date}</p>
            </div>
            <span className="text-[10px] font-semibold text-slate-700">
              {bill.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingBillsCard;
