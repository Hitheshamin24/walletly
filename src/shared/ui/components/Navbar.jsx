import {
  LayoutDashboard,
  ArrowLeftRight,
  WalletCards,
  ReceiptText,
  PieChart,
  Settings,
  LogOut,
  UserRound,
  Plus,
} from "lucide-react";
import { NavLink } from "react-router";
import { useTransactionContext } from "../../context/TransactionFormContext";

const Navbar = () => {

  const {setShowTransactionModal}=useTransactionContext()
  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "dashboard",
    },
    {
      name: "Transactions",
      icon: ArrowLeftRight,
      path: "transactions",
    },
    {
      name: "Accounts",
      icon: WalletCards,
      path: "accounts",
    },
    {
      name: "Budgets",
      icon: ReceiptText,
      path: "budgets",
    },
    {
      name: "Goals",
      icon: PieChart,
      path: "goals",
    },
    {
      name: "Analytics",
      icon: PieChart,
      path: "analytics",
    },
    {
      name: "Recurring",
      icon: ReceiptText,
      path: "recurring",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-55 flex-col border-r border-slate-200 bg-white px-3 py-4">
      {/* Logo */}
      <div className="mb-5 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg  text-sm font-bold text-white">
          <img src="\walletlyLogo.png" alt="" />
        </div>

        <div className="leading-tight">
          <h1 className="text-sm font-bold text-slate-800">Walletly</h1>
          <p className="text-[8px] text-slate-400">Personal Finance</p>
        </div>
      </div>

      {/* Quick Add */}
      <button
        onClick={() => setShowTransactionModal(true)}
        className="mb-5 flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-teal-700 text-[11px] font-semibold text-white transition hover:bg-teal-800 cursor-pointer "
      >
        <Plus size={13} strokeWidth={2.5} />
        Quick Add
      </button>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              to={item.path}
              key={item.name}
              className={({ isActive }) =>
                `flex h-8 w-full items-center gap-2 rounded-md px-2.5 text-left text-[11px] transition ${
                  isActive
                    ? "bg-blue-50 font-medium text-blue-700"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                } cursor-pointer`
              }
            >
              <Icon size={13} strokeWidth={1.8} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Profile */}
      <div className="mt-auto">
        <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-[10px] text-slate-600 hover:bg-slate-50 cursor-pointer">
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
            <UserRound size={12} className="text-slate-500" />
          </div>

          <span>User Profile</span>
        </button>
      </div>
    </aside>
  );
};

export default Navbar;
