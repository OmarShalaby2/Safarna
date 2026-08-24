// src/components/HotelCard.jsx
import { Star } from "lucide-react";
import { useTrip } from "../context/TripContext";
import { t } from "../data/translations";

export default function HotelCard({ hotel, nights = 1, highlight = false }) {
  const { lang } = useTrip();
  if (!hotel) return null;
  const total = hotel.totalPrice ?? hotel.pricePerNight * nights;

  return (
    <div
      className={`card flex gap-4 items-center ${
        highlight ? "ring-2 ring-primary-light" : ""
      }`}
    >
      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-20 h-20 rounded-xl object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        {highlight && (
          <p className="text-[11px] font-semibold text-primary-light mb-0.5">
            {t(lang, "bestMatchBudget")}
          </p>
        )}
        <p className="font-semibold truncate">{hotel.name}</p>
        <div className="flex items-center gap-1 text-xs text-amber-500 mb-1">
          <Star size={12} fill="currentColor" /> {hotel.rating}
        </div>
        <p className="text-xs text-muted">
          {hotel.pricePerNight.toLocaleString()} {t(lang, "egp")} {t(lang, "perNight")}
        </p>
      </div>
      <div className="text-end shrink-0">
        <p className="font-bold text-primary">{total.toLocaleString()}</p>
        <p className="text-[11px] text-muted">{t(lang, "egp")} total</p>
      </div>
    </div>
  );
}
