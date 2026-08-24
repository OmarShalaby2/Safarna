// src/pages/TripItinerary.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import destinations from "../data/destinations.json";
import { useTrip } from "../context/TripContext";
import { t, tf } from "../data/translations";
import DailyPlan from "../components/DailyPlan";
import BudgetCard from "../components/BudgetCard";

const TABS = [
  { key: "Itinerary", labelKey: "tabItinerary" },
  { key: "Budget", labelKey: "tabBudget" },
  { key: "Map", labelKey: "tabMap" },
];

export default function TripItinerary() {
  const { currentPlan, lang } = useTrip();
  const [tab, setTab] = useState("Itinerary");

  if (!currentPlan) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="text-muted mb-4">{t(lang, "noTripYet")}</p>
        <Link to="/plan-trip" className="btn-primary">{t(lang, "planTrip")}</Link>
      </div>
    );
  }

  const destination = destinations.find((d) => d.id === currentPlan.destinationId);
  const destName = destination ? (lang === "ar" ? destination.nameAr || destination.name : destination.name) : "";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-heading text-2xl font-bold mb-1">{t(lang, "yourTripTo")} {destName}</h1>
      <p className="text-muted text-sm mb-6">
        {currentPlan.days} {t(lang, "fieldDays")} · {currentPlan.people} {t(lang, "fieldTravelers")} · {currentPlan.budget.toLocaleString()} {t(lang, "egp")}
      </p>

      <div className="flex gap-2 border-b border-gray-200 dark:border-white/10 mb-6">
        {TABS.map((tb) => (
          <button
            key={tb.key}
            onClick={() => setTab(tb.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px ${
              tab === tb.key ? "border-primary text-primary" : "border-transparent text-muted"
            }`}
          >
            {t(lang, tb.labelKey)}
          </button>
        ))}
      </div>

      {tab === "Itinerary" && <DailyPlan itinerary={currentPlan.itinerary} />}

      {tab === "Budget" && (
        <BudgetCard breakdown={currentPlan.breakdown} totalBudget={currentPlan.budget} />
      )}

      {tab === "Map" && (
        <div className="card h-72 flex items-center justify-center text-muted text-sm">
          {tf(lang, "mapViewOf", { name: destName })}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mt-8">
        <Link to="/dashboard" className="btn-primary">{t(lang, "goToDashboard")}</Link>
        <Link to="/plan-trip" className="btn-secondary">{t(lang, "planAnotherTrip")}</Link>
      </div>
    </div>
  );
}
