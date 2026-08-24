// src/pages/Recommendations.jsx
import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import destinations from "../data/destinations.json";
import { useTrip } from "../context/TripContext";
import { t, tf } from "../data/translations";
import HotelCard from "../components/HotelCard";
import PlaceCard from "../components/PlaceCard";
import ActivityCard from "../components/ActivityCard";
import RestaurantCard from "../components/RestaurantCard";
import BudgetCard from "../components/BudgetCard";

export default function Recommendations() {
  const navigate = useNavigate();
  const { currentPlan, saveCurrentTrip, lang } = useTrip();

  if (!currentPlan) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="text-muted mb-4">{t(lang, "youHaventPlanned")}</p>
        <Link to="/plan-trip" className="btn-primary">{t(lang, "planTrip")}</Link>
      </div>
    );
  }

  const destination = destinations.find((d) => d.id === currentPlan.destinationId);
  const destName = destination ? (lang === "ar" ? destination.nameAr || destination.name : destination.name) : "";
  const nights = Math.max(currentPlan.days - 1, 1);

  function handleContinue() {
    saveCurrentTrip();
    navigate("/trip-itinerary");
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-heading text-2xl font-bold mb-1">
        {t(lang, "recommendationsFor")} {destName}
      </h1>
      <p className="text-muted text-sm mb-6">
        {tf(lang, "basedOnBudget", { budget: currentPlan.budget.toLocaleString(), days: currentPlan.days })}
      </p>

      {!currentPlan.isFeasible && (
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-xl p-4 mb-6">
          <AlertTriangle size={18} className="shrink-0 mt-0.5" />
          <p>{t(lang, "budgetTightWarning")}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <p className="font-semibold mb-3">🏨 {t(lang, "recommendedHotel")}</p>
            <HotelCard hotel={currentPlan.hotel} nights={nights} highlight />
          </section>

          <section>
            <p className="font-semibold mb-3">🏛️ {t(lang, "placesToVisit")}</p>
            <div className="space-y-3">
              {currentPlan.places.map((p) => <PlaceCard key={p.id} place={p} />)}
              {currentPlan.places.length === 0 && (
                <p className="text-sm text-muted">{t(lang, "noPlacesFit")}</p>
              )}
            </div>
          </section>

          <section>
            <p className="font-semibold mb-3">🎯 {t(lang, "tabActivities")}</p>
            <div className="space-y-3">
              {currentPlan.activities.map((a) => <ActivityCard key={a.id} activity={a} />)}
              {currentPlan.activities.length === 0 && (
                <p className="text-sm text-muted">{t(lang, "noActivitiesFit")}</p>
              )}
            </div>
          </section>

          <section>
            <p className="font-semibold mb-3">🍽️ {t(lang, "restaurants")}</p>
            <div className="space-y-3">
              {currentPlan.restaurants.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <BudgetCard breakdown={currentPlan.breakdown} totalBudget={currentPlan.budget} />
          <button onClick={handleContinue} className="btn-primary w-full">
            {t(lang, "buildMyItinerary")}
          </button>
        </div>
      </div>
    </div>
  );
}
