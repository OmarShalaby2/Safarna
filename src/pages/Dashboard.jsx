// src/pages/Dashboard.jsx
import { Link } from "react-router-dom";
import destinations from "../data/destinations.json";
import { useTrip } from "../context/TripContext";
import { t } from "../data/translations";

export default function Dashboard() {
  const { user, savedTrips, lang } = useTrip();

  const upcoming = savedTrips.slice(0, 2);
  const totalSpent = savedTrips.reduce((sum, t) => sum + (t.totalSpent || 0), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-heading text-2xl font-bold mb-1">
        {t(lang, "greetingHello")}, {user?.name || t(lang, "traveler")} 👋
      </h1>
      <p className="text-muted text-sm mb-6">{t(lang, "readyForAdventure")}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card">
          <p className="text-xs text-muted">{t(lang, "upcomingTrips")}</p>
          <p className="text-2xl font-bold text-primary">{upcoming.length}</p>
        </div>
        <div className="card">
          <p className="text-xs text-muted">{t(lang, "savedDestinations")}</p>
          <p className="text-2xl font-bold text-primary">{destinations.length}</p>
        </div>
        <div className="card">
          <p className="text-xs text-muted">{t(lang, "totalTrips")}</p>
          <p className="text-2xl font-bold text-primary">{savedTrips.length}</p>
        </div>
        <div className="card">
          <p className="text-xs text-muted">{t(lang, "budgetUsed")}</p>
          <p className="text-2xl font-bold text-primary">{totalSpent.toLocaleString()} {t(lang, "egp")}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="font-semibold">{t(lang, "yourTrips")}</p>
        <Link to="/plan-trip" className="btn-primary !px-4 !py-2 text-sm">{t(lang, "planNewTrip")}</Link>
      </div>

      <div className="space-y-3">
        {savedTrips.length === 0 && (
          <p className="text-sm text-muted">{t(lang, "noTripsYet")}</p>
        )}
        {savedTrips.map((trip) => {
          const dest = destinations.find((d) => d.id === trip.destinationId);
          const destName = dest ? (lang === "ar" ? dest.nameAr || dest.name : dest.name) : "";
          return (
            <div key={trip.id} className="card flex items-center gap-4">
              <img
                src={dest?.image}
                alt={destName}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1">
                <p className="font-semibold">{destName} {t(lang, "adventureSuffix")}</p>
                <p className="text-xs text-muted">{trip.days} {t(lang, "fieldDays")} · {trip.people} {t(lang, "fieldTravelers")}</p>
              </div>
              <div className="text-end">
                <p className="font-semibold text-primary">{trip.totalSpent.toLocaleString()} {t(lang, "egp")}</p>
                <Link to="/saved-trips" className="text-xs text-primary-light">{t(lang, "viewDetails")}</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
