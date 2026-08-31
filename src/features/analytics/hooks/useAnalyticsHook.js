import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useDashboard } from "../../../shared/hooks/useDashboard";
import { Utensils, Wallet, CreditCard, ShoppingBag, TrendingDown, HelpCircle, Activity } from "lucide-react";

const getMonthKey = (dateStr) => {
  if (!dateStr) return null;
  if (dateStr.includes("-")) {
    const [y, m] = dateStr.split("-");
    return `${y}-${m}`;
  }
  const [, m, y] = dateStr.split("/");
  return `${y}-${m.padStart(2, "0")}`;
};

const CATEGORY_ICONS = {
  Food: Utensils,
  Groceries: ShoppingBag,
  Salary: Wallet,
  Transport: TrendingDown,
  Shopping: ShoppingBag,
  default: Activity,
};

const CATEGORY_COLORS = [
  "bg-teal-600",
  "bg-red-400",
  "bg-blue-500",
  "bg-orange-400",
  "bg-indigo-500",
];

export const useAnalyticsHook = () => {
  const { transactions } = useSelector((s) => s.transactions);
  const { accounts } = useSelector((s) => s.accounts);
  const { fmt, currencySymbol } = useDashboard();

  const now = new Date();
  const thisMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthStr = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, "0")}`;

  // 1. Balance Distribution
  const balanceDistribution = useMemo(() => {
    const totalBalance = accounts.reduce((sum, a) => sum + (Number(a.currentBalance) || 0), 0);
    const balanceItems = accounts.map((a) => ({
      name: a.accountName,
      amount: fmt((Number(a.currentBalance) || 0)),
      rawAmount: (Number(a.currentBalance) || 0),
      percentage: totalBalance > 0 ? Math.round(((Number(a.currentBalance) || 0) / totalBalance) * 100) + "%" : "0%",
      color: a.color || "#0d9488",
    })).sort((a, b) => b.rawAmount - a.rawAmount);

    // Conic gradient string
    let gradientStr = "";
    if (totalBalance === 0) {
      gradientStr = "conic-gradient(#e2e8f0 0deg 360deg)";
    } else {
      let currentDeg = 0;
      const gradientParts = balanceItems.map(item => {
        const pDeg = (item.rawAmount / totalBalance) * 360;
        const start = currentDeg;
        const end = currentDeg + pDeg;
        currentDeg = end;
        return `${item.color} ${start}deg ${end}deg`;
      });
      gradientStr = `conic-gradient(${gradientParts.join(", ")})`;
    }

    return { totalBalance, balanceItems, gradientStr };
  }, [accounts, fmt]);

  // 2. Summary Cards (This Month)
  const summaryCards = useMemo(() => {
    let highestExpense = { name: "None", amount: 0 };
    let topIncome = { name: "None", amount: 0 };
    let totalExpense = 0;
    
    const catExpenses = {};

    transactions.forEach(t => {
      const amt = (Number(t.amount) || 0);
      if (getMonthKey(t.transactionDate) !== thisMonthStr) return;
      
      if (t.transactionType === "expense") {
        totalExpense += amt;
        const cat = t.transactionCategory || "Other";
        catExpenses[cat] = (catExpenses[cat] ?? 0) + amt;
        if (amt > highestExpense.amount) {
          highestExpense = { name: t.transactionName || cat, amount: amt };
        }
      } else if (t.transactionType === "income") {
        if (amt > topIncome.amount) {
          topIncome = { name: t.transactionName || (t.transactionCategory || "Income"), amount: amt };
        }
      }
    });

    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const currentDay = now.getDate();
    // Avg spending rate based on days passed this month
    const avgPerDay = currentDay > 0 ? totalExpense / currentDay : 0;

    return [
      {
        title: "HIGHEST EXPENSE",
        name: highestExpense.name,
        amount: fmt(highestExpense.amount),
        icon: Utensils,
        iconBg: "bg-red-50",
        iconColor: "text-red-500",
      },
      {
        title: "TOP INCOME",
        name: topIncome.name,
        amount: fmt(topIncome.amount),
        icon: Wallet,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
      },
      {
        title: "AVG. / DAY",
        name: "Spending Rate",
        amount: fmt(avgPerDay),
        icon: CreditCard,
        iconBg: "bg-slate-100",
        iconColor: "text-slate-500",
      },
    ];
  }, [transactions, thisMonthStr, fmt, now]);

  // 3. Category Breakdown (vs Last Month)
  const categoryBreakdown = useMemo(() => {
    const thisMonthCats = {};
    const lastMonthCats = {};
    let thisMonthTotal = 0;

    transactions.forEach(t => {
      if (t.transactionType !== "expense") return;
      const key = getMonthKey(t.transactionDate);
      const cat = t.transactionCategory || "Other";
      const amt = (Number(t.amount) || 0);

      if (key === thisMonthStr) {
        thisMonthCats[cat] = (thisMonthCats[cat] ?? 0) + amt;
        thisMonthTotal += amt;
      } else if (key === lastMonthStr) {
        lastMonthCats[cat] = (lastMonthCats[cat] ?? 0) + amt;
      }
    });

    // Top 4 categories this month
    const topCats = Object.entries(thisMonthCats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([name, amount], i) => {
        const lastAmt = lastMonthCats[name] || 0;
        const diff = amount - lastAmt;
        let changeText = "Same as last month";
        let changeType = "neutral"; // neutral, higher, lower
        
        if (lastAmt > 0) {
           const pctChange = Math.round((Math.abs(diff) / lastAmt) * 100);
           if (diff > 0) {
             changeText = `${pctChange}% higher`;
             changeType = "higher";
           } else if (diff < 0) {
             changeText = `${pctChange}% lower`;
             changeType = "lower";
           }
        } else if (amount > 0 && lastAmt === 0) {
           changeText = "New this month";
           changeType = "higher";
        }

        return {
          name,
          rawAmount: amount,
          amount: fmt(amount),
          percentage: thisMonthTotal > 0 ? Math.round((amount / thisMonthTotal) * 100) : 0,
          color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
          changeText,
          changeType
        };
      });

    return topCats;
  }, [transactions, thisMonthStr, lastMonthStr, fmt]);

  // 4. Cash Flow Data for Chart (Last 6 months)
  const cashFlowChartData = useMemo(() => {
    const months = [];
    const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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

    // Determine max value for Y_LABELS
    let maxVal = 0;
    months.forEach(m => {
      if (m.income > maxVal) maxVal = m.income;
      if (m.expense > maxVal) maxVal = m.expense;
    });

    // Round up max value to nearest 1000, min 1000
    let chartMax = Math.ceil(maxVal / 1000) * 1000;
    if (chartMax === 0) chartMax = 1000;
    
    // Y labels from chartMax down to 0
    const yLabels = [];
    for(let i=5; i>=0; i--){
       yLabels.push((chartMax / 5) * i);
    }

    return { months, chartMax, yLabels };
  }, [transactions, now]);

  // 5. AI Insight logic
  const aiInsight = useMemo(() => {
    // Find category that increased the most % compared to last month (minimum $50 this month to care)
    let highestIncrease = { cat: null, diff: 0, pct: 0 };
    categoryBreakdown.forEach(c => {
       if (c.changeType === "higher" && c.rawAmount > 50) {
          const valStr = c.changeText.replace("% higher", "").replace("New this month", "100");
          const pct = parseInt(valStr) || 0;
          if (pct > highestIncrease.pct) {
             highestIncrease = { cat: c.name, pct };
          }
       }
    });

    if (highestIncrease.cat) {
      return {
         title: "AI Insight",
         level: "HIGH",
         levelColor: "text-red-500 bg-red-100",
         message: `Your spending on ${highestIncrease.cat} is ${highestIncrease.pct}% higher than last month. Consider reducing it to stay on track with your budget.`,
      };
    }
    
    // Otherwise check savings rate
    const income = cashFlowChartData.months[5].income;
    const expense = cashFlowChartData.months[5].expense;
    
    if (income > 0) {
      const savingsRate = ((income - expense) / income) * 100;
      if (savingsRate > 20) {
        return {
           title: "AI Insight",
           level: "GOOD",
           levelColor: "text-teal-600 bg-teal-100",
           message: `Great job! Your savings rate this month is ${Math.round(savingsRate)}%. You are doing excellent. Keep it up!`,
        };
      }
    }
    
    return {
       title: "AI Insight",
       level: "NEUTRAL",
       levelColor: "text-blue-500 bg-blue-100",
       message: "Your spending looks normal. Keep tracking your expenses to ensure you meet your financial goals.",
    };
  }, [categoryBreakdown, cashFlowChartData]);

  return {
    balanceDistribution,
    summaryCards,
    categoryBreakdown,
    cashFlowChartData,
    aiInsight,
    fmt,
    currencySymbol
  };
};
