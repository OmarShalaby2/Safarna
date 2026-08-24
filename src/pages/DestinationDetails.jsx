// src/pages/DestinationDetails.jsx
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import destinations from "../data/destinations.json";
import hotels from "../data/hotels.json";
import places from "../data/places.json";
import activities from "../data/activities.json";
import { useTrip } from "../context/TripContext";
import { t, tCategory } from "../data/translations";

const TABS = [
  { key: "Overview", labelKey: "tabOverview" },
  { key: "Top Hotels", labelKey: "tabTopHotels" },
  { key: "Places", labelKey: "tabPlaces" },
  { key: "Activities", labelKey: "tabActivities" },
];

export default function DestinationDetails() {
  const { id } = useParams();
  const { updateTripForm, lang } = useTrip();
  const [tab, setTab] = useState("Overview");

  const destination = destinations.find((d) => d.id === id);
  const destHotels = hotels.filter((h) => h.destinationId === id);
  const destPlaces = places.filter((p) => p.destinationId === id);
  const destActivities = activities.filter((a) => a.destinationId === id);

  if (!destination) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-muted">{t(lang, "destinationNotFound")}</p>
        <Link to="/destinations" className="text-primary-light font-semibold">{t(lang, "backToDestinations")}</Link>
      </div>
    );
  }

  const name = lang === "ar" ? destination.nameAr || destination.name : destination.name;

  return (
    <div>
      <div className="h-64 relative">
        <img src={destination.image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 start-4 sm:start-8 text-white">
          <h1 className="font-heading text-3xl font-bold">{name}</h1>
          <p className="flex items-center gap-2 text-sm mt-1">
            <MapPin size={14} /> {t(lang, "egypt")}
            <span className="flex items-center gap-1 text-amber-400">
              <Star size={14} fill="currentColor" /> {destination.rating} ({Math.round(destination.rating * 25)} {t(lang, "reviews")})
            </span>
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-2 border-b border-gray-200 dark:border-white/10 mb-6 overflow-x-auto">
          {TABS.map((tb) => (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px ${
                tab === tb.key ? "border-primary text-primary" : "border-transparent text-muted"
              }`}
            >
              {t(lang, tb.labelKey)}
            </button>
          ))}
        </div>

        {tab === "Overview" && (
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">{t(lang, "aboutPrefix")} {name}</p>
              <p className="text-sm text-muted">{destination.description}</p>
            </div>
            <div className="card inline-flex flex-col">
              <p className="text-xs text-muted">{t(lang, "bestTimeToVisit")}</p>
              <p className="font-semibold">{destination.bestTime}</p>
            </div>
            <div>
              <p className="font-semibold mb-2">{t(lang, "topActivities")}</p>
              <div className="flex flex-wrap gap-2">
                {destActivities.slice(0, 3).map((a) => (
                  <span key={a.id} className="text-xs bg-surface dark:bg-white/10 px-3 py-1.5 rounded-full">
                    {a.name} — {a.price} {t(lang, "egp")}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "Top Hotels" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {destHotels.map((h) => (
              <div key={h.id} className="card flex gap-4">
                <img src={h.image} className="w-20 h-20 rounded-xl object-cover" alt={h.name} />
                <div className="flex-1">
                  <p className="font-semibold">{h.name}</p>
                  <p className="text-xs text-amber-500 flex items-center gap-1"><Star size={12} fill="currentColor" /> {h.rating}</p>
                  <p className="text-sm text-primary font-semibold mt-1">{h.pricePerNight} {t(lang, "egp")} {t(lang, "perNight")}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Places" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {destPlaces.map((p) => (
              <div key={p.id} className="card flex gap-4">
                <img src={p.image} className="w-20 h-20 rounded-xl object-cover" alt={p.name} />
                <div className="flex-1">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-xs text-muted">{tCategory(lang, p.category)} · {p.durationHours}{t(lang, "visitDurationSuffix")}</p>
                  <p className="text-sm text-primary font-semibold mt-1">{p.entryFee} {t(lang, "egp")} {t(lang, "entryFeeSuffix")}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Activities" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {destActivities.map((a) => (
              <div key={a.id} className="card flex gap-4">
                <img src={a.image} className="w-20 h-20 rounded-xl object-cover" alt={a.name} />
                <div className="flex-1">
                  <p className="font-semibold">{a.name}</p>
                  <p className="text-xs text-muted">{tCategory(lang, a.category)} · {a.durationHours}{t(lang, "visitDurationSuffix")}</p>
                  <p className="text-sm text-primary font-semibold mt-1">{a.price} {t(lang, "egp")}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <Link
          to="/plan-trip"
          onClick={() => updateTripForm({ destinationId: destination.id })}
          className="btn-primary inline-block mt-8"
        >
          {t(lang, "planTripToPrefix")} {name}
        </Link>
      </div>
    </div>
  );
}
