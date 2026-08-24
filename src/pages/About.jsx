// src/pages/About.jsx
import { useTrip } from "../context/TripContext";
import { t } from "../data/translations";

export default function About() {
  const { lang } = useTrip();
  const cards = [
    { titleKey: "aboutCard1Title", descKey: "aboutCard1Desc" },
    { titleKey: "aboutCard2Title", descKey: "aboutCard2Desc" },
    { titleKey: "aboutCard3Title", descKey: "aboutCard3Desc" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-heading text-3xl font-bold mb-4">{t(lang, "aboutTitle")}</h1>
      <p className="text-muted leading-relaxed mb-4">{t(lang, "aboutP1")}</p>
      <p className="text-muted leading-relaxed mb-4">{t(lang, "aboutP2")}</p>
      <div className="grid sm:grid-cols-3 gap-4 mt-10">
        {cards.map((item) => (
          <div key={item.titleKey} className="card">
            <p className="font-semibold mb-1">{t(lang, item.titleKey)}</p>
            <p className="text-xs text-muted">{t(lang, item.descKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
