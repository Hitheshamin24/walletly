import { useMemo } from "react";
import TransactionHeader from "../component/TransactionHeader";
import TransactionFilters from "../component/TransactionFilters";
import TransactionTable from "../component/TransactionTable";
import { useTransactionContext } from "../../../../shared/context/TransactionFormContext";
import { useTransactionData } from "../../hooks/useTransactionHooks";
import { useSelector } from "react-redux";

const TransactionPage = () => {
  const { setShowTransactionModal, setEditingTransaction } =
    useTransactionContext();
  const { transactions } = useTransactionData();
  const { account, date, category, type, search } = useSelector(
    (state) => state.filter,
  );

  const filteredTransactions = useMemo(() => {
    const searchLower = search?.toLowerCase().trim();

    return transactions.filter((transaction) => {
      const accountMatch = !account || transaction.accountId == account;

      const dateMatch = !date || transaction.transactionDate?.startsWith(date);

      const typeMatch =
        !type ||
        transaction.transactionType?.toLowerCase() === type.toLowerCase();

      const categoryMatch =
        !category ||
        transaction.transactionCategory?.toLowerCase() ===
          category.toLowerCase();

      const searchMatch =
        !searchLower ||
        transaction.paymentMethod?.toLowerCase().includes(searchLower) ||
        transaction.transactionNote?.toLowerCase().includes(searchLower) ||
        transaction.transactionCategory?.toLowerCase().includes(searchLower);

      return accountMatch && dateMatch && categoryMatch && typeMatch && searchMatch;
    });
  }, [transactions, account, date, category, type, search]);

  return (
    <div className="min-h-screen bg-[#f6f8fc] px-4 py-5 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <TransactionHeader setShowTransactionModal={setShowTransactionModal} />
        <TransactionFilters />
        <TransactionTable
          transactions={filteredTransactions}
          setEditingTransaction={setEditingTransaction}
          setShowTransactionModal={setShowTransactionModal}
        />
      </div>
    </div>
  );
};

export default TransactionPage;
