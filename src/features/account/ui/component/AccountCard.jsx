import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { useAccountHook } from "../../hooks/useAccountsHook";

const TYPE_STYLES = {
  bank: {
    gradient: "from-teal-500 to-emerald-400",
    iconBg: "bg-teal-50 text-teal-600",
    badge: "bg-teal-50 text-teal-600",
  },
  wallet: {
    gradient: "from-violet-500 to-purple-400",
    iconBg: "bg-violet-50 text-violet-600",
    badge: "bg-violet-50 text-violet-600",
  },
  credit: {
    gradient: "from-rose-500 to-pink-400",
    iconBg: "bg-rose-50 text-rose-600",
    badge: "bg-rose-50 text-rose-600",
  },
  investment: {
    gradient: "from-amber-500 to-yellow-400",
    iconBg: "bg-amber-50 text-amber-600",
    badge: "bg-amber-50 text-amber-600",
  },
};

const DEFAULT_STYLE = {
  gradient: "from-slate-400 to-slate-300",
  iconBg: "bg-slate-100 text-slate-500",
  badge: "bg-slate-100 text-slate-500",
};


const AccountCard = ({
  icon: Icon,
  onEdit,
  balanceLabel = "Available Balance",
  account,
}) => {
  const { deleteAccount } = useAccountHook();
  const [openMenuModal, setOpenMenuModal] = useState(false);

  const typeKey = account?.accountType?.toLowerCase();
  const styles = TYPE_STYLES[typeKey] ?? DEFAULT_STYLE;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className={`h-1 w-full bg-linear-to-r ${styles.gradient}`} />

      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${styles.iconBg}`}
            >
              {Icon && <Icon size={15} strokeWidth={2} />}
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-[13px] font-semibold leading-tight text-slate-800">
                {account?.accountName}
              </h3>
              <span
                className={`mt-0.5 inline-block rounded-full px-1.5 py-0.5 text-[9px] font-medium capitalize tracking-wide ${styles.badge}`}
              >
                {account?.accountType}
              </span>
            </div>
          </div>

          {/* Menu */}
          <div className="relative shrink-0">
            <button
              onClick={() => setOpenMenuModal((prev) => !prev)}
              className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Account options"
            >
              <EllipsisVertical size={15} />
            </button>

            {openMenuModal && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setOpenMenuModal(false)}
                />
                <div className="absolute right-0 top-8 z-50 w-28 overflow-hidden rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      onEdit();
                      setOpenMenuModal(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-teal-700"
                  >
                    <Pencil size={13} strokeWidth={2} />
                    <span>Edit</span>
                  </button>

                  <div className="mx-2 my-0.5 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={() => {
                      deleteAccount(account);
                      setOpenMenuModal(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[11px] font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash size={13} strokeWidth={2} />
                    <span>Delete</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Balance section */}
        <div className="rounded-lg bg-slate-50 px-3 py-2.5">
          <p className="text-[9px] font-medium uppercase tracking-widest text-slate-400">
            {balanceLabel}
          </p>
          <p className="mt-1 text-xl font-bold text-slate-800">
            {account.currency}{(Number(account?.currentBalance) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Account number hint */}
        {account?.accountNo && (
          <p className="text-[9px] text-slate-400">
            ···· {String(account.accountNo).slice(-4)}
          </p>
        )}
      </div>
    </div>
  );
};

export default AccountCard;
