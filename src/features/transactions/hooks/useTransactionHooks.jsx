import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction, updateTransaction } from "../state/transactionSlice";
import { toast } from "react-toastify";

export const useTransactionHook = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transactions);
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
    const amount = Number(data.amount);

    if (editingTransaction) {
      const updatedTransaction = { ...editingTransaction, ...data, amount };
      dispatch(updateTransaction(updatedTransaction));
      toast.success("Transaction updated Successfully");
    } else {
      let newTransaction = { id: Date.now(), ...data, amount };
      dispatch(addTransaction(newTransaction));
      toast.success("Transaction added  Successfully");
    }
    reset();
    onClose();
  };

  const handleErrors = (error) => {
    console.log(error);
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
    transactions,
  };
};
