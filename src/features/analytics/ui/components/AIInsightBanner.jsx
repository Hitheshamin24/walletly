import { Sparkles } from "lucide-react";

const AIInsightBanner = () => {
  return (
    <div className="mb-3 flex items-start gap-2 rounded-md border border-blue-100 bg-blue-50 px-3 py-2.5">
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
        <Sparkles size={10} />
      </div>

      <div>
        <div className="flex items-center gap-1.5">
          <h2 className="text-[8px] font-bold text-slate-700">AI Insight</h2>
          <span className="rounded bg-red-100 px-1 py-0.5 text-[6px] font-semibold text-red-500">
            HIGH
          </span>
        </div>

        <p className="mt-0.5 text-[7px] leading-relaxed text-slate-500">
          Your spending on Dining Out is{" "}
          <span className="font-semibold text-red-500">18% higher</span> than
          last month. Consider reducing it by $100 from your budget to stay on
          track with your savings goal.
        </p>
      </div>
    </div>
  );
};

export default AIInsightBanner;
