import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  removeTransaction,
  updateTransaction,
} from "../state/transactionSlice";
import { toast } from "react-toastify";
import { updateAccount } from "../../account/state/accountSlice";


export const useTransactionData = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transactions);
  const { accounts } = useSelector((state) => state.accounts);

  const deleteTransaction = (transaction) => {
    const account = accounts.find(
      (account) => account.id === transaction.accountId,
    );

    if (!account) {
      toast.error("Account not found");
      return;
    }

    const updatedAccount = { ...account };

    if (transaction.transactionType === "income") {
      updatedAccount.currentBalance -= (Number(transaction.amount) || 0);
    } else {
      updatedAccount.currentBalance += (Number(transaction.amount) || 0);
    }

    dispatch(removeTransaction(transaction.id));
    dispatch(updateAccount(updatedAccount));
    toast.success("Transaction deleted successfully");
  };

  return { transactions, deleteTransaction };
};

export const useTransactionForm = () => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.accounts);

  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  const {
    handleSubmit,
    setValue,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      transactionType: "income",
      transactionDate: today,
    },
  });

  const handleTransaction = (data, editingTransaction, onClose) => {
    const amount = (Number(data.amount) || 0);

    const newAccount = accounts.find(
      (account) => account.id === Number(data.transactionAccount)
    );

    if (!newAccount) {
      toast.error("Account not found");
      return;
    }

    if (editingTransaction) {
      const oldAccount = accounts.find(
        (account) => account.id === Number(editingTransaction.accountId)
      );

      if (!oldAccount) {
        toast.error("Old account not found");
        return;
      }

      if (oldAccount.id !== newAccount.id) {
        const updatedOldAccount = { ...oldAccount };
        const updatedNewAccount = { ...newAccount };

        if (editingTransaction.transactionType === "income") {
          updatedOldAccount.currentBalance -= (Number(editingTransaction.amount) || 0);
        } else {
          updatedOldAccount.currentBalance += (Number(editingTransaction.amount) || 0);
        }

        if (data.transactionType === "income") {
          updatedNewAccount.currentBalance += amount;
        } else {
          updatedNewAccount.currentBalance -= amount;
        }

        const updatedTransaction = {
          ...editingTransaction,
          ...data,
          amount,
          accountId: updatedNewAccount.id,
          transactionAccount: updatedNewAccount.accountName,
          transactionAccountNo: updatedNewAccount.accountNo,
        };

        dispatch(updateAccount(updatedOldAccount));
        dispatch(updateAccount(updatedNewAccount));
        dispatch(updateTransaction(updatedTransaction));
        toast.success("Transaction updated successfully");
      } else {
        // Same account — reverse old, apply new
        const updatedAccount = { ...newAccount };

        if (editingTransaction.transactionType === "income") {
          updatedAccount.currentBalance -= (Number(editingTransaction.amount) || 0);
        } else {
          updatedAccount.currentBalance += (Number(editingTransaction.amount) || 0);
        }

        if (data.transactionType === "income") {
          updatedAccount.currentBalance += amount;
        } else {
          updatedAccount.currentBalance -= amount;
        }

        const updatedTransaction = {
          ...editingTransaction,
          ...data,
          amount,
          accountId: updatedAccount.id,
          transactionAccount: updatedAccount.accountName,
          transactionAccountNo: updatedAccount.accountNo,
        };

        dispatch(updateTransaction(updatedTransaction));
        dispatch(updateAccount(updatedAccount));
        toast.success("Transaction updated successfully");
      }
    } else {
      // New transaction
      const updatedAccount = { ...newAccount };

      if (data.transactionType === "income") {
        updatedAccount.currentBalance += amount;
      } else {
        updatedAccount.currentBalance -= amount;
      }

      const newTransaction = {
        id: Date.now(),
        ...data,
        amount,
        accountId: updatedAccount.id,
        transactionAccount: updatedAccount.accountName,
        transactionAccountNo: updatedAccount.accountNo,
      };

      dispatch(addTransaction(newTransaction));
      dispatch(updateAccount(updatedAccount));
      toast.success("Transaction added successfully");
    }

    reset();
    onClose();
  };

  const handleErrors = (error) => {
    if (Object.keys(error).length > 1)
      return toast.warn("All fields are required");
    const firstError = Object.values(error)[0];
    if (firstError?.message) {
      return toast.warn(firstError.message);
    }
  };

  return {
    handleSubmit,
    reset,
    register,
    setValue,
    watch,
    errors,
    handleTransaction,
    handleErrors,
  };
};

