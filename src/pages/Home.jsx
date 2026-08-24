// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { Wand2, Wallet, MapPinned, Clock3, Star } from "lucide-react";
import destinations from "../data/destinations.json";
import { useTrip } from "../context/TripContext";
import { t } from "../data/translations";

const features = [
  { icon: Wand2, titleKey: "feature1Title", descKey: "feature1Desc" },
  { icon: Wallet, titleKey: "feature2Title", descKey: "feature2Desc" },
  { icon: MapPinned, titleKey: "feature3Title", descKey: "feature3Desc" },
  { icon: Clock3, titleKey: "feature4Title", descKey: "feature4Desc" },
];

export default function Home() {
  const { lang } = useTrip();

  return (
    <div>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold leading-tight">
            {t(lang, "heroTitle")}
            <br />
            <span className="text-primary-light">{t(lang, "heroSubtitle")}</span>
          </h1>
          <p className="text-muted mt-4 max-w-md">{t(lang, "heroDesc")}</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link to="/plan-trip" className="btn-primary">{t(lang, "planTrip")}</Link>
            <Link to="/destinations" className="btn-secondary">{t(lang, "explore")}</Link>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-10">
            {features.map((f) => (
              <div key={f.titleKey} className="flex items-start gap-2">
                <span className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <f.icon size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold">{t(lang, f.titleKey)}</p>
                  <p className="text-xs text-muted">{t(lang, f.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-xl2 overflow-hidden h-72 sm:h-96">
          <img
            src="https://images.unsplash.com/photo-1539768942893-daf53e448371?q=80&w=1200"
            alt="Egypt travel"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Popular destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-2xl font-bold">{t(lang, "popularDestinations")}</h2>
          <Link to="/destinations" className="text-sm font-semibold text-primary-light">
            {t(lang, "viewAll")}
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {destinations.map((d) => {
            const name = lang === "ar" ? d.nameAr || d.name : d.name;
            return (
              <Link
                to={`/destinations/${d.id}`}
                key={d.id}
                className="group rounded-xl2 overflow-hidden bg-white dark:bg-[#1a2233] shadow-sm border border-gray-100 dark:border-white/10"
              >
                <div className="h-28 overflow-hidden">
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
        </div>
      </section>
    </div>
  );
}
