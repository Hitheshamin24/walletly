import { Plus, BriefcaseBusiness } from "lucide-react";

const CategorySection = ({ incomeCategories, expenseCategories }) => {
  return (
    <>
      {/* Section header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <BriefcaseBusiness size={11} className="text-blue-600" />
          <h2 className="text-[10px] font-semibold text-slate-700">
            Category Management
          </h2>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[7px] font-semibold text-slate-600 shadow-sm hover:bg-slate-50"
        >
          <Plus size={8} />
          New Category
        </button>
      </div>

      {/* Income + Expense cards */}
      <div className="mb-5 grid grid-cols-1 gap-2 lg:grid-cols-2">
        {/* Income */}
        <div className="rounded-md border border-slate-200 bg-white p-2.5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
          <p className="mb-2 text-[7px] font-bold uppercase tracking-wide text-slate-500">
            Income
          </p>

          <div className="space-y-2.5">
            {incomeCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.name} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-blue-50 text-blue-600">
                    <Icon size={10} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[8px] font-semibold text-slate-700">
                      {category.name}
                    </p>
                    <p className="text-[7px] text-slate-400">
                      {category.description}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[8px] font-semibold text-slate-700">
                      {category.amount}
                    </p>
                    <p className="text-[6px] text-slate-400">Monthly</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expenses */}
        <div className="rounded-md border border-slate-200 bg-white p-2.5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
          <p className="mb-2 text-[7px] font-bold uppercase tracking-wide text-slate-500">
            Expenses (Top 3)
          </p>

          <div className="space-y-2.5">
            {expenseCategories.map((category) => {
              const Icon = category.icon;
              const isOverBudget = parseFloat(category.amount) > parseFloat(category.limit);
              return (
                <div key={category.name} className="flex items-center gap-2">
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm ${category.bg} ${category.color}`}
                  >
                    <Icon size={10} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[8px] font-semibold text-slate-700">
                      {category.name}
                    </p>
                    <p className="text-[7px] text-slate-400">
                      {category.description}
                    </p>
                  </div>

                  <div className="w-24">
                    <div className="mb-1 flex justify-end">
                      <span
                        className={`text-[8px] font-semibold ${
                          category.progress === "100%"
                            ? "text-red-500"
                            : "text-slate-700"
                        }`}
                      >
                        {category.amount}
                      </span>
                    </div>

                    <div className="h-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${category.progressColor}`}
                        style={{ width: category.progress }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySection;
