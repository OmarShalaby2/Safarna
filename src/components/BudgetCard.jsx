// src/components/BudgetCard.jsx
// دونات شارت مرسوم بـ SVG يدويًا لتوزيع الميزانية (بدون مكتبات خارجية)
import { useTrip } from "../context/TripContext";
import { t } from "../data/translations";

const COLORS = ["#0D5E5E", "#14A9A6", "#F59E0B", "#687280", "#22c55e", "#94a3b8"];

function buildArcs(breakdown, total) {
  let cumulative = 0;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  return breakdown.map((item, i) => {
    const fraction = total > 0 ? item.value / total : 0;
    const dash = fraction * circumference;
    const arc = {
      ...item,
      color: COLORS[i % COLORS.length],
      dashArray: `${dash} ${circumference - dash}`,
      dashOffset: -cumulative,
      percent: Math.round(fraction * 100),
    };
    cumulative += dash;
    return arc;
  });
}

export default function BudgetCard({ breakdown, totalBudget }) {
  const { lang } = useTrip();
  const arcs = buildArcs(breakdown, totalBudget);

  return (
    <div className="card">
      <p className="font-semibold mb-4">{t(lang, "budgetBreakdown")}</p>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-36 h-36 shrink-0">
          <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
            <circle cx="70" cy="70" r="60" fill="none" stroke="#e5e7eb" strokeWidth="16" />
            {arcs.map((arc) => (
              <circle
                key={arc.key}
                cx="70"
                cy="70"
                r="60"
                fill="none"
                stroke={arc.color}
                strokeWidth="16"
                strokeDasharray={arc.dashArray}
                strokeDashoffset={arc.dashOffset}
                strokeLinecap="butt"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[10px] text-muted">{t(lang, "totalBudget")}</p>
            <p className="font-bold text-primary text-sm">
              {totalBudget.toLocaleString()} {t(lang, "egp")}
            </p>
          </div>
        </div>

        <ul className="flex-1 w-full space-y-2">
          {arcs.map((arc) => (
            <li key={arc.key} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: arc.color }}
                />
                {arc.icon} {t(lang, arc.labelKey)}
              </span>
              <span className="text-muted">
                {arc.value.toLocaleString()} {t(lang, "egp")}
                <span className="text-xs text-muted"> ({arc.percent}%)</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
