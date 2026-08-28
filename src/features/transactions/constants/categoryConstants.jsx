// Category badge styles and helper functions for TransactionTable

export const CATEGORY_STYLES = {
  // Expenses
  food:          { badge: "bg-amber-50 text-amber-700 border border-amber-200", dot: "bg-amber-400" },
  groceries:     { badge: "bg-emerald-50 text-emerald-700 border border-emerald-200", dot: "bg-emerald-400" },
  transport:     { badge: "bg-sky-50 text-sky-700 border border-sky-200", dot: "bg-sky-400" },
  transportation:{ badge: "bg-sky-50 text-sky-700 border border-sky-200", dot: "bg-sky-400" },
  shopping:      { badge: "bg-pink-50 text-pink-700 border border-pink-200", dot: "bg-pink-400" },
  bills:         { badge: "bg-purple-50 text-purple-700 border border-purple-200", dot: "bg-purple-400" },
  utilities:     { badge: "bg-purple-50 text-purple-700 border border-purple-200", dot: "bg-purple-400" },
  entertainment: { badge: "bg-indigo-50 text-indigo-700 border border-indigo-200", dot: "bg-indigo-400" },
  housing:       { badge: "bg-orange-50 text-orange-700 border border-orange-200", dot: "bg-orange-400" },
  rent:          { badge: "bg-orange-50 text-orange-700 border border-orange-200", dot: "bg-orange-400" },
  health:        { badge: "bg-rose-50 text-rose-700 border border-rose-200", dot: "bg-rose-400" },
  education:     { badge: "bg-teal-50 text-teal-700 border border-teal-200", dot: "bg-teal-400" },

  // Income
  salary:        { badge: "bg-emerald-50 text-emerald-700 border border-emerald-200", dot: "bg-emerald-400" },
  income:        { badge: "bg-emerald-50 text-emerald-700 border border-emerald-200", dot: "bg-emerald-400" },
  freelance:     { badge: "bg-cyan-50 text-cyan-700 border border-cyan-200", dot: "bg-cyan-400" },
  investment:    { badge: "bg-violet-50 text-violet-700 border border-violet-200", dot: "bg-violet-400" },
  rental:        { badge: "bg-teal-50 text-teal-700 border border-teal-200", dot: "bg-teal-400" },

  // Transfer
  transfer:      { badge: "bg-blue-50 text-blue-700 border border-blue-200", dot: "bg-blue-400" },
  bank_transfer: { badge: "bg-blue-50 text-blue-700 border border-blue-200", dot: "bg-blue-400" },
  upi_transfer:  { badge: "bg-indigo-50 text-indigo-700 border border-indigo-200", dot: "bg-indigo-400" },

  // Default
  other:         { badge: "bg-slate-50 text-slate-600 border border-slate-200", dot: "bg-slate-400" },
};

// Case-insensitive lookup — handles "Groceries", "groceries", "GROCERIES" all the same
export const getCategoryStyle = (category) => {
  if (!category) return { badge: "bg-slate-50 text-slate-600 border border-slate-200", dot: "bg-slate-400" };
  const key = category.toLowerCase().replace(/\s*&\s*/g, " ").trim();
  return (
    CATEGORY_STYLES[key] ??
    CATEGORY_STYLES[key.split(" ")[0]] ?? 
    { badge: "bg-slate-50 text-slate-600 border border-slate-200", dot: "bg-slate-400" }
  );
};

export const getAmountStyle = (type) => {
  if (type === "income") return "text-emerald-600 font-bold";
  if (type === "expense") return "text-rose-500 font-bold";
  return "text-blue-600 font-bold";
};
