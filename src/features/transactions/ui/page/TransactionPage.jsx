import TransactionHeader from "../component/TransactionHeader";
import TransactionFilters from "../component/TransactionFilters";
import TransactionTable from "../component/TransactionTable";

const transactions = [
  {
    date: "Oct 24, 2023",
    description: "Whole Foods Market",
    category: "Food & Dining",
    account: "Chase Checking",
    method: "Visa ••••42",
    amount: "-$42.50",
    type: "expense",
  },
  {
    date: "Oct 22, 2023",
    description: "Acme Corp Inc.",
    category: "Income",
    account: "Bank Checking",
    method: "ACH",
    amount: "+$3,250.00",
    type: "income",
  },
  {
    date: "Oct 20, 2023",
    description: "Transfer to Savings",
    category: "Transfer",
    account: "Bank Checking",
    method: "Internal",
    amount: "$500.00",
    type: "transfer",
  },
  {
    date: "Oct 18, 2023",
    description: "Netflix",
    category: "Entertainment",
    account: "Amex Platinum",
    method: "Amex ••••91",
    amount: "-$15.99",
    type: "expense",
  },
  {
    date: "Oct 15, 2023",
    description: "Shell Gas Station",
    category: "Transportation",
    account: "Chase Checking",
    method: "Visa ••••42",
    amount: "-$45.00",
    type: "expense",
  },
];

const TransactionPage = () => {
  return (
    <div className="min-h-screen bg-[#f6f8fc] px-4 py-5 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <TransactionHeader />
        <TransactionFilters />
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
};

export default TransactionPage;