const SummaryCards = ({ cards }) => {
  return (
    <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="rounded-md border border-slate-200 bg-white p-2.5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
          >
            <div className="flex items-start gap-2">
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${card.iconBg} ${card.iconColor}`}
              >
                <Icon size={11} />
              </div>

              <div>
                <p className="text-[6px] font-bold uppercase tracking-wide text-slate-400">
                  {card.title}
                </p>
                <p className="mt-0.5 text-[7px] text-slate-500">{card.name}</p>
                <p className="mt-0.5 text-sm font-bold text-slate-800">
                  {card.amount}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
