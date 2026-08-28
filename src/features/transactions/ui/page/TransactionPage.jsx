import TransactionHeader from "../component/TransactionHeader";
import TransactionFilters from "../component/TransactionFilters";
import TransactionTable from "../component/TransactionTable";
import { useTransactionContext } from "../../../../shared/context/TransactionFormContext";
import { useTransactionHook } from "../../hooks/useTransactionHooks";

const TransactionPage = () => {
  const { setShowTransactionModal, setEditingTransaction } =
    useTransactionContext();
  const { transactions } = useTransactionHook();
  return (
    <div className="min-h-screen bg-[#f6f8fc] px-4 py-5 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <TransactionHeader setShowTransactionModal={setShowTransactionModal} />
        <TransactionFilters />
        <TransactionTable
          transactions={transactions}
          setEditingTransaction={setEditingTransaction}
          setShowTransactionModal={setShowTransactionModal}
        />
      </div>
    </div>
  );
};

export default TransactionPage;
