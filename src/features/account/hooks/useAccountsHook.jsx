import { useForm } from "react-hook-form";

export const useAccountHook = () => {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      accountType: "bank",
    },
  });

  const handleAccounts = (data) => {
    console.log(data);
    reset();
  };
  const handleError = (error) => {
    console.log(error);
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    handleAccounts,
    handleError,
  };
};
