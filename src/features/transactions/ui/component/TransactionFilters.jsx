import { Search } from "lucide-react";
import { useSelector } from "react-redux";

const TYPE_FILTERS = ["All", "Income", "Expense", "Transfer"];

const CATEGORY_OPTIONS = [
  { label: "All Categories", value: "" },
  { label: "Food", value: "food" },
  { label: "Transport", value: "transport" },
  { label: "Shopping", value: "shopping" },
  { label: "Bills & Utilities", value: "bills" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Health", value: "health" },
  { label: "Education", value: "education" },
  { label: "Rent", value: "rent" },
  { label: "Salary", value: "salary" },
  { label: "Freelance", value: "freelance" },
  { label: "Business", value: "business" },
  { label: "Interest", value: "interest" },
  { label: "Investment", value: "investment" },
  { label: "Gift", value: "gift" },
  { label: "Refund", value: "refund" },
  { label: "Bank Transfer", value: "bank_transfer" },
  { label: "UPI Transfer", value: "upi_transfer" },
  { label: "Cash Withdrawal", value: "cash_withdrawal" },
  { label: "Cash Deposit", value: "cash_deposit" },
  { label: "Account Transfer", value: "account_transfer" },
  { label: "Other", value: "other" },
];

const selectClass =
  "h-7 rounded-md border border-slate-200 bg-slate-50 px-2 pr-6 text-[9px] font-medium text-slate-600 outline-none appearance-none cursor-pointer focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 hover:border-slate-300 transition";

const TransactionFilters = () => {
  const accounts = useSelector((state) => state.accounts.accounts);
  const transactions = useSelector((state) => state.transactions.transactions);
  
  const monthOptions = [
    { label: "All Time", value: "" },
    ...Array.from(
      new Set(
        transactions
          .map((t) => t.transactionDate?.slice(0, 7))
          .filter(Boolean),
      ),
    )
      .sort((a, b) => b.localeCompare(a))
      .map((ym) => {
        const [year, month] = ym.split("-");
        const label = new Date(year, month - 1, 1).toLocaleString("en-GB", {
          month: "long",
          year: "numeric",
        });
        return { label, value: ym };
      }),
  ];

  return (
    <div className="mb-4 rounded-lg border border-slate-200 bg-white p-2.5 shadow-[0_1px_4px_rgba(15,23,42,0.05)]">
      <div className="flex flex-wrap items-center gap-2">

        {/* Month */}
        <select className={selectClass}>
          {monthOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Category */}
        <select className={selectClass}>
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Account */}
        <select className={selectClass}>
          <option value="">All Accounts</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.accountName}
            </option>
          ))}
        </select>

        {/* Search */}
        <div className="relative ml-auto w-full sm:w-40">
          <Search
            size={11}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="h-7 w-full rounded-md border border-slate-200 bg-slate-50 pl-7 pr-2 text-[9px] text-slate-600 outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20"
          />
        </div>
      </div>

      {/* Type pills */}
      <div className="mt-2 flex items-center gap-1.5">
        {TYPE_FILTERS.map((item, index) => (
          <button
            key={item}
            type="button"
            className={`rounded px-2.5 py-1 text-[8px] font-medium transition ${
              index === 0
                ? "bg-teal-700 text-white"
                : "text-slate-400 hover:bg-slate-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransactionFilters;
