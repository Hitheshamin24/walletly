import AnalyticsHeader from "../components/AnalyticsHeader";
import AIInsightBanner from "../components/AIInsightBanner";
import SummaryCards from "../components/SummaryCards";
import ChartsRow from "../components/ChartsRow";
import BalanceDistribution from "../components/BalanceDistribution";
import { useAnalyticsHook } from "../../hooks/useAnalyticsHook";

const AnalyticsPage = () => {
  const {
    balanceDistribution,
    summaryCards,
    categoryBreakdown,
    cashFlowChartData,
    aiInsight,
    currencySymbol
  } = useAnalyticsHook();

  return (
    <div className="min-h-screen bg-[#f7f8fc] px-4 py-4 text-slate-800 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <AnalyticsHeader />
        <AIInsightBanner insight={aiInsight} />
        <SummaryCards cards={summaryCards} />
        <ChartsRow 
           cashFlowData={cashFlowChartData} 
           categories={categoryBreakdown} 
           currencySymbol={currencySymbol}
        />
        <BalanceDistribution distribution={balanceDistribution} />
      </div>
    </div>
  );
};

export default AnalyticsPage;