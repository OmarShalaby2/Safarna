// src/components/RestaurantCard.jsx
import { Star } from "lucide-react";
import { useTrip } from "../context/TripContext";
import { t, tCategory } from "../data/translations";

export default function RestaurantCard({ restaurant }) {
  const { lang } = useTrip();
  if (!restaurant) return null;
  return (
    <div className="card flex gap-4 items-center">
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="w-16 h-16 rounded-xl object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate">{restaurant.name}</p>
        <div className="flex items-center gap-1 text-xs text-amber-500">
          <Star size={12} fill="currentColor" /> {restaurant.rating}
          <span className="text-muted">· {tCategory(lang, restaurant.category)}</span>
        </div>
      </div>
      <div className="text-end shrink-0 text-xs text-muted">
        <p className="font-semibold text-primary">{restaurant.avgMealPrice.toLocaleString()} {t(lang, "egp")}</p>
        <p>{t(lang, "perMealAvg")}</p>
      </div>
    </div>
  );
}
