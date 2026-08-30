import { Download } from "lucide-react";
import { useSelector } from "react-redux";

const DashboardHeader = () => {
  const user = useSelector((s) => s.auth.user);
  const firstName = user?.fullname?.split(" ")[0] ?? "there";

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 lg:px-8">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          {greeting}, {firstName} 👋
        </h2>
        <p className="text-[11px] text-slate-400">
          Here's what's happening with your money.
        </p>
      </div>

      <button className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-600 shadow-sm hover:bg-slate-50 cursor-pointer">
        <Download size={13} />
        Export
      </button>
    </header>
  );
};

export default DashboardHeader;
