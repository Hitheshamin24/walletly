import { Landmark, CreditCard, TrendingUp, PiggyBank } from "lucide-react";
import PageHeader from "../component/PageHeader";
import NetWorthCard from "../component/NetWorthCard";
import DistributionCard from "../component/DistributionCard";
import AccountCard from "../component/AccountCard";
import AddAccountCard from "../component/AddAccountCard";
import AccountForm from "../component/AccountForm";
import { useSelector } from "react-redux";
import { useState } from "react";

const ACCOUNT_TYPE_ICONS = {
  bank: Landmark,
  wallet: PiggyBank,
  credit: CreditCard,
};

const AccountsPage = () => {
  const accounts = useSelector((state) => state.accounts.accounts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
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
            <AccountCard
              key={account.id || account.accountNo}
              account={account}
              icon={ACCOUNT_TYPE_ICONS[account.accountType] ?? TrendingUp}
              onEdit={() => {
                setSelectedAccount(account);
                setIsModalOpen(true);
              }}
            />
          ))}
          <div
            onClick={() => {
              setSelectedAccount(null);
              setIsModalOpen(true);
            }}
          >
            <AddAccountCard />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AccountForm accountToEdit={selectedAccount}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedAccount(null)
          }}
        />
      )}
    </div>
  );
};

export default AccountsPage;
