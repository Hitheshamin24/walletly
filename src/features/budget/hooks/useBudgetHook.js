import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { addBudget, updateBudget, removeBudget } from "../state/budgetSlice";
import { useMemo } from "react";

const getMonthKey = (dateStr) => {
  if (!dateStr) return null;
  if (dateStr.includes("-")) {
    const [y, m] = dateStr.split("-");
    return `${y}-${m}`;
  }
  const [, m, y] = dateStr.split("/");
  return `${y}-${m.padStart(2, "0")}`;
};

export const useBudgetHook = () => {
  const dispatch = useDispatch();
  const { budgets } = useSelector((s) => s.budgets);
  const { transactions } = useSelector((s) => s.transactions);

  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const spentByCategory = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      if (t.transactionType !== "expense") return;
      const key = getMonthKey(t.transactionDate);
      if (key !== thisMonth) return;
      const cat = (t.transactionCategory || "Other").toLowerCase();
      map[cat] = (map[cat] ?? 0) + (Number(t.amount) || 0);
    });
    return map;
  }, [transactions, thisMonth]);

  // Enrich each budget with real spent amount and percentage
  const enrichedBudgets = useMemo(() => {
    return budgets.map((b) => {
      const categoryKey = b.category.toLowerCase();
      const spent = spentByCategory[categoryKey] ?? 0;
      const limit = (Number(b.limit) || 0);
      const percentage = limit > 0 ? (spent / limit) * 100 : 0;
      const isOver = spent > limit;
      return { ...b, spent, percentage: Math.round(percentage), isOver };
    });
  }, [budgets, spentByCategory]);

  const alerts = useMemo(() => {
    return enrichedBudgets.filter((b) => b.percentage >= 90);
  }, [enrichedBudgets]);

  //  CRUD
  const createBudget = (data, onClose) => {
    const existing = budgets.find(
      (b) => b.category.toLowerCase() === data.category.toLowerCase(),
    );
    if (existing) {
      toast.error(`A budget for "${data.category}" already exists`);
      return;
    }
    dispatch(
      addBudget({
        id: Date.now(),
        name: data.name,
        category: data.category,
        limit: (Number(data.limit) || 0),
        period: "monthly",
        color: data.color || "#0f766e",
      }),
    );
    toast.success("Budget created!");
    onClose();
  };

  const editBudget = (data, id, onClose) => {
    dispatch(
      updateBudget({
        id,
        name: data.name,
        category: data.category,
        limit: (Number(data.limit) || 0),
        period: "monthly",
        color: data.color || "#0f766e",
      }),
    );
    toast.success("Budget updated!");
    onClose();
  };

  const deleteBudget = (id) => {
    dispatch(removeBudget(id));
    toast.success("Budget removed");
  };

  return {
    budgets: enrichedBudgets,
    alerts,
    spentByCategory,
    thisMonth,
    createBudget,
    editBudget,
    deleteBudget,
  };
};

export const useBudgetForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const handleError = (errs) => {
    if (Object.keys(errs).length > 1) return toast.warn("All fields are required");
    const first = Object.values(errs)[0];
    if (first?.message) toast.warn(first.message);
  };

  return { register, handleSubmit, reset, watch, setValue, errors, handleError };
};
