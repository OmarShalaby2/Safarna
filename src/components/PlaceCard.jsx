// src/components/PlaceCard.jsx
import { useTrip } from "../context/TripContext";
import { t, tCategory } from "../data/translations";

export default function PlaceCard({ place }) {
  const { lang } = useTrip();
  if (!place) return null;
  return (
    <div className="card flex gap-4 items-center">
      <img src={place.image} alt={place.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate">{place.name}</p>
        <span className="inline-block text-[11px] bg-surface dark:bg-white/10 text-muted px-2 py-0.5 rounded-full mt-1">
          {tCategory(lang, place.category)}
        </span>
      </div>
      <div className="text-end shrink-0 text-xs text-muted">
        <p className="font-semibold text-primary">{place.entryFee.toLocaleString()} {t(lang, "egp")}</p>
        <p>{place.durationHours}{t(lang, "visitDurationSuffix")}</p>
      </div>
    </div>
  );
}
