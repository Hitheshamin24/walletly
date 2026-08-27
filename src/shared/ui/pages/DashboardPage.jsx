import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import CashFlowCard from "../components/dashboard/CashFlowCard";
import RecentActivityCard from "../components/dashboard/RecentActivityCard";
import ExpenseBreakdownCard from "../components/dashboard/ExpenseBreakdownCard";
import MonthlyBudgetCard from "../components/dashboard/MonthlyBudgetCard";
import UpcomingBillsCard from "../components/dashboard/UpcomingBillsCard";
import SavingsGoalCard from "../components/dashboard/SavingsGoalCard";

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-[#f6f8fc] text-slate-800">
      <main className="min-w-0 flex-1">
        <DashboardHeader />

        <div className="p-5 lg:p-7">
          <StatsGrid />

          <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_270px]">
            {/* Left column */}
            <div className="min-w-0 space-y-5">
              <CashFlowCard />
              <RecentActivityCard />
            </div>

            {/* Right column */}
            <div className="space-y-5">
              <ExpenseBreakdownCard />
              <MonthlyBudgetCard />
              <UpcomingBillsCard />
              <SavingsGoalCard />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
