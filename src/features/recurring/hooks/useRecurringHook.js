import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMemo } from "react";
import {
  addRecurring,
  updateRecurring,
  removeRecurring,
  togglePause,
} from "../state/recurringSlice";

const computeNextDate = (frequency, dayOfMonth) => {
  const now = new Date();
  let next = new Date();

  if (frequency === "monthly") {
    next.setDate(Number(dayOfMonth) || 1);
    if (next <= now) {
      next.setMonth(next.getMonth() + 1);
      next.setDate(Number(dayOfMonth) || 1);
    }
  } else if (frequency === "weekly") {
    next.setDate(now.getDate() + 7);
  } else if (frequency === "yearly") {
    next.setFullYear(now.getFullYear() + 1);
  } else {
    next.setDate(now.getDate() + 1);
  }

  return next.toISOString().split("T")[0];
};

const formatNextDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const useRecurringHook = () => {
  const dispatch = useDispatch();
  const { recurringItems } = useSelector((s) => s.recurring);

  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  // Enrich each item with formatted next date and days-until
  const enriched = useMemo(() => {
    return recurringItems.map((r) => {
      const nextDateStr = r.nextDate || computeNextDate(r.frequency, r.dayOfMonth);
      const nextDate = new Date(nextDateStr + "T00:00:00");
      const daysUntil = Math.ceil((nextDate - now) / (1000 * 60 * 60 * 24));
      return {
        ...r,
        nextDate: nextDateStr,
        nextDateFormatted: formatNextDate(nextDateStr),
        daysUntil,
        isDueSoon: daysUntil >= 0 && daysUntil <= 7,
        isOverdue: daysUntil < 0,
      };
    });
  }, [recurringItems]);

  // Summary stats
  const summary = useMemo(() => {
    const active = enriched.filter((r) => !r.paused);
    const totalMonthly = active.reduce((s, r) => {
      const amt = Number(r.amount);
      if (r.frequency === "monthly") return s + amt;
      if (r.frequency === "weekly") return s + amt * 4.33;
      if (r.frequency === "yearly") return s + amt / 12;
      if (r.frequency === "daily") return s + amt * 30;
      return s;
    }, 0);

    const totalExpense = active
      .filter((r) => r.type === "expense")
      .reduce((s, r) => s + Number(r.amount), 0);

    const dueSoon = enriched.filter((r) => r.isDueSoon && !r.paused).length;

    return { totalMonthly, totalExpense, activeCount: active.length, dueSoon };
  }, [enriched]);

  const createRecurring = (data, onClose) => {
    const nextDate = computeNextDate(data.frequency, data.dayOfMonth);
    dispatch(
      addRecurring({
        id: Date.now(),
        name: data.name,
        category: data.category,
        amount: Number(data.amount),
        type: data.type || "expense",
        frequency: data.frequency,
        dayOfMonth: Number(data.dayOfMonth) || null,
        nextDate,
        color: data.color || "#0f766e",
        paused: false,
      }),
    );
    toast.success("Recurring transaction added!");
    onClose();
  };

  const editRecurring = (data, id, onClose) => {
    const existing = recurringItems.find((r) => r.id === id);
    const nextDate = computeNextDate(data.frequency, data.dayOfMonth);
    dispatch(
      updateRecurring({
        ...existing,
        id,
        name: data.name,
        category: data.category,
        amount: Number(data.amount),
        type: data.type || "expense",
        frequency: data.frequency,
        dayOfMonth: Number(data.dayOfMonth) || null,
        nextDate,
        color: data.color || existing?.color || "#0f766e",
      }),
    );
    toast.success("Recurring transaction updated!");
    onClose();
  };

  const deleteRecurring = (id) => {
    dispatch(removeRecurring(id));
    toast.success("Removed");
  };

  const pauseResume = (id) => {
    dispatch(togglePause(id));
  };

  return {
    items: enriched,
    summary,
    createRecurring,
    editRecurring,
    deleteRecurring,
    pauseResume,
  };
};

export const useRecurringForm = () => {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();

  const handleError = (errs) => {
    if (Object.keys(errs).length > 1) return toast.warn("All fields are required");
    const first = Object.values(errs)[0];
    if (first?.message) toast.warn(first.message);
  };

  return { register, handleSubmit, reset, watch, setValue, errors, handleError };
};
