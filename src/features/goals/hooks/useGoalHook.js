import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { addGoal, updateGoal, removeGoal, addContribution } from "../state/goalSlice";

export const useGoalHook = () => {
  const dispatch = useDispatch();
  const { goals } = useSelector((s) => s.goals);

  // Enrich goals with derived fields
  const enrichedGoals = useMemo(() => {
    return goals.map((g) => {
      const saved = Number(g.savedAmount) || 0;
      const target = Number(g.targetAmount) || 1;
      const percentage = Math.min(Math.round((saved / target) * 100), 100);
      const isCompleted = saved >= target;
      return { ...g, saved, target, percentage, isCompleted };
    });
  }, [goals]);

  const completedCount = enrichedGoals.filter((g) => g.isCompleted).length;
  const totalSaved = enrichedGoals.reduce((s, g) => s + g.saved, 0);
  const totalTarget = enrichedGoals.reduce((s, g) => s + g.target, 0);

  const createGoal = (data, onClose) => {
    dispatch(
      addGoal({
        id: Date.now(),
        title: data.title,
        targetAmount: Number(data.targetAmount),
        savedAmount: Number(data.initialSaved) || 0,
        deadline: data.deadline || null,
        color: data.color || "#0f766e",
        contributions: Number(data.initialSaved) > 0
          ? [{ note: "Initial deposit", date: new Date().toLocaleDateString("en-GB"), amount: Number(data.initialSaved) }]
          : [],
      }),
    );
    toast.success("Goal created!");
    onClose();
  };

  const editGoal = (data, id, onClose) => {
    const existing = goals.find((g) => g.id === id);
    dispatch(
      updateGoal({
        ...existing,
        id,
        title: data.title,
        targetAmount: Number(data.targetAmount),
        deadline: data.deadline || null,
        color: data.color || existing?.color || "#0f766e",
      }),
    );
    toast.success("Goal updated!");
    onClose();
  };

  const deleteGoal = (id) => {
    dispatch(removeGoal(id));
    toast.success("Goal removed");
  };

  const contribute = (goalId, amount, note, onClose) => {
    if (!amount || Number(amount) <= 0) {
      toast.warn("Enter a valid amount");
      return;
    }
    dispatch(
      addContribution({
        goalId,
        amount: Number(amount),
        note: note || "Contribution",
        date: new Date().toLocaleDateString("en-GB"),
      }),
    );
    toast.success("Contribution added!");
    onClose();
  };

  return {
    goals: enrichedGoals,
    completedCount,
    totalSaved,
    totalTarget,
    createGoal,
    editGoal,
    deleteGoal,
    contribute,
  };
};

export const useGoalForm = () => {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();

  const handleError = (errs) => {
    if (Object.keys(errs).length > 1) return toast.warn("All fields are required");
    const first = Object.values(errs)[0];
    if (first?.message) toast.warn(first.message);
  };

  return { register, handleSubmit, reset, watch, setValue, errors, handleError };
};
