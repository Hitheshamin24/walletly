import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addAccount,
  removeAccount,
  updateAccount,
} from "../state/accountSlice";

export const useAccountHook = () => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.accounts);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      accountType: "bank",
    },
  });

  const handleAccounts = (data, accountToEdit, onClose) => {
    const exists = accounts?.some(
      (account) =>
        account.accountNo === data.accountNo &&
        account.id !== accountToEdit?.id,
    );
    if (exists) return toast.error("Account number already exists");

    const initialBalance = Number(data.initialBalance);
    if (accountToEdit) {
      dispatch(
        updateAccount({
          ...accountToEdit,
          ...data,
          initialBalance,
          currentBalance: initialBalance,
        }),
      );
      toast.success("Account updated successfully");
    } else {
      dispatch(
        addAccount({
          id: Date.now(),
          ...data,
          initialBalance,
          currentBalance: initialBalance,
        }),
      );
      toast.success("Account added successfully");
    }

    onClose();
    reset();
  };
  const deleteAccount = (data) => {
    dispatch(removeAccount(data.id));
    toast.success("Account removed successfully");
  };
  const handleError = (error) => {
    if (Object.keys(error).length > 1)
      return toast.warn("All fields are required");
    const firstError = Object.values(error)[0];
    if (firstError?.message) {
      return toast.warn(firstError.message);
    }
  };

  const calculateTotal = () => {
    const totalInitial = accounts.reduce(
      (acc, curr) => acc + curr.initialBalance,
      0,
    );
    const currentTotal = accounts.reduce(
      (acc, curr) => acc + curr.currentBalance,
      0,
    );
    const totalCurrency = accounts.reduce((acc, curr) => {
      const sym = curr.currency || "$";
      acc[sym] = (acc[sym] || 0) + curr.currentBalance;
      return acc;
    }, {});
    const keys = Object.keys(totalCurrency);

    const profitPercentage =
      totalInitial === 0 && currentTotal === 0
        ? 0
        : totalInitial === 0 && currentTotal > 0
          ? 100
          : (((currentTotal - totalInitial) / totalInitial) * 100).toFixed(2);
    return { totalInitial, profitPercentage, totalCurrency, keys };
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    handleAccounts,
    deleteAccount,
    handleError,
    errors,
    reset,
    calculateTotal,
  };
};
