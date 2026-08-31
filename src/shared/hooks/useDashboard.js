import { useMemo } from "react";
import { useSelector } from "react-redux";

// Symbol → { locale, iso } mapping for Intl.NumberFormat
const CURRENCY_MAP = {
  "$": { locale: "en-US", iso: "USD" },
  "€": { locale: "de-DE", iso: "EUR" },
  "£": { locale: "en-GB", iso: "GBP" },
  "₹": { locale: "en-IN", iso: "INR" },
};

// Find the currency symbol used by the most accounts
const getMajorityCurrency = (accounts) => {
  if (!accounts.length) return "$";
  const tally = {};
  accounts.forEach((a) => {
    const sym = a.currency || "$";
    tally[sym] = (tally[sym] ?? 0) + 1;
  });
  return Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
};

// Build a formatter for a given symbol
const buildFmt = (symbol) => {
  const config = CURRENCY_MAP[symbol] ?? { locale: "en-US", iso: "USD" };
  const nf = new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.iso,
    maximumFractionDigits: 2,
  });
  return (n) => nf.format(n);
};

const getMonthKey = (dateStr) => {
 
  if (!dateStr) return null;
  if (dateStr.includes("-")) {
    // yyyy-mm-dd
    const [y, m] = dateStr.split("-");
    return `${y}-${m}`;
  }
  // dd/mm/yyyy
  const [, m, y] = dateStr.split("/");
  return `${y}-${m.padStart(2, "0")}`;
};

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Main Hook 

export const useDashboard = () => {
  const { transactions } = useSelector((s) => s.transactions);
  const { accounts } = useSelector((s) => s.accounts);

  //  Stats 
  const stats = useMemo(() => {
    const totalBalance = accounts.reduce((sum, a) => sum + (Number(a.currentBalance) || 0), 0);

    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    let monthlyIncome = 0;
    let monthlyExpense = 0;

    transactions.forEach((t) => {
      const key = getMonthKey(t.transactionDate);
      if (key !== thisMonth) return;
      const amt = (Number(t.amount) || 0);
      if (t.transactionType === "income") monthlyIncome += amt;
      else if (t.transactionType === "expense") monthlyExpense += amt;
    });

    const savings = monthlyIncome - monthlyExpense;

    return { totalBalance, monthlyIncome, monthlyExpense, savings };
  }, [transactions, accounts]);

  //  Cash Flow  last 6 months 
  const cashFlow = useMemo(() => {
    const now = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        month: MONTH_NAMES[d.getMonth()],
        income: 0,
        expense: 0,
      });
    }

    transactions.forEach((t) => {
      const key = getMonthKey(t.transactionDate);
      const entry = months.find((m) => m.key === key);
      if (!entry) return;
      const amt = (Number(t.amount) || 0);
      if (t.transactionType === "income") entry.income += amt;
      else if (t.transactionType === "expense") entry.expense += amt;
    });

    return months;
  }, [transactions]);

  //  Recent Activity  last 8 transactions 
  const recentActivity = useMemo(() => {
    return [...transactions]
      .sort((a, b) => b.id - a.id)
      .slice(0, 8);
  }, [transactions]);

  //   Expense Breakdown  this month by category 
  const expenseBreakdown = useMemo(() => {
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    const categoryMap = {};
    let totalExpense = 0;

    transactions.forEach((t) => {
      if (t.transactionType !== "expense") return;
      const key = getMonthKey(t.transactionDate);
      if (key !== thisMonth) return;
      const amt = (Number(t.amount) || 0);
      const cat = t.transactionCategory || "Other";
      categoryMap[cat] = (categoryMap[cat] ?? 0) + amt;
      totalExpense += amt;
    });

    const sorted = Object.entries(categoryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return { categories: sorted, total: totalExpense };
  }, [transactions]);

  //  Monthly budget quick summary 
  const monthlyBudget = useMemo(() => {
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    let spent = 0;
    let earned = 0;
    transactions.forEach((t) => {
      const key = getMonthKey(t.transactionDate);
      if (key !== thisMonth) return;
      const amt = (Number(t.amount) || 0);
      if (t.transactionType === "expense") spent += amt;
      if (t.transactionType === "income") earned += amt;
    });
    return { spent, earned };
  }, [transactions]);

  const currencySymbol = useMemo(() => getMajorityCurrency(accounts), [accounts]);
  const fmt = useMemo(() => buildFmt(currencySymbol), [currencySymbol]);

  return { stats, cashFlow, recentActivity, expenseBreakdown, monthlyBudget, fmt, currencySymbol };
};
