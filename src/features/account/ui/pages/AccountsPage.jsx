import React, { useState } from "react";
import { Landmark, CreditCard, TrendingUp } from "lucide-react";
import PageHeader from "../component/PageHeader";
import NetWorthCard from "../component/NetWorthCard";
import DistributionCard from "../component/DistributionCard";
import AccountCard from "../component/AccountCard";
import AddAccountCard from "../component/AddAccountCard";
import AccountForm from "../component/AccountForm";

const accounts = [
  {
    icon: Landmark,
    iconBg: "bg-blue-50",
    name: "Chase Bank",
    type: "Checking •••• 4920",
    balance: "$12,450.00",
    syncLabel: "↻ Synced 2m ago",
    actionLabel: "View Activity",
  },
  {
    icon: Landmark,
    iconBg: "bg-blue-50",
    name: "Ally Bank",
    type: "High-Yield Savings",
    balance: "$45,000.00",
    syncLabel: "↻ Synced 2m ago",
    actionLabel: "View Activity",
  },
  {
    icon: CreditCard,
    iconBg: "bg-red-50",
    name: "Amex Platinum",
    type: "Credit Card •••• 1004",
    balance: "-$3,450.00",
    balanceLabel: "Current Balance",
    badge: "LIMIT: $10K",
    syncLabel: "↻ Synced 2m ago",
    actionLabel: "View Activity",
  },
  {
    icon: TrendingUp,
    iconBg: "bg-indigo-50",
    name: "Fidelity",
    type: "Brokerage •••• 8821",
    balance: "$98,750.00",
    balanceLabel: "Portfolio Value",
    badge: "+13%",
    syncLabel: "↻ Market Open",
    actionLabel: "View Holdings",
  },
];

const AccountsPage = () => {
  const [addAccountModal, setAddAccountModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <PageHeader />

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <NetWorthCard />
        <DistributionCard />
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-800">
            Linked Accounts
          </h2>

          <button className="text-[10px] font-medium text-teal-700 hover:underline">
            Manage accounts
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {accounts.map((account) => (
            <AccountCard key={account.name} {...account} />
          ))}
          <div onClick={() => setAddAccountModal(true)}>
            <AddAccountCard />
          </div>
        </div>
      </div>
      {addAccountModal && (
        <AccountForm onClose={() => setAddAccountModal(false)} />
      )}
    </div>
  );
};

export default AccountsPage;
