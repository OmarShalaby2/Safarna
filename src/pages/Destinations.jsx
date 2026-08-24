// src/pages/Destinations.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Star } from "lucide-react";
import destinations from "../data/destinations.json";
import { useTrip } from "../context/TripContext";
import { t } from "../data/translations";

const FILTERS = [
  { key: "All", labelKey: "filterAll" },
  { key: "Beach", labelKey: "filterBeach" },
  { key: "Historical", labelKey: "filterHistorical" },
  { key: "Adventure", labelKey: "filterAdventure" },
  { key: "Nature", labelKey: "filterNature" },
];

// تصنيف بسيط لكل وجهة عشان يشتغل معاه الفلتر
const TAGS = {
  aswan: ["Historical", "Nature"],
  luxor: ["Historical"],
  cairo: ["Historical", "Adventure"],
  sharm: ["Beach", "Adventure"],
  hurghada: ["Beach"],
  dahab: ["Beach", "Adventure", "Nature"],
};

export default function Destinations() {
  const { lang } = useTrip();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const name = lang === "ar" ? d.nameAr || d.name : d.name;
      const matchesQuery =
        name.toLowerCase().includes(query.toLowerCase()) ||
        d.name.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === "All" || TAGS[d.id]?.includes(filter);
      return matchesQuery && matchesFilter;
    });
  }, [query, filter, lang]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-heading text-2xl font-bold mb-1">{t(lang, "allDestinations")}</h1>
      <p className="text-muted text-sm mb-6">{t(lang, "exploreTopDestinations")}</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute top-1/2 -translate-y-1/2 start-3 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(lang, "searchDestinations")}
            className="input-field ps-9"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors ${
                filter === f.key
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-[#1a2233] border border-gray-200 dark:border-white/10 text-muted"
              }`}
            >
              {t(lang, f.labelKey)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((d) => {
          const name = lang === "ar" ? d.nameAr || d.name : d.name;
          return (
            <Link
              to={`/destinations/${d.id}`}
              key={d.id}
              className="group rounded-xl2 overflow-hidden bg-white dark:bg-[#1a2233] shadow-sm border border-gray-100 dark:border-white/10"
            >
              <div className="h-32 overflow-hidden">
                <img
                  src={d.image}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <p className="font-semibold text-sm">{name}</p>
                <div className="flex items-center justify-between text-xs text-muted mt-1">
                  <span>{t(lang, "egypt")}</span>
                  <span className="flex items-center gap-1 text-amber-500">
                    <Star size={12} fill="currentColor" /> {d.rating}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-muted py-10">{t(lang, "noDestinationsFound")}</p>
        )}
      </div>
    </div>
  );
}
